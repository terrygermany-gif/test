"use client";
import {useEffect,useId,useRef,useState} from 'react';
import {BookOpen,Cpu,PenTool,PanelsTopLeft,Pause,Play} from 'lucide-react';
import type {AppleMusic} from '@/lib/apple-music';

const icons=[PenTool,Cpu,BookOpen,PanelsTopLeft];

export default function AppleMusicMcpFlow({content}:{content:AppleMusic['mcpFlow']}){
 const id=useId(),figureRef=useRef<HTMLElement|null>(null);
 const [active,setActive]=useState(0),[playing,setPlaying]=useState(true);
 const [visible,setVisible]=useState(false),[reducedMotion,setReducedMotion]=useState(true);
 const running=playing&&visible&&!reducedMotion;

 useEffect(()=>{
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
  const update=()=>setReducedMotion(preference.matches);
  update();preference.addEventListener('change',update);
  return ()=>preference.removeEventListener('change',update);
 },[]);

 useEffect(()=>{
  const figure=figureRef.current;if(!figure)return;
  if(typeof IntersectionObserver==='undefined'){setVisible(true);return;}
  const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.15});
  observer.observe(figure);return ()=>observer.disconnect();
 },[]);

 useEffect(()=>{
  if(!running)return;
  const timer=window.setInterval(()=>setActive(current=>(current+1)%4),3200);
  return ()=>window.clearInterval(timer);
 },[running]);

 function selectStage(index:number){setActive(index);setPlaying(false);}
 const current=content.stages[active];

 return <figure ref={figureRef} className="apple-music-mcp-flow" data-running={running?'true':'false'} aria-labelledby={id+'-title'}>
  <div className="apple-music-flow-heading"><div><span className="apple-music-flow-eyebrow">Workflow illustration</span><h3 id={id+'-title'}>{content.title}</h3></div><button type="button" className="apple-music-flow-play" disabled={reducedMotion} aria-controls={id+'-stages'} onClick={()=>setPlaying(value=>!value)}>{playing&&!reducedMotion?<Pause size={14} aria-hidden="true"/>:<Play size={14} aria-hidden="true"/>}{reducedMotion?'Animation off':playing?'Pause animation':'Play animation'}{reducedMotion&&<span className="sr-only"> for your reduced-motion preference. Select any step to explore.</span>}</button></div>
  <p className="apple-music-flow-intro">{content.intro}</p>
  <p className="apple-music-flow-prompt"><span>Example prompt</span><q>{content.prompt}</q></p>
  <ol className="apple-music-flow-stages" id={id+'-stages'} aria-label="Prompt-to-UI workflow">
   {content.stages.map((stage,i)=>{const Icon=icons[i];return <li key={i}><button type="button" aria-pressed={active===i} aria-controls={id+'-detail'} onClick={()=>selectStage(i)}><span className="apple-music-flow-step-number">{String(i+1).padStart(2,'0')}</span><Icon size={25} strokeWidth={1.5} aria-hidden="true"/><strong>{stage.title}</strong><span className="apple-music-flow-step-subtitle">{stage.subtitle}</span></button>{i<3&&<span className="apple-music-flow-link" aria-hidden="true"><span/></span>}</li>;})}
  </ol>
  <div className="apple-music-flow-detail" id={id+'-detail'}><span>{String(active+1).padStart(2,'0')} / 04</span><p>{current.detail}</p></div>
  <dl className="apple-music-flow-accelerations">{content.accelerations.map((item,i)=><div key={i}><dt>{item.title}</dt><dd>{item.description}</dd></div>)}</dl>
  <figcaption>{content.note}</figcaption>
 </figure>;
}
