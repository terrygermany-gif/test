"use client";

import { useEffect, useRef, useState } from 'react';
import { Compass, FileSearch, Search, PanelsTopLeft, TrendingUp, Waypoints, Users } from 'lucide-react';

const chapters:Record<string,{label:string;purpose:string;icon:typeof Compass}>={
  contribution:{label:'Contribution',purpose:'My leadership, responsibilities, and collaboration across the program.',icon:Users},
  maturity:{label:'AI Maturity',purpose:'How the AI direction progressed from Level 1 to Level 3.',icon:Waypoints},
  evidence:{label:'Evidence',purpose:'The artifacts and project context behind the work.',icon:FileSearch},
  research:{label:'Research',purpose:'The questions, insights, and customer friction that informed the direction.',icon:Search},
  strategy:{label:'Strategy',purpose:'How comparison and engagement thinking shaped the opportunity.',icon:Compass},
  decisions:{label:'Design decisions',purpose:'What I chose, why it mattered, and how it became an experience.',icon:PanelsTopLeft},
  impact:{label:'Outcomes',purpose:'The documented contribution, what remains to validate, and lessons to carry forward.',icon:TrendingUp},
};
export function StudyChapterHeading({name,number,title,headingId,compact=false}:{compact?:boolean;name:string;number:string;title:string;headingId:string}){
  const chapter=chapters[name];const Icon=chapter.icon;
  return <header className="proof-section-heading study-chapter-heading"><div className="study-chapter-label"><span className="study-chapter-number">{number}</span><Icon size={16} aria-hidden="true"/><span>{chapter.label}</span></div><h2 id={headingId}>{title}</h2>{!compact&&<p className="study-chapter-purpose">{chapter.purpose}</p>}</header>;
}
export function StudyChapterNav({slug,sections}:{slug:string;sections:string[]}){
  const ref=useRef<HTMLElement>(null);
  const [active,setActive]=useState(sections[0]);
  const order=sections.join(',');
  useEffect(()=>{
    const nav=ref.current;if(!nav)return;
    const article=nav.closest('article');
    const scroller=nav.closest<HTMLElement>('.case-study-viewer');
    const target=scroller||window;
    const names=order.split(',');
    const nodes=names.map(name=>article?.querySelector<HTMLElement>(`#${slug}-${name}`)).filter((node):node is HTMLElement=>!!node);
    let frame=0;
    const update=()=>{
      const boundary=nav.getBoundingClientRect().bottom+36;
      let current=names[0];
      for(const node of nodes){if(node.getBoundingClientRect().top<=boundary)current=node.id.slice(slug.length+1);}
      setActive(current);
    };
    const onScroll=()=>{if(frame)return;frame=requestAnimationFrame(()=>{frame=0;update();});};
    update();target.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);
    return()=>{target.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);cancelAnimationFrame(frame);};
  },[slug,order]);
  useEffect(()=>{
    const nav=ref.current;const list=nav?.querySelector<HTMLElement>('.study-chapter-nav-links');const item=nav?.querySelector<HTMLElement>('[aria-current=location]');
    if(!list||!item)return;
    const left=item.offsetLeft-list.offsetLeft;
    if(left<list.scrollLeft||left+item.offsetWidth>list.scrollLeft+list.clientWidth)list.scrollTo({left:Math.max(0,left-16),behavior:'instant'});
  },[active]);
  return <nav ref={ref} className="study-chapter-nav" aria-label="Case study sections"><div className="study-chapter-nav-inner"><span className="study-chapter-nav-caption">In this case study</span><div className="study-chapter-nav-links">{sections.map((name,index)=><a key={name} href={`#${slug}-${name}`} aria-current={active===name?'location':undefined} onClick={event=>{if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;const node=ref.current?.closest('article')?.querySelector<HTMLElement>(`#${slug}-${name}`);if(node){event.preventDefault();setActive(name);node.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}}}><span>{String(index+1).padStart(2,'0')}</span>{chapters[name].label}</a>)}</div></div></nav>;
}
