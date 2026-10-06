"use client";

import { useEffect, useRef, useState } from 'react';

const prototypeUrl = 'https://easing-saint-57808727.figma.site/';
const prototypeWidth = 1440;

type Props = { title:string; description:string; headingId:string; onInspect:(kind:'phone'|'laptop')=>void };

// Layout: TG Portfolio – 2026, Editorial opening 31:726 (1440 × 722).
// The exported device artwork includes the original Figma screens, masks, and shadow.
export default function StateFarmHero({title,description,headingId,onInspect}:Props){
  const screenRef = useRef<HTMLDivElement>(null);
  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    const screen = screenRef.current;
    if (!screen) return;
    const observer = new ResizeObserver(([entry]) => setScreenWidth(entry.contentRect.width));
    observer.observe(screen);
    return () => observer.disconnect();
  }, []);
  return <section className="study-cover sf-hero" aria-labelledby={headingId}>
    <div className="sf-hero-canvas">
      <span className="sf-hero-label">State Farm / Case study</span>
      <a className="sf-hero-prototype-link" href={prototypeUrl} target="_blank" rel="noopener noreferrer">Explore prototype <span aria-hidden="true">↗</span></a>
      <div className="sf-hero-laptop">
        <img src="/work/state-farm-hero-laptop.png" width={908} height={616} alt="MacBook displaying the State Farm interactive prototype" fetchPriority="high"/>
        <div className="sf-hero-live-screen" ref={screenRef}>
          {screenWidth > 0 && <iframe
            src={prototypeUrl}
            title="Interactive State Farm insurance shopping prototype"
            className="sf-hero-prototype"
            width={prototypeWidth}
            height={Math.round(prototypeWidth * 291.595 / 439.167)}
            style={{transform: `scale(${screenWidth / prototypeWidth})`}}
            allow="autoplay; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
          />}
        </div>
      </div>
      <button type="button" className="sf-hero-phone" onClick={()=>onInspect('phone')} aria-label="Inspect State Farm Digital Assistant"><img src="/work/state-farm-hero-phone.png" width={205} height={393} alt="State Farm Digital Assistant guiding an auto quote with license scanning"/></button>
      <div className="sf-hero-title"><h1 id={headingId}>{title}</h1><p>{description}</p></div>
    </div>
  </section>;
}
