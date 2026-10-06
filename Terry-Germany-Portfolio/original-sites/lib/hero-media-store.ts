import { env } from "cloudflare:workers";
import { type HeroMedia, type HeroSlot } from "@/lib/hero-media";

export type MediaRecord = { id: string; kind: "image" | "video"; contentType: string; name: string };
export const validMediaId = (id: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
export function mediaBucket(): R2Bucket {
  const bucket = (env as unknown as { HERO_MEDIA?: R2Bucket }).HERO_MEDIA;
  if (!bucket) throw new Error("Hero media storage is unavailable.");
  return bucket;
}
export const slotKey = (slot: HeroSlot) => `hero/slots/${slot}.json`;
export const assetKey = (slot: HeroSlot, id: string) => `hero/media/${slot}/${id}`;
export async function readMedia(slot: HeroSlot): Promise<MediaRecord | null> {
  const object = await mediaBucket().get(slotKey(slot));
  if (!object) return null;
  const value = await object.json<MediaRecord>();
  if (!validMediaId(value.id) || !["image", "video"].includes(value.kind)) return null;
  return value;
}
export function describeMedia(slot: HeroSlot, record: MediaRecord): HeroMedia {
  return { slot, kind: record.kind, src: `/api/hero-media/${slot}?version=${record.id}`, name: record.name, uploaded: true };
}
export function matchesMediaType(type: string, bytes: Uint8Array): boolean {
  const ascii = (from: number, to: number) => String.fromCharCode(...bytes.slice(from, to));
  if (type === "image/jpeg") return bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  if (type === "image/png") return [137, 80, 78, 71, 13, 10, 26, 10].every((n, i) => bytes[i] === n);
  if (type === "image/webp") return ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP";
  if (type === "image/avif") return ascii(4, 8) === "ftyp" && /avif|avis/.test(ascii(8, 32));
  if (type === "video/mp4") return ascii(4, 8) === "ftyp" && !/avif|avis/.test(ascii(8, 32));
  if (type === "video/webm") return [26, 69, 223, 163].every((n, i) => bytes[i] === n);
  return false;
}
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}
