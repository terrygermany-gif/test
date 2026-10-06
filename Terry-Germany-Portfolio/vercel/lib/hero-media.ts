export const heroSlots = ["phone", "reel-1", "reel-2", "reel-3", "reel-4"] as const;
export type HeroSlot = typeof heroSlots[number];
export type HeroMedia = {
  slot: HeroSlot;
  kind: "image" | "video";
  src: string;
  name: string;
  stateFarmCrop?: boolean;
  uploaded?: boolean;
};
export const slotLabels: Record<HeroSlot, string> = {
  phone: "Center phone", "reel-1": "Left preview", "reel-2": "Right preview", "reel-3": "Left alternate", "reel-4": "Right alternate",
};
export const defaultHeroMedia: HeroMedia[] = [
  { slot: "phone", kind: "image", src: "/work/state-farm-assistant.png", name: "State Farm assistant", stateFarmCrop: true },
  { slot: "reel-1", kind: "image", src: "/work/editorial-ai.png", name: "Editorial product screens" },
  { slot: "reel-2", kind: "image", src: "/work/event-flow.png", name: "Event journey map" },
  { slot: "reel-3", kind: "image", src: "/work/editorial-ai.png", name: "Editorial product screens" },
  { slot: "reel-4", kind: "image", src: "/work/event-flow.png", name: "Event journey map" },
];
export const maxMediaBytes = 4 * 1024 * 1024;
export const acceptedMediaTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "video/mp4", "video/webm"];
export function isHeroSlot(value: string): value is HeroSlot {
  return (heroSlots as readonly string[]).includes(value);
}
