"use client";

import {useState} from "react";
import Link from "next/link";
import {ArrowLeft,ArrowUpRight,X} from "lucide-react";
import AvailityMobileGallery from "./availity-mobile-gallery";
import ThemeToggle from "./theme-toggle";
import {usePortfolioContent} from "./portfolio-content-provider";
import {Dialog,DialogContent,DialogTitle,DialogDescription} from "./ui/dialog";

export default function AvailityPortfolio({onClose}:{onClose?:()=>void}){
 const {content,canEdit,preview}=usePortfolioContent();
 const hero=content.portfolioHeroes['availity-essentials'];
 const project=content.availityEssentials;
 const [selected,setSelected]=useState<{title:string;image:string;alt:string}|null>(null);
 const backHref=preview?"/edit/preview?view=work":"/work?view=portfolio";
 const editable=canEdit&&!preview;
 const galleries=[{label:"WORKFLOW EXPLORATIONS",title:project.workflowTitle,intro:project.workflowIntro,items:project.workflows,kind:"workflow"},{label:"DESKTOP VISUALS",title:project.desktopTitle,intro:project.desktopIntro,items:project.desktop,kind:"desktop"},{label:"MOBILE VISUALS",title:project.mobileTitle,intro:project.mobileIntro,items:project.mobile,kind:"mobile"}];
 return <article className="upgather-research availity-portfolio" aria-labelledby="availity-title">
  <header className="upgather-toolbar" aria-label="Portfolio viewer controls">
   {onClose?<button type="button" className="proof-back" onClick={onClose}><ArrowLeft size={17} aria-hidden="true"/>All portfolio</button>:<Link className="proof-back" href={backHref}><ArrowLeft size={17} aria-hidden="true"/>All portfolio</Link>}
   <div className="upgather-toolbar-actions"><ThemeToggle/>{onClose?<button className="study-close" type="button" onClick={onClose} aria-label="Close portfolio project"><X size={18}/></button>:<Link className="study-close" href={backHref} aria-label="Back to portfolio"><X size={18}/></Link>}</div>
  </header>
  <section className="availity-section availity-introduction">
   <p className="availity-eyebrow">{hero.badge}</p>
   <div className="availity-heading-row"><h1 id="availity-title">{hero.title}</h1><p>{hero.description}</p></div>
   <figure className="availity-cover"><img className={hero.lightImage?"availity-cover-image-dark":undefined} src={hero.image} alt={hero.imageAlt} loading="eager"/>{hero.lightImage&&<img className="availity-cover-image-light" src={hero.lightImage} alt={hero.imageAlt} loading="eager"/>}{editable&&<Link className="upgather-edit-cover" href="/edit?portfolio=availity-essentials">Edit portfolio</Link>}</figure>
   <dl className="availity-facts">{[["Client",project.client],["My role",project.role],["Timeline",project.timeline],["Tools",project.tools]].map(([term,value])=><div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>
   <p className="availity-overview">{project.overview}</p>
   <ul className="availity-tags" aria-label="Project focus">{hero.tags.map(tag=><li key={tag}>{tag}</li>)}</ul>
  </section>
  {[{label:"RESEARCH & DISCOVERY",title:project.researchTitle,intro:project.researchIntro,items:project.methods},{label:"PRODUCT AUDIT",title:project.auditTitle,intro:project.auditIntro,items:project.audit}].map(section=><section className="availity-section" key={section.label}><p className="availity-eyebrow">{section.label}</p><div className="availity-heading-row"><h2>{section.title}</h2><p>{section.intro}</p></div><div className="availity-note-grid">{section.items.map((item,i)=><div className="availity-note" key={i}><span className="availity-index">{String(i+1).padStart(2,"0")}</span><h3>{item.title}</h3><p>{item.description}</p></div>)}</div></section>)}
  <section className="availity-section"><p className="availity-eyebrow">PRODUCT DIRECTION</p><div className="availity-heading-row"><h2>{project.directionTitle}</h2><p>{project.directionIntro}</p></div><div className="availity-prototype">
   <img src={project.prototypeImage} alt={project.prototypeAlt} loading="lazy"/>
   <div><span className="availity-eyebrow">INTERACTIVE PROTOTYPE</span><h3>Explore Availity — Essentials</h3><p>{project.prototypeNote}</p><a className="portfolio-prototype-link" href={project.prototypeUrl} target="_blank" rel="noopener noreferrer">Open Figma prototype<ArrowUpRight size={17} aria-hidden="true"/><span className="sr-only"> in a new tab</span></a></div>
  </div></section>
  {galleries.map(gallery=>gallery.kind==="mobile"?<AvailityMobileGallery key={gallery.kind} title={gallery.title} intro={gallery.intro} items={gallery.items}/>:<section className="availity-section" key={gallery.kind}><p className="availity-eyebrow">{gallery.label}</p><div className="availity-heading-row"><h2>{gallery.title}</h2><p>{gallery.intro}</p></div><div className={"availity-gallery availity-gallery-"+gallery.kind}>{gallery.items.map((item,i)=><figure className="availity-artifact" key={i}><button type="button" className="availity-image-button" onClick={()=>setSelected(item)} aria-label={"View "+item.title+" full size"}><img src={item.image} alt={item.alt} loading="lazy"/></button><figcaption><h3>{item.title}</h3><p>{item.description}</p><button type="button" className="availity-artifact-link" onClick={()=>setSelected(item)}>View full size<ArrowUpRight size={15} aria-hidden="true"/></button></figcaption></figure>)}</div></section>)}
  <footer className="availity-section availity-ending"><p>{project.closing}</p>{editable&&<Link className="portfolio-edit-hero" href="/edit?portfolio=availity-essentials">Edit this portfolio page</Link>}</footer>
  <Dialog open={!!selected} onOpenChange={open=>{if(!open)setSelected(null);}}><DialogContent className="availity-image-dialog"><DialogTitle>{selected?.title}</DialogTitle><DialogDescription>Original Availity Essentials design artifact.</DialogDescription>{selected&&<img src={selected.image} alt={selected.alt}/>}</DialogContent></Dialog>
 </article>;
}
