// Replace null with a public asset path when the finished project media is ready.
// Videos should use a poster image and captions when they contain speech.
export type CaseMedia = { title: string; caption: string; src: string | null; type: "image" | "video"; poster?: string; captions?: string };
export const stateFarmMedia: CaseMedia[] = [
  { title: "Desktop assistance", caption: "Add a widget or side-panel exploration here.", src: null, type: "image" },
  { title: "A path to human help", caption: "Add a handoff flow or annotated prototype here.", src: null, type: "image" },
  { title: "The experience in motion", caption: "Add a short walkthrough of the conversational journey here.", src: null, type: "video" },
];
