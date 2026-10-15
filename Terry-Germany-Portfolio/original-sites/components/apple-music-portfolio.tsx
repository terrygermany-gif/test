"use client";
import {useId,useRef,useState} from 'react';
import Link from 'next/link';
import {ArrowDown,ArrowLeft,ArrowUpRight,Play,Square,X} from 'lucide-react';
import ThemeToggle from './theme-toggle';
import {usePortfolioContent} from './portfolio-content-provider';
import {ArtifactGallery} from './portfolio-artifact-gallery';
import {Dialog,DialogContent,DialogTitle,DialogDescription} from './ui/dialog';
import {defaultAppleMusic,type AppleMusic} from '@/lib/apple-music';
import {defaultPortfolioHeroes} from '@/lib/portfolio-heroes';

export default function AppleMusicPortfolio({onClose}:{onClose?:()=>void}){
 const {content,canEdit,preview}=usePortfolioContent();
 const project=content.appleMusic??defaultAppleMusic,hero=content.portfolioHeroes['apple-music']??defaultPortfolioHeroes['apple-music'];
 const id=useId(),backHref=preview?'/edit/preview?view=work':'/work?view=portfolio';
 const editHref=canEdit&&!preview?'/edit?portfolio=apple-music':undefined;
 const [selected,setSelected]=useState<AppleMusic['gallery'][number]|null>(null);
 const [playing,setPlaying]=useState(false);
 const returnFocus=useRef<HTMLElement|null>(null);
 function openArtifact(artifact:AppleMusic['gallery'][number]){returnFocus.current=document.activeElement instanceof HTMLElement?document.activeElement:null;setSelected(artifact);}
 return <article className="upgather-research availity-portfolio apple-music-portfolio" aria-labelledby={id+'-title'}>
  <header className="upgather-toolbar" aria-label="Portfolio viewer controls">
   {onClose?<button type="button" className="proof-back" onClick={onClose}><ArrowLeft size={17} aria-hidden="true"/>All portfolio</button>:<Link href={backHref} className="proof-back"><ArrowLeft size={17} aria-hidden="true"/>All portfolio</Link>}
   <div className="upgather-toolbar-actions"><ThemeToggle/>{onClose?<button type="button" className="study-close" onClick={onClose} aria-label="Close portfolio project"><X size={18} aria-hidden="true"/></button>:<Link href={backHref} className="study-close" aria-label="Back to portfolio"><X size={18} aria-hidden="true"/></Link>}</div>
  </header>
  <section className="apple-music-hero">
   <div className="apple-music-hero-heading"><p className="availity-eyebrow">{hero.badge}</p>{editHref&&<Link className="apple-music-edit-link" href={editHref}>Edit portfolio<ArrowUpRight size={14} aria-hidden="true"/></Link>}</div>
   <div className="apple-music-hero-copy"><h1 id={id+'-title'}>{hero.title}</h1><p>{hero.description}</p><ul className="availity-tags" aria-label="Project focus">{hero.tags.map(tag=><li key={tag}>{tag}</li>)}</ul><a className="apple-music-primary-link" href={'#'+id+'-contribution'}>Explore my contribution<ArrowDown size={17} aria-hidden="true"/></a></div>
   <figure className="apple-music-hero-art"><img className={hero.lightImage?'apple-image-dark':undefined} src={hero.image} alt={hero.imageAlt} loading="eager" fetchPriority="high"/>{hero.lightImage&&<img className="apple-image-light" src={hero.lightImage} alt={hero.imageAlt} loading="eager"/>}</figure>
  </section>
  <section className="availity-section apple-music-overview" aria-label="Project overview"><dl className="availity-facts">{[['Client',project.client],['My role',project.role],['Timeline',project.timeline],['Tools',project.tools]].map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p className="availity-overview">{project.overview}</p></section>
  <section className="availity-section apple-music-contribution" id={id+'-contribution'}><p className="availity-eyebrow">01 / WHAT I LED</p><h2>{project.contributionTitle}</h2><div className="apple-music-contribution-grid">{project.contributions.map((item,i)=><div key={i}><span>{String(i+1).padStart(2,'0')}</span><h3>{item.title}</h3><p>{item.description}</p></div>)}</div></section>
  <section className="availity-section"><p className="availity-eyebrow">02 / SELECTED DESIGN WORK</p><div className="availity-heading-row"><h2>{project.galleryTitle}</h2><p>{project.galleryIntro}</p></div><ArtifactGallery items={project.gallery} label="Apple Music" itemLabel="artifacts" onViewArtifact={openArtifact}/></section>
  <section className="availity-section apple-music-workflow"><p className="availity-eyebrow">03 / DESIGN SYSTEM & MCP WORKFLOW</p><div className="availity-heading-row"><h2>{project.workflowTitle}</h2><p>{project.workflowIntro}</p></div><ol className="apple-music-workflow-steps" aria-label="Design-to-code workflow summary">{project.workflow.map((stage,i)=><li key={i}><details><summary><span className="apple-music-step-number">{String(i+1).padStart(2,'0')}</span><span>{stage.title}</span><ArrowDown size={15} aria-hidden="true"/></summary><p>{stage.description}</p></details></li>)}</ol></section>
  <section className="availity-section apple-music-motion"><div className="apple-music-motion-copy"><p className="availity-eyebrow">INTERACTION PREVIEW</p><h2>{project.motionTitle}</h2><p>{project.motionNote}</p>{project.motion.kind==='image'&&<button type="button" className="apple-music-primary-link" aria-pressed={playing} aria-controls={id+'-motion'} onClick={()=>setPlaying(value=>!value)}>{playing?<Square size={16} aria-hidden="true"/>:<Play size={16} aria-hidden="true"/>}{playing?'Stop preview':'Play interaction'}</button>}{project.prototypeUrl&&<a className="apple-music-prototype-link" href={project.prototypeUrl} target="_blank" rel="noopener noreferrer">Open Figma prototype<ArrowUpRight size={16} aria-hidden="true"/><span className="sr-only"> in a new tab</span></a>}</div><div className="apple-music-motion-preview" id={id+'-motion'}>{project.motion.kind==='video'?<video controls playsInline preload="none" src={project.motion.src} poster={project.motion.poster} aria-label={project.motion.alt}/>:<img src={playing?project.motion.src:project.motion.poster} alt={playing?project.motion.alt:'Static preview of the Apple Music interface'} loading="lazy"/>}</div></section>
  <section className="availity-section apple-music-research"><details><summary><span>{project.researchTitle}</span><ArrowDown size={16} aria-hidden="true"/></summary><p>{project.researchIntro}</p><div className="apple-music-research-grid">{project.research.map((artifact,i)=><figure key={i}><button type="button" onClick={()=>openArtifact(artifact)} aria-label={'View '+artifact.title}><img src={artifact.image} alt={artifact.alt} loading="lazy"/></button><figcaption><h3>{artifact.title}</h3><p>{artifact.description}</p></figcaption></figure>)}</div></details></section>
  <footer className="availity-section availity-ending"><p>{project.closing}</p>{editHref&&<Link className="portfolio-edit-hero" href={editHref}>Edit this portfolio page</Link>}</footer>
  <Dialog open={!!selected} onOpenChange={open=>{if(!open)setSelected(null);}}><DialogContent className="availity-image-dialog apple-music-image-dialog" onCloseAutoFocus={event=>{event.preventDefault();returnFocus.current?.focus({preventScroll:true});}}><DialogTitle>{selected?.title}</DialogTitle><DialogDescription>{selected?.description}</DialogDescription>{selected&&<img src={selected.image} alt={selected.alt}/>}</DialogContent></Dialog>
 </article>;
}
