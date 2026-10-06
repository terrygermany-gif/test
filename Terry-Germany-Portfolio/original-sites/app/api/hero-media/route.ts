import { heroSlots } from "@/lib/hero-media";
import { describeMedia, readMedia } from "@/lib/hero-media-store";

export async function GET() {
  try {
    const media = await Promise.all(heroSlots.map(async slot => {
      const record = await readMedia(slot);
      return record ? describeMedia(slot, record) : null;
    }));
    return Response.json({ media: media.filter(Boolean) }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Saved media could not load. Please try again." }, { status: 503 });
  }
}
