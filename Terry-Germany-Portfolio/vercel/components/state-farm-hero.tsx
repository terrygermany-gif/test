"use client";

import { useState } from "react";

const prototypeUrl = 'https://easing-saint-57808727.figma.site/';

type Props = { title:string; description:string; headingId:string; onInspect:()=>void };

export default function StateFarmHero({title,description,headingId,onInspect}:Props){
  const [motionPaused, setMotionPaused] = useState(false);
  return <section className="study-cover sf-hero" aria-labelledby={headingId}>
    <div className="sf-hero-canvas" data-motion-paused={motionPaused}>
      <span className="sf-hero-label">State Farm / Case study</span>
      <a className="sf-hero-prototype-link" href={prototypeUrl} target="_blank" rel="noopener noreferrer">Explore prototype <span aria-hidden="true">↗</span></a>
      <button type="button" className="sf-hero-motion-toggle" aria-pressed={motionPaused} aria-label={motionPaused ? "Play hero image motion" : "Pause hero image motion"} onClick={()=>setMotionPaused(paused=>!paused)}>{motionPaused ? "Play motion" : "Pause motion"}</button>
      <button type="button" className="sf-hero-artwork" onClick={onInspect} aria-label="Inspect State Farm Digital Assistant hero image">
        <img src="/work/state-farm-case-study-hero.png" width={2048} height={1424} alt="State Farm Digital Assistant license scanning and AI avatar experiences alongside a family" fetchPriority="high"/>
      </button>
      <div className="sf-hero-title"><h1 id={headingId}>{title}</h1><p>{description}</p></div>
    </div>
  </section>;
}
