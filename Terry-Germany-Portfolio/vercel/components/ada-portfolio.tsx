"use client";

import {useId,useRef,useState} from 'react';
import Link from 'next/link';
import {ArrowDown,ArrowLeft,ArrowUpRight,X} from 'lucide-react';
import ThemeToggle from './theme-toggle';
import AvailityMobileGallery from './availity-mobile-gallery';
import {usePortfolioContent} from './portfolio-content-provider';
import {Dialog,DialogContent,DialogDescription,DialogTitle} from './ui/dialog';
import {defaultAdaHealthcare,type AdaHealthcare} from '@/lib/ada-healthcare';
import {defaultFintechIrmp} from '@/lib/fintech-irmp';
import {defaultPortfolioHeroes} from '@/lib/portfolio-heroes';

// Shared mobile portfolio presentation; each variant retains its own content and theme.
export default function AdaPortfolio({onClose,variant="ada"}:{onClose?:()=>void;variant?:"ada"|"irmp"}){
 const {content,canEdit,preview}=usePortfolioContent();
 const irmp=variant==='irmp'?(content.fintechIrmp??defaultFintechIrmp):null;
 const portfolioId=irmp?'fintech-irmp':'ada-healthcare-wellness';
 const project=irmp??content.adaHealthcare??defaultAdaHealthcare,hero=content.portfolioHeroes[portfolioId]??defaultPortfolioHeroes[portfolioId];
 const id=useId();
 const [selected,setSelected]=useState<AdaHealthcare['visuals'][number]|null>(null);
 const returnFocus=useRef<HTMLElement|null>(null);
 const backHref=preview?'/edit/preview?view=work':'/work?view=portfolio';
 const editHref=canEdit&&!preview?'/edit?portfolio='+portfolioId:undefined;
 const journeys=[{key:'onboarding',eyebrow:irmp?'01 / PRE-QUALIFICATION':'01 / GETTING STARTED',title:project.onboardingTitle,intro:project.onboardingIntro,items:project.onboarding},{key:'assessment',eyebrow:irmp?'02 / PAYROLL DOCUMENTS':'02 / HEALTH ASSESSMENT',title:project.assessmentTitle,intro:project.assessmentIntro,items:project.assessment},{key:'wellness',eyebrow:irmp?'03 / INTERFACE PATTERNS':'03 / EVERYDAY WELLNESS',title:project.wellnessTitle,intro:project.wellnessIntro,items:project.wellness}];
 function openArtifact(artifact:AdaHealthcare['visuals'][number]){returnFocus.current=document.activeElement instanceof HTMLElement?document.activeElement:null;setSelected(artifact.lightImage&&document.documentElement.classList.contains('light')?{...artifact,image:artifact.lightImage}:artifact);}
 return <article className={"upgather-research availity-portfolio ada-portfolio"+(irmp?" irmp-portfolio":"")} aria-labelledby={id+'-title'}>
  <header className="upgather-toolbar" aria-label="Portfolio viewer controls">
   {onClose?<button type="button" className="proof-back" onClick={onClose}><ArrowLeft size={17} aria-hidden="true"/>All portfolio</button>:<Link href={backHref} className="proof-back"><ArrowLeft size={17} aria-hidden="true"/>All portfolio</Link>}
   <div className="upgather-toolbar-actions"><ThemeToggle/>{onClose?<button type="button" className="study-close" onClick={onClose} aria-label="Close portfolio project"><X size={18} aria-hidden="true"/></button>:<Link href={backHref} className="study-close" aria-label="Back to portfolio"><X size={18} aria-hidden="true"/></Link>}</div>
  </header>
  <section className="ada-hero">
   <div className="ada-hero-heading"><p className="availity-eyebrow">{hero.badge}</p>{editHref&&<Link href={editHref} className="ada-edit-link">Edit portfolio<ArrowUpRight size={14} aria-hidden="true"/></Link>}</div>
   <div className="ada-hero-copy"><h1 id={id+'-title'}>{hero.title}</h1><p>{hero.description}</p><ul className="availity-tags" aria-label="Project focus">{hero.tags.map(tag=><li key={tag}>{tag}</li>)}</ul><a href={'#'+id+'-onboarding'} className="ada-primary-link">Explore the experience<ArrowDown size={17} aria-hidden="true"/></a></div>
   <figure className="ada-hero-art"><img className={hero.lightImage?'ada-image-dark':undefined} src={hero.image} alt={hero.imageAlt} loading="eager" fetchPriority="high"/>{hero.lightImage&&<img className="ada-image-light" src={hero.lightImage} alt={hero.imageAlt} loading="eager"/>}</figure>
  </section>
  <section className="availity-section ada-overview" aria-label="Project overview"><dl className="availity-facts">{[['Client',project.client],['My role',project.role],['Timeline',project.timeline],['Tools',project.tools]].map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p className="availity-overview">{project.overview}</p><nav className="ada-chapters" aria-label={"Explore "+project.cardCompany}>{journeys.map(journey=><a key={journey.key} href={'#'+id+'-'+journey.key}>{journey.eyebrow}</a>)}</nav></section>
  {journeys.map(journey=><div key={journey.key} id={id+'-'+journey.key} className="ada-journey"><AvailityMobileGallery eyebrow={journey.eyebrow} title={journey.title} intro={journey.intro} items={journey.items}/></div>)}
  <section className="availity-section ada-prototype-section"><p className="availity-eyebrow">INTERACTIVE PROTOTYPE</p><div className="availity-heading-row"><h2>{project.prototypeTitle}</h2><p>{project.prototypeIntro}</p></div><div className="availity-prototype"><img src={project.prototypeImage} alt={project.prototypeAlt} loading="lazy"/><div><h3>{project.cardCompany}</h3><p>{project.prototypeNote}</p><a className="portfolio-prototype-link" href={project.prototypeUrl} target="_blank" rel="noopener noreferrer">Open Figma prototype<ArrowUpRight size={17} aria-hidden="true"/><span className="sr-only"> in a new tab</span></a>{irmp&&<a className="portfolio-prototype-link irmp-design-system-link" href={irmp.designSystemUrl} target="_blank" rel="noopener noreferrer">Open design system<ArrowUpRight size={17} aria-hidden="true"/><span className="sr-only"> in a new tab</span></a>}</div></div></section>
  {irmp&&<section className="availity-section irmp-walkthroughs"><p className="availity-eyebrow">INTERACTION WALKTHROUGHS</p><div className="availity-heading-row"><h2>{irmp.walkthroughTitle}</h2><p>{irmp.walkthroughIntro}</p></div><div className="irmp-video-grid">{irmp.walkthroughs.map((video,i)=><figure key={i}><video controls playsInline preload="none" src={video.src} poster={video.poster} aria-label={video.title}/><figcaption><h3>{video.title}</h3><p>{video.description}</p></figcaption></figure>)}</div></section>}
  <section className="availity-section ada-process"><p className="availity-eyebrow">04 / RESEARCH & DESIGN</p><div className="availity-heading-row"><h2>{project.researchTitle}</h2><p>{project.researchIntro}</p></div><div className="availity-note-grid">{project.methods.map((note,i)=><div className="availity-note" key={i}><span className="availity-index">{String(i+1).padStart(2,'0')}</span><h3>{note.title}</h3><p>{note.description}</p></div>)}</div><details className="ada-visuals"><summary><span>{project.visualTitle}</span><ArrowDown size={16} aria-hidden="true"/></summary><p>{project.visualIntro}</p><div className="ada-visual-grid">{project.visuals.map((artifact,i)=><figure key={i}><button type="button" onClick={()=>openArtifact(artifact)} aria-label={'View '+artifact.title}><img className={artifact.lightImage?"mobile-image-dark":undefined} src={artifact.image} alt={artifact.alt} loading="lazy"/>{artifact.lightImage&&<img className="mobile-image-light" src={artifact.lightImage} alt={artifact.alt} loading="lazy"/>}</button><figcaption><h3>{artifact.title}</h3><p>{artifact.description}</p></figcaption></figure>)}</div></details></section>
  <footer className="availity-section availity-ending"><p>{project.closing}</p>{editHref&&<Link className="portfolio-edit-hero" href={editHref}>Edit this portfolio page</Link>}</footer>
  <Dialog open={!!selected} onOpenChange={open=>{if(!open)setSelected(null);}}><DialogContent className="availity-image-dialog ada-image-dialog" onCloseAutoFocus={event=>{event.preventDefault();returnFocus.current?.focus({preventScroll:true});}}><DialogTitle>{selected?.title}</DialogTitle><DialogDescription>{selected?.description}</DialogDescription>{selected&&<img src={selected.image} alt={selected.alt}/>}</DialogContent></Dialog>
 </article>;
}
