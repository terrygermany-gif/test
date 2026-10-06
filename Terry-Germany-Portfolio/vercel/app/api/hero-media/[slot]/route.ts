import { isPortfolioOwner } from "@/lib/editor-owner";
import { acceptedMediaTypes, isHeroSlot, maxMediaBytes } from "@/lib/hero-media";
import { assetKey, describeMedia, matchesMediaType, mediaBucket, readMedia, sameOrigin, slotKey, validMediaId, type MediaRecord } from "@/lib/hero-media-store";

type Context = { params: Promise<{ slot: string }> };
const error = (message: string, status: number) => Response.json({ error: message }, { status });

export async function POST(request: Request, context: Context) {
  if (!await isPortfolioOwner()) return error("Owner access required.", 403);
  const { slot } = await context.params;
  if (!isHeroSlot(slot)) return error("Choose a valid media slot.", 400);
  if (!sameOrigin(request)) return error("Upload from this site.", 403);
  if (Number(request.headers.get("content-length")) > maxMediaBytes + 1024 * 1024) return error("Choose a file under 4 MB.", 413);
  try {
    const file = await request.blob();
    const contentType = request.headers.get("content-type") || "";
    if (!file.size) return error("Choose an image or video.", 400);
    if (file.size > maxMediaBytes) return error("Choose a file under 4 MB.", 413);
    if (!acceptedMediaTypes.includes(contentType) || !matchesMediaType(contentType, new Uint8Array(await file.slice(0, 32).arrayBuffer()))) {
      return error("Use JPG, PNG, WebP, AVIF, MP4, or WebM.", 415);
    }
    const filename = decodeURIComponent(request.headers.get("x-media-filename") || "Uploaded media");
    const record: MediaRecord = {
      id: crypto.randomUUID(), kind: contentType.startsWith("video/") ? "video" : "image",
      contentType, name: filename.replace(/[\u0000-\u001f]/g, "").slice(0, 180),
    };
    const bucket = mediaBucket();
    await bucket.put(assetKey(slot, record.id), file.stream(), { httpMetadata: { contentType } });
    await bucket.put(slotKey(slot), JSON.stringify(record), { httpMetadata: { contentType: "application/json" } });
    return Response.json({ media: describeMedia(slot, record) });
  } catch {
    return error("The upload did not save. Please try again.", 503);
  }
}

export async function DELETE(request: Request, context: Context) {
  if (!await isPortfolioOwner()) return error("Owner access required.", 403);
  const { slot } = await context.params;
  if (!isHeroSlot(slot)) return error("Choose a valid media slot.", 400);
  if (!sameOrigin(request)) return error("Make this change from the site.", 403);
  try {
    // Keep previous versioned uploads; resetting only changes the active slot.
    await mediaBucket().delete(slotKey(slot));
    return Response.json({ slot });
  } catch {
    return error("The placeholder could not be restored. Please try again.", 503);
  }
}

export async function GET(request: Request, context: Context) {
  const { slot } = await context.params;
  if (!isHeroSlot(slot)) return error("Media not found.", 404);
  try {
    const version = new URL(request.url).searchParams.get("version") || (await readMedia(slot))?.id;
    if (!version || !validMediaId(version)) return error("Media not found.", 404);
    const bucket = mediaBucket();
    const key = assetKey(slot, version);
    const meta = await bucket.head(key);
    if (!meta) return error("Media not found.", 404);
    const headers = new Headers({ "Accept-Ranges": "bytes", "ETag": meta.httpEtag, "Cache-Control": "private, max-age=31536000, immutable", "X-Content-Type-Options": "nosniff" });
    meta.writeHttpMetadata(headers);
    if (request.headers.get("if-none-match") === meta.httpEtag) return new Response(null, { status: 304, headers });
    let range: { offset: number; length: number } | undefined;
    const rangeHeader = request.headers.get("range");
    if (rangeHeader) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader);
      const invalidRange = () => new Response(null, { status: 416, headers: { "Content-Range": `bytes */${meta.size}` } });
      if (!match || (!match[1] && !match[2])) return invalidRange();
      const start = match[1] ? Number(match[1]) : Math.max(0, meta.size - Number(match[2]));
      const end = match[1] && match[2] ? Math.min(Number(match[2]), meta.size - 1) : meta.size - 1;
      if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= meta.size || (!match[1] && Number(match[2]) === 0)) return invalidRange();
      range = { offset: start, length: end - start + 1 };
      headers.set("Content-Range", `bytes ${start}-${end}/${meta.size}`);
    }
    const object = await bucket.get(key, range ? { range } : {});
    if (!object) return error("Media not found.", 404);
    headers.set("Content-Length", String(range?.length ?? meta.size));
    return new Response(object.body, { status: range ? 206 : 200, headers });
  } catch {
    return error("Media could not load. Please try again.", 503);
  }
}
