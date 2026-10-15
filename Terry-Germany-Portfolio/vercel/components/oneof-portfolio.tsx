"use client";
import {useRef,useState} from "react";
import Link from "next/link";
import {ArrowLeft,ArrowRight,X} from "lucide-react";
import ThemeToggle from "./theme-toggle";
import {usePortfolioContent} from "./portfolio-content-provider";
import {Dialog,DialogContent,DialogTitle,DialogDescription} from "./ui/dialog";
import OneofPortfolioBody from "./oneof-portfolio-body";
import AvailityMobileGallery from "./availity-mobile-gallery";
import type {OneofSuperlogic} from "@/lib/oneof-superlogic";
export default function OneofPortfolio({onClose}:{onClose?:()=>void}){
 const {content,canEdit,preview}=usePortfolioContent();
 const project=content.oneofSuperlogic;
 const hero=content.portfolioHeroes["oneof-superlogic"];
 const backHref=preview?"/edit/preview?view=work":"/work?view=portfolio";
 const [selected,setSelected]=useState<OneofSuperlogic["desktop"][number]|null>(null);
 const [artifactOpen,setArtifactOpen]=useState(false);
 const imageViewport=useRef<HTMLDivElement>(null);
 const returnFocus=useRef<HTMLElement|null>(null);
 const galleryItems=selected&&project.creation.includes(selected)?project.creation:project.desktop;
 const galleryIndex=selected?galleryItems.indexOf(selected):-1;
 const isGallery=galleryIndex>=0;
 const galleryLabel=galleryItems===project.creation?"creation journey":"workspace";
 function openArtifact(artifact:OneofSuperlogic["desktop"][number]){
  returnFocus.current=document.activeElement instanceof HTMLElement?document.activeElement:null;
  setSelected(artifact);
  setArtifactOpen(true);
 }
 function moveGallery(direction:1|-1){
  const next=galleryIndex+direction;
  if(galleryIndex<0||next<0||next>=galleryItems.length)return;
  setSelected(galleryItems[next]);
  if(imageViewport.current)imageViewport.current.scrollTop=0;
 }
 const editHref=canEdit&&!preview?"/edit?portfolio=oneof-superlogic":undefined;
 return <article className="upgather-research availity-portfolio oneof-portfolio" aria-labelledby="oneof-title">
  <header className="upgather-toolbar" aria-label="Portfolio viewer controls">
   {onClose?<button type="button" className="proof-back" onClick={onClose}><ArrowLeft size={17} aria-hidden="true"/>All portfolio</button>:<Link className="proof-back" href={backHref}><ArrowLeft size={17} aria-hidden="true"/>All portfolio</Link>}
   <div className="upgather-toolbar-actions"><ThemeToggle/>{onClose?<button type="button" className="study-close" onClick={onClose} aria-label="Close portfolio project"><X size={18}/></button>:<Link className="study-close" href={backHref} aria-label="Back to portfolio"><X size={18}/></Link>}</div>
  </header>
  <OneofPortfolioBody hero={hero} project={project} editHref={editHref} onViewArtifact={openArtifact} mobileGallery={<AvailityMobileGallery title={project.mobileTitle} intro={project.mobileIntro} items={project.mobile}/>}/>
  <Dialog open={artifactOpen} onOpenChange={setArtifactOpen}>
   <DialogContent fullScreen={isGallery} showCloseButton={!isGallery} className={"availity-image-dialog oneof-image-dialog"+(isGallery?" oneof-gallery-dialog":"")} onOpenAutoFocus={event=>{if(isGallery){event.preventDefault();imageViewport.current?.focus({preventScroll:true});}}} onCloseAutoFocus={event=>{event.preventDefault();returnFocus.current?.focus({preventScroll:true});}} onKeyDown={event=>{
    if(!isGallery||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey)return;
    if(event.key==="ArrowRight"||event.key==="ArrowLeft"){event.preventDefault();moveGallery(event.key==="ArrowRight"?1:-1);}
   }}>
    {isGallery?<>
     <header className="oneof-gallery-header">
      <div className="oneof-gallery-heading"><DialogTitle>{selected?.title}</DialogTitle><DialogDescription aria-live="polite">{selected?.description}</DialogDescription></div>
      <div className="oneof-gallery-controls" aria-label="Design viewer navigation">
       <button type="button" aria-label={"Previous "+galleryLabel+" design"} disabled={galleryIndex===0} onClick={()=>moveGallery(-1)}><ArrowLeft size={18} aria-hidden="true"/></button>
       <span aria-live="polite">{galleryIndex+1} / {galleryItems.length}</span>
       <button type="button" aria-label={"Next "+galleryLabel+" design"} disabled={galleryIndex===galleryItems.length-1} onClick={()=>moveGallery(1)}><ArrowRight size={18} aria-hidden="true"/></button>
       <button type="button" aria-label="Close design viewer" onClick={()=>setArtifactOpen(false)}><X size={18} aria-hidden="true"/></button>
      </div>
     </header>
     <div className="oneof-gallery-image" ref={imageViewport} role="region" aria-label="Full design. Scroll to explore." tabIndex={0}>{selected&&<img src={selected.image} alt={selected.alt}/>}</div>
    </>:<><DialogTitle>{selected?.title}</DialogTitle><DialogDescription>Original OneOf design artifact.</DialogDescription>{selected&&<img src={selected.image} alt={selected.alt}/>}</>}
   </DialogContent>
  </Dialog>
 </article>;
}
