"use client";
import {useEffect,useId,useRef,useState,type KeyboardEvent} from "react";
import {ArrowLeft,ArrowRight,ArrowUpRight} from "lucide-react";
type Artifact={title:string;description:string;image:string;alt:string};

export function ArtifactGallery({items,label,onViewArtifact,itemLabel="screens"}:{items:Artifact[];label:string;onViewArtifact:(artifact:Artifact)=>void;itemLabel?:string}) {
 const viewport=useRef<HTMLDivElement>(null);
 const [navigation,setNavigation]=useState({previous:false,next:false});
 const id=useId();
 useEffect(()=>{
  const node=viewport.current;if(!node)return;
  const sync=()=>setNavigation({previous:node.scrollLeft>2,next:node.scrollLeft<node.scrollWidth-node.clientWidth-2});
  sync();node.addEventListener("scroll",sync,{passive:true});
  const observer=new ResizeObserver(sync);observer.observe(node);
  return()=>{node.removeEventListener("scroll",sync);observer.disconnect();};
 },[items.length]);
 function move(direction:1|-1) {
  const node=viewport.current;if(!node)return;
  const maximum=Math.max(0,node.scrollWidth-node.clientWidth);
  const origin=(node.firstElementChild as HTMLElement|null)?.offsetLeft??0;
  const stops=Array.from(node.children).map(card=>Math.min((card as HTMLElement).offsetLeft-origin,maximum));
  const next=direction===1?stops.find(stop=>stop>node.scrollLeft+2)??maximum:[...stops].reverse().find(stop=>stop<node.scrollLeft-2)??0;
  node.scrollTo({left:next,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
 }
 function keyboard(event:KeyboardEvent<HTMLDivElement>) {
  if(event.target!==event.currentTarget||event.altKey||event.ctrlKey||event.metaKey)return;
  if(event.key==="ArrowRight"||event.key==="ArrowLeft"){event.preventDefault();move(event.key==="ArrowRight"?1:-1);}
 }
 return <div className="oneof-artifact-gallery">
  <div className="oneof-filmstrip-toolbar"><p>{items.length} {itemLabel} <span aria-hidden="true">·</span> Select a design to explore</p><div className="oneof-filmstrip-controls"><button type="button" aria-label={"Previous "+label.toLowerCase()+" designs"} aria-controls={id} disabled={!navigation.previous} onClick={()=>move(-1)}><ArrowLeft size={17} aria-hidden="true"/></button><button type="button" aria-label={"Next "+label.toLowerCase()+" designs"} aria-controls={id} disabled={!navigation.next} onClick={()=>move(1)}><ArrowRight size={17} aria-hidden="true"/></button></div></div>
  <div className="oneof-filmstrip" id={id} ref={viewport} role="region" aria-label={label+" designs. Swipe, scroll, or use the navigation arrows."} tabIndex={0} onKeyDown={keyboard}>
   {items.map((item,i)=><button type="button" className="oneof-filmstrip-card" key={item.image+String(i)} onClick={()=>onViewArtifact(item)} aria-label={"View "+item.title}><span className="oneof-filmstrip-thumb"><img src={item.image} alt={item.alt} loading="lazy" draggable={false}/></span><span className="oneof-filmstrip-caption"><span className="oneof-filmstrip-index">{String(i+1).padStart(2,"0")}</span><span>{item.title}</span><ArrowUpRight size={16} aria-hidden="true"/></span></button>)}
  </div>
 </div>;
}

