"use client";
import {useEffect,useId,useRef,useState,type KeyboardEvent} from "react";
import {ArrowLeft,ArrowRight} from "lucide-react";

type MobileScreen={title:string;description:string;image:string;alt:string;lightImage?:string};
export default function AvailityMobileGallery({title,intro,items,eyebrow="MOBILE VISUALS"}:{title:string;intro:string;items:MobileScreen[];eyebrow?:string}){
 const id=useId();
 const viewport=useRef<HTMLDivElement>(null);
 const [navigation,setNavigation]=useState({previous:false,next:false,progress:0});
 useEffect(()=>{
  const node=viewport.current;if(!node)return;
  const sync=()=>{const maximum=Math.max(0,node.scrollWidth-node.clientWidth);const position=Math.max(0,Math.min(node.scrollLeft,maximum));setNavigation({previous:position>2,next:position<maximum-2,progress:maximum?position/maximum*100:100});};
  sync();node.addEventListener("scroll",sync,{passive:true});
  const observer=new ResizeObserver(sync);observer.observe(node);
  return()=>{node.removeEventListener("scroll",sync);observer.disconnect();};
 },[items.length]);
 function move(direction:"previous"|"next"|"first"|"last"){
  const node=viewport.current;if(!node)return;
  const maximum=Math.max(0,node.scrollWidth-node.clientWidth);
  const origin=(node.firstElementChild as HTMLElement|null)?.offsetLeft??0;
  const stops=Array.from(node.children).map(card=>Math.min((card as HTMLElement).offsetLeft-origin,maximum));
  const target=direction==="first"?0:direction==="last"?maximum:direction==="next"?stops.find(position=>position>node.scrollLeft+2)??maximum:[...stops].reverse().find(position=>position<node.scrollLeft-2)??0;
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  node.scrollTo({left:target,behavior:reduced?"auto":"smooth"});
 }
 function keyboard(event:KeyboardEvent<HTMLDivElement>){
  if(event.altKey||event.ctrlKey||event.metaKey)return;
  const direction=event.key==="ArrowRight"?"next":event.key==="ArrowLeft"?"previous":event.key==="Home"?"first":event.key==="End"?"last":null;
  if(direction){event.preventDefault();move(direction);}
 }
 return <section className="availity-section availity-mobile-carousel" aria-labelledby={id+"-title"}>
  <p className="availity-eyebrow">{eyebrow}</p>
  <div className="availity-heading-row"><h2 id={id+"-title"}>{title}</h2><p>{intro}</p></div>
  <div className="availity-mobile-carousel-toolbar">
   <p>{items.length} screens <span aria-hidden="true">·</span> Swipe or scroll to explore</p>
   <div className="availity-mobile-carousel-controls" aria-label="Mobile gallery navigation">
    <button type="button" aria-label="Previous mobile screen" aria-controls={id+"-viewport"} disabled={!navigation.previous} onClick={()=>move("previous")}><ArrowLeft size={18} aria-hidden="true"/></button>
    <button type="button" aria-label="Next mobile screen" aria-controls={id+"-viewport"} disabled={!navigation.next} onClick={()=>move("next")}><ArrowRight size={18} aria-hidden="true"/></button>
   </div>
  </div>
  <div id={id+"-viewport"} className="availity-mobile-carousel-viewport" ref={viewport} tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Mobile design screens. Use left and right arrow keys to explore." onKeyDown={keyboard}>
   {items.map((item,index)=><figure className="availity-mobile-carousel-card" key={index} role="group" aria-label={"Screen "+(index+1)+" of "+items.length}>
    <div className="availity-mobile-carousel-screen"><img className={item.lightImage?"mobile-image-dark":undefined} src={item.image} alt={item.alt} loading="lazy" draggable={false}/>{item.lightImage&&<img className="mobile-image-light" src={item.lightImage} alt={item.alt} loading="lazy" draggable={false}/>}</div>
    <figcaption><span className="availity-mobile-carousel-index">{String(index+1).padStart(2,"0")}</span><h3>{item.title}</h3><p>{item.description}</p></figcaption>
   </figure>)}
  </div>
  <div className="availity-mobile-carousel-progress" aria-hidden="true"><span style={{width:Math.max(4,navigation.progress)+"%"}}/></div>
 </section>;
}
