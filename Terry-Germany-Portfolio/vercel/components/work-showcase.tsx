"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ChangeEvent } from "react";
import Image from "next/image";
import { CaseStudyLink as Link } from "@/components/case-study-viewer";
import { ImagePlus, LoaderCircle, Pause, Play, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { acceptedMediaTypes, defaultHeroMedia, heroSlots, maxMediaBytes, slotLabels, type HeroMedia, type HeroSlot } from "@/lib/hero-media";

import { usePortfolioContent } from "@/components/portfolio-content-provider";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
function reducedMotionSnapshot() { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }

async function mediaResponse<T>(response: Response): Promise<T> {
  const fallback = response.status === 413 ? "Choose a smaller file and try again." : "Media could not save or load. Please try again.";
  const result = await response.json().catch(() => { throw new Error(fallback); }) as T & { error?: string };
  if (!response.ok) throw new Error(result.error || fallback);
  return result;
}

async function fetchSavedMedia(signal: AbortSignal): Promise<HeroMedia[]> {
  const response = await fetch("/api/hero-media", { signal, cache: "no-store" });
  const result = await mediaResponse<{ media: HeroMedia[] }>(response);
  return defaultHeroMedia.map(item => result.media.find(saved => saved.slot === item.slot) ?? item);
}

function Media({ media, playing, priority = false }: { media: HeroMedia; playing: boolean; priority?: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!video.current) return;
    if (playing) void video.current.play().catch(() => {});
    else video.current.pause();
  }, [playing, media.src]);
  if (media.kind === "video") return <video ref={video} src={media.src} muted loop playsInline preload="metadata" aria-hidden="true" className="hero-media-image" />;
  if (media.stateFarmCrop) return <Image src={media.src} alt="" width={368} height={1098} unoptimized priority={priority} className="hero-state-farm" />;
  return <Image src={media.src} alt="" fill unoptimized priority={priority} sizes="300px" className="hero-media-image" />;
}

export default function WorkShowcase() {
  const {content,canEdit,preview}=usePortfolioContent();
  const reducedMotion = useSyncExternalStore(subscribeToReducedMotion, reducedMotionSnapshot, () => true);
  const [media, setMedia] = useState<HeroMedia[]>(defaultHeroMedia);
  const [paused, setPaused] = useState(false);
  const [alternate, setAlternate] = useState(false);
  const [inView, setInView] = useState(true);
  const [visible, setVisible] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [selected, setSelected] = useState<HeroSlot>("phone");
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);
  const [busy, setBusy] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const stage = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const playing = !paused && !reducedMotion && inView && visible && !editorOpen;
  const current = media.find(item => item.slot === selected)!;
  const previews = [
    { side: "left", label: "Product design", slots: ["reel-1", "reel-3"] },
    { side: "right", label: "Journey mapping", slots: ["reel-2", "reel-4"] },
  ].map(preview => {
    const items = preview.slots.map(slot => media.find(item => item.slot === slot)!);
    return { ...preview, items: items[0].src === items[1].src ? items.slice(0, 1) : items };
  });

  useEffect(() => {
    if (!playing) return;
    const interval = window.setInterval(() => setAlternate(value => !value), 16000);
    return () => window.clearInterval(interval);
  }, [playing]);

  useEffect(() => {
    const controller = new AbortController();
    void fetchSavedMedia(controller.signal).then(saved => {
      if (!controller.signal.aborted) setMedia(saved);
    }).catch(cause => {
      if (!controller.signal.aborted) setLoadError(cause instanceof Error ? cause.message : "Saved media could not load. Please try again.");
    }).finally(() => {
      if (!controller.signal.aborted) setLoading(false);
    });
    return () => controller.abort();
  }, [reload]);
  useEffect(() => {
    const onVisibility = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    if (stage.current) observer.observe(stage.current);
    return () => { document.removeEventListener("visibilitychange", onVisibility); observer.disconnect(); };
  }, []);

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setError(""); setMessage("");
    if (!acceptedMediaTypes.includes(file.type)) { setError("Use JPG, PNG, WebP, AVIF, MP4, or WebM."); return; }
    if (file.size > maxMediaBytes) { setError("Choose a file under 4 MB."); return; }
    const slot = selected;
    setBusy(true);
    try {
      const response = await fetch(`/api/hero-media/${slot}`, { method: "POST", body: file, headers: { "Content-Type": file.type, "X-Media-Filename": encodeURIComponent(file.name) } });
      const result = await mediaResponse<{ media: HeroMedia }>(response);
      setMedia(items => items.map(item => item.slot === slot ? result.media : item));
      setMessage(`${slotLabels[slot]} saved.`);
      if (fileInput.current) fileInput.current.value = "";
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The upload did not save. Please try again.");
    } finally { setBusy(false); }
  }

  async function reset() {
    const slot = selected;
    setBusy(true); setError(""); setMessage("");
    try {
      const response = await fetch(`/api/hero-media/${slot}`, { method: "DELETE" });
      await mediaResponse(response);
      setMedia(items => items.map(item => item.slot === slot ? defaultHeroMedia.find(filler => filler.slot === slot)! : item));
      setMessage(`${slotLabels[slot]} restored.`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The placeholder could not be restored. Please try again.");
    } finally { setBusy(false); }
  }

  return <div className="work-showcase">
    <div className="media-hero-layout">
    <div className="media-hero-intro">
      <p className="media-hero-badge"><span>Terry Germany</span><span aria-hidden="true"> · </span><span>{content.home.heroBadge}</span></p>
      <h1 id="hero-title">{content.home.heroLines.map((line,i)=><span key={i} className={i===3?"hero-title-accent":undefined}>{line}</span>)}</h1>
      <p className="media-hero-description">{content.home.heroDescription}</p>
      <div className="media-hero-actions">
        <Link href="/work" className="button primary">See selected work</Link>
        <a href="/Terry-Germany-Resume.pdf" className="button" target="_blank" rel="noopener noreferrer">View resume</a>
      </div>
    </div>
    <div ref={stage} className="media-hero-stage" data-playing={playing}>
      {previews.map(preview => <div key={preview.side} className={`media-project-preview ${preview.side}`} style={{ animationPlayState: playing ? "running" : "paused" }} aria-hidden="true">
        <div className="media-preview-screen">
          {preview.items.map((item, index) => {
            const active = preview.items.length === 1 || index === (alternate ? 1 : 0);
            return <div key={item.slot} className={`media-preview-layer ${active ? "active" : ""}`} data-artifact={item.src === "/work/editorial-ai.png" ? "editorial" : item.src === "/work/event-flow.png" ? "journey" : "custom"}><Media media={item} playing={playing && active} priority={index === 0} /></div>;
          })}
        </div>
        <span className="media-preview-caption">{preview.label}</span>
      </div>)}
      <Link href="/work/digital-assistance" className="media-featured-project" aria-label="Explore the State Farm Conversational Digital Assistant project">
        <div className="media-phone-frame" aria-hidden="true">
          <div className="media-phone-screen"><Media media={media[0]} playing={playing} priority /></div>
          <div className="media-phone-island" />
        </div>
        <span className="media-project-link">Explore the State Farm project</span>
      </Link>
      <div className="media-hero-controls">
        {!reducedMotion && <button type="button" className="media-icon-button" onClick={() => setPaused(value => !value)} aria-label={paused ? "Play animation" : "Pause animation"} title={paused ? "Play animation" : "Pause animation"}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>}
        {canEdit&&!preview&&<button type="button" className="media-icon-button" onClick={() => setEditorOpen(true)} aria-label="Replace hero media" title="Replace hero media"><ImagePlus size={18} /></button>}
      </div>
    </div>
    </div>
    <div className="hero-experience" aria-label="Experience across companies">
      <p>Experience across</p>
      <div className="hero-experience-companies"><span>Apple</span><span>Cisco</span><span>State Farm</span><span>Scoop News Group</span></div>
    </div>

    <Dialog open={editorOpen} onOpenChange={open => { if (!busy) setEditorOpen(open); }}>
      <DialogContent className="hero-media-dialog" onEscapeKeyDown={event => { if (busy) event.preventDefault(); }} onPointerDownOutside={event => { if (busy) event.preventDefault(); }}>
        <DialogHeader><DialogTitle>Hero media</DialogTitle><DialogDescription>Choose the phone or a preview, then add an image or video. Alternate previews fade in every 16 seconds. Videos play silently on repeat.</DialogDescription></DialogHeader>
        <RadioGroup className="hero-media-slots" value={selected} onValueChange={value => { setSelected(value as HeroSlot); setError(""); setMessage(""); if (fileInput.current) fileInput.current.value = ""; }} disabled={busy} aria-label="Media slot">
          {heroSlots.map(slot => <label key={slot} className={`hero-media-slot ${selected === slot ? "selected" : ""}`}><div className="hero-slot-thumbnail"><Media media={media.find(item => item.slot === slot)!} playing={false} /></div><span><RadioGroupItem value={slot} />{slotLabels[slot]}</span></label>)}
        </RadioGroup>
        {loading ? <p className="hero-editor-status" role="status">Loading saved media…</p> : loadError ? <div className="hero-editor-error" role="alert"><p>{loadError}</p><button className="button" onClick={() => { setLoading(true); setLoadError(""); setReload(value => value + 1); }}>Try again</button></div> : <>
          <div className="hero-upload-area">
            <p className="hero-current-file">{current.name}</p>
            <label className={`button primary hero-upload-button ${busy ? "disabled" : ""}`}>
              {busy ? <LoaderCircle size={18} className="hero-loading-icon" /> : <Upload size={18} />}{busy ? "Saving…" : "Choose image or video"}
              <input ref={fileInput} type="file" onClick={event => { event.currentTarget.value = ""; }} accept={acceptedMediaTypes.join(",")} onChange={event => void upload(event)} disabled={busy} aria-label={`Upload media for ${slotLabels[selected]}`} />
            </label>
            <p className="hero-upload-hint">JPG, PNG, WebP, AVIF, MP4, or WebM · Up to 4 MB</p>
            {current.uploaded && <button className="hero-reset" disabled={busy} onClick={() => void reset()}>Use original placeholder</button>}
          </div>
          {error && <p role="alert" className="hero-editor-error">{error}</p>}
          <p className="hero-editor-status" role="status">{message}</p>
        </>}
      </DialogContent>
    </Dialog>
  </div>;
}
