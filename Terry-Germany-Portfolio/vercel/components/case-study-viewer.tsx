"use client";

import { createContext, useContext, useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import ProjectStudy, { ProjectStudyToolbar } from "@/components/project-study";
import { usePortfolioContent } from "@/components/portfolio-content-provider";

const ViewerContext = createContext<((slug:string) => boolean) | null>(null);
const marker = "terryCaseStudyViewer";
export function CaseStudyProvider({children}: {children: ReactNode}) {
 const {projects}=usePortfolioContent();
 const [slug,setSlug]=useState<string|null>(null);
 const project=projects.find(p=>p.slug===slug);
 const isOpen=useRef(false),returnFocus=useRef<HTMLElement|null>(null),returnScroll=useRef(0),returnHref=useRef("/"),returnHistoryState=useRef<unknown>(null),viewer=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const history=(event:PopStateEvent)=>{if(isOpen.current){event.stopImmediatePropagation();isOpen.current=false;setSlug(null);}};
  window.addEventListener("popstate",history,true);return()=>window.removeEventListener("popstate",history,true);
 },[]);
 useEffect(()=>{if(slug)viewer.current?.scrollTo(0,0);},[slug]);
 function launch(nextSlug:string) {
  if(!projects.some(p=>p.slug===nextSlug))return false;
  if(isOpen.current){History.prototype.replaceState.call(window.history,{...window.history.state,[marker]:true},"",`/work/${nextSlug}`);setSlug(nextSlug);return true;}
  if(!["/", "/work", "/work/"].includes(window.location.pathname))return false;
  returnFocus.current=document.activeElement instanceof HTMLElement?document.activeElement:null;
  returnScroll.current=window.scrollY;returnHref.current=window.location.pathname+window.location.search+window.location.hash;returnHistoryState.current=window.history.state;
  // Native history avoids asking the app router to replace the portfolio underneath.
  History.prototype.pushState.call(window.history,{...window.history.state,[marker]:true},"",`/work/${nextSlug}`);
  isOpen.current=true;setSlug(nextSlug);return true;
 }
 function close(){isOpen.current=false;History.prototype.replaceState.call(window.history,returnHistoryState.current,"",returnHref.current);setSlug(null);}
 return <ViewerContext.Provider value={launch}>{children}<Dialog open={!!project} onOpenChange={next=>{if(!next)close();}}><DialogContent ref={viewer} fullScreen className="case-study-viewer" showCloseButton={false} onCloseAutoFocus={event=>{event.preventDefault();window.scrollTo({top:returnScroll.current,behavior:"instant"});returnFocus.current?.focus({preventScroll:true});}}>{project&&<><DialogTitle className="sr-only">{project.company}: {project.title}</DialogTitle><DialogDescription className="sr-only">Terry Germany’s Proof of Thinking case study. Escape returns to the portfolio.</DialogDescription><ProjectStudyToolbar project={project} onClose={close} closeHref={returnHref.current}/><ProjectStudy key={project.slug} project={project} onClose={close}/></>}</DialogContent></Dialog></ViewerContext.Provider>;
}
export function CaseStudyLink({onClick,href,...props}:ComponentProps<typeof Link>){
 const launch=useContext(ViewerContext);
 const {projects,preview}=usePortfolioContent();
 const project=typeof href==="string"?projects.find(p=>href===`/work/${p.slug}`):undefined;
 if(preview&&typeof href==="string"){const mapped=project?`/edit/preview?project=${project.slug}`:href==="/work"?"/edit/preview?view=work":href.startsWith("/")||href.startsWith("#")?`/edit/preview${href.includes("#")?href.slice(href.indexOf("#")):""}`:href;return <a {...props} href={mapped} onClick={onClick}>{props.children}</a>;}
 // Page and hash links use native navigation; only case-study links need the viewer/router.
 if(!project && typeof href === "string") return <a {...props} href={href} onClick={onClick}/>;
 return <Link {...props} href={href} onClick={event=>{onClick?.(event);if(!event.defaultPrevented&&project&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey&&event.button===0&&props.target!=="_blank"&&launch?.(project.slug))event.preventDefault();}}/>;
}
