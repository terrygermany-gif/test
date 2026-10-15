"use client";

import { createContext, useContext, useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import PortfolioProject from "@/components/portfolio-project";
import { usePortfolioContent } from "@/components/portfolio-content-provider";
import { portfolioPieces } from "@/lib/portfolio-pieces";

const ViewerContext = createContext<((slug:string) => boolean) | null>(null);
const marker = "terryPortfolioViewer";
export function PortfolioViewerProvider({children}: {children: ReactNode}) {
 const projects=portfolioPieces;
 const [slug,setSlug]=useState<string|null>(null);
 const project=projects.find(p=>p.id===slug);
 const isOpen=useRef(false),returnFocus=useRef<HTMLElement|null>(null),returnScroll=useRef(0),returnHref=useRef("/"),returnHistoryState=useRef<unknown>(null),viewer=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const history=(event:PopStateEvent)=>{if(isOpen.current){event.stopImmediatePropagation();isOpen.current=false;setSlug(null);}};
  window.addEventListener("popstate",history,true);return()=>window.removeEventListener("popstate",history,true);
 },[]);
 useEffect(()=>{if(slug)viewer.current?.scrollTo(0,0);},[slug]);
 function launch(nextSlug:string) {
  if(!projects.some(p=>p.id===nextSlug))return false;
  if(isOpen.current){History.prototype.replaceState.call(window.history,{...window.history.state,[marker]:true},"",`/portfolio/${nextSlug}`);setSlug(nextSlug);return true;}
  if(!["/", "/work", "/work/"].includes(window.location.pathname))return false;
  returnFocus.current=document.activeElement instanceof HTMLElement?document.activeElement:null;
  returnScroll.current=window.scrollY;returnHref.current=window.location.pathname+window.location.search+window.location.hash;returnHistoryState.current=window.history.state;
  // Native history avoids asking the app router to replace the portfolio underneath.
  History.prototype.pushState.call(window.history,{...window.history.state,[marker]:true},"",`/portfolio/${nextSlug}`);
  isOpen.current=true;setSlug(nextSlug);return true;
 }
 function close(){isOpen.current=false;History.prototype.replaceState.call(window.history,returnHistoryState.current,"",returnHref.current);setSlug(null);}
 return <ViewerContext.Provider value={launch}>{children}<Dialog open={!!project} onOpenChange={next=>{if(!next)close();}}><DialogContent ref={viewer} fullScreen className="case-study-viewer portfolio-viewer" showCloseButton={false} onCloseAutoFocus={event=>{event.preventDefault();window.scrollTo({top:returnScroll.current,behavior:"instant"});returnFocus.current?.focus({preventScroll:true});}}>{project&&<><DialogTitle className="sr-only">{project.company}: {project.title}</DialogTitle><DialogDescription className="sr-only">Selected portfolio work by Terry Germany. Escape returns to the gallery.</DialogDescription><PortfolioProject key={project.id} piece={project} onClose={close}/></>}</DialogContent></Dialog></ViewerContext.Provider>;
}
export function PortfolioLink({onClick,href,...props}:ComponentProps<typeof Link>){
 const launch=useContext(ViewerContext);
 const {preview}=usePortfolioContent();
 const project=typeof href==="string"?portfolioPieces.find(p=>href===`/portfolio/${p.id}`):undefined;
 return <a {...props} href={preview&&project?`/edit/preview?portfolio=${project.id}`:typeof href==="string"?href:undefined} onClick={event=>{onClick?.(event);if(!preview&&!event.defaultPrevented&&project&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey&&event.button===0&&props.target!=="_blank"&&launch?.(project.id))event.preventDefault();}}/>;
}
