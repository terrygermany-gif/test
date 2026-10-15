"use client";
import {useId,useRef,useState} from 'react';
import Link from 'next/link';
import {ArrowDown,ArrowLeft,ArrowUpRight,X} from 'lucide-react';
import ThemeToggle from './theme-toggle';
import AppleMusicSectionNav from './apple-music-section-nav';
import AppleMusicMcpFlow from './apple-music-mcp-flow';
import {usePortfolioContent} from './portfolio-content-provider';
import {Dialog,DialogContent,DialogTitle,DialogDescription} from './ui/dialog';
import {defaultAppleDecisionStory,defaultAppleMcpFlow,defaultAppleMusic,type AppleMusic} from '@/lib/apple-music';
import {defaultPortfolioHeroes} from '@/lib/portfolio-heroes';

export default function AppleMusicPortfolio({onClose}:{onClose?:()=>void}){
 const {content,canEdit,preview}=usePortfolioContent();
 const project=content.appleMusic??defaultAppleMusic,hero=content.portfolioHeroes['apple-music']??defaultPortfolioHeroes['apple-music'];
 const simulatorUrl=project.heroSimulatorUrl??defaultAppleMusic.heroSimulatorUrl;
 const decisionStory=project.decisionStory??defaultAppleDecisionStory;
 const tools=project.tools.split(/[,;\n]+/).map(tool=>tool.trim()).filter(Boolean);
 const id=useId(),backHref=preview?'/edit/preview?view=work':'/work?view=portfolio';
 const editHref=canEdit&&!preview?'/edit?portfolio=apple-music':undefined;
 const [selected,setSelected]=useState<AppleMusic['gallery'][number]|null>(null);
 const returnFocus=useRef<HTMLElement|null>(null);
 function openArtifact(artifact:AppleMusic['gallery'][number]){returnFocus.current=document.activeElement instanceof HTMLElement?document.activeElement:null;setSelected(artifact);}
 return <article className="upgather-research availity-portfolio apple-music-portfolio" aria-labelledby={id+'-title'}>
  <header className="upgather-toolbar" aria-label="Portfolio viewer controls">
   {onClose?<button type="button" className="proof-back" onClick={onClose}><ArrowLeft size={17} aria-hidden="true"/>All portfolio</button>:<Link href={backHref} className="proof-back"><ArrowLeft size={17} aria-hidden="true"/>All portfolio</Link>}
   <div className="upgather-toolbar-actions"><ThemeToggle/>{onClose?<button type="button" className="study-close" onClick={onClose} aria-label="Close portfolio project"><X size={18} aria-hidden="true"/></button>:<Link href={backHref} className="study-close" aria-label="Back to portfolio"><X size={18} aria-hidden="true"/></Link>}</div>
  </header>
  <section className={"apple-music-hero"+(simulatorUrl?" apple-music-hero-with-simulator":"")}>
   <div className="apple-music-hero-heading"><p className="availity-eyebrow">{hero.badge}</p>{editHref&&<Link className="apple-music-edit-link" href={editHref}>Edit portfolio<ArrowUpRight size={14} aria-hidden="true"/></Link>}</div>
   <div className="apple-music-hero-copy"><h1 id={id+'-title'}>{hero.title.split(/(\bApple\s+Music\b)/gi).map((part,i)=>/^Apple\s+Music$/i.test(part)?<span className="apple-music-title-accent" key={i}>{part}</span>:part)}</h1><p>{hero.description}</p><ul className="availity-tags" aria-label="Project focus">{hero.tags.map(tag=><li key={tag}>{tag}</li>)}</ul><a className="apple-music-primary-link" href="#apple-music-decisions">See my design decisions<ArrowDown size={17} aria-hidden="true"/></a></div>
   {simulatorUrl?<figure className="apple-music-hero-simulator"><iframe key={simulatorUrl} src={simulatorUrl} title="Apple Music interactive simulator" loading="eager" allow="autoplay; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/><figcaption><a className="apple-music-simulator-open" href={simulatorUrl} target="_blank" rel="noopener noreferrer">Open simulator<ArrowUpRight size={15} aria-hidden="true"/><span className="sr-only"> in a new tab</span></a></figcaption></figure>:<figure className="apple-music-hero-art"><img className={hero.lightImage?'apple-image-dark':undefined} src={hero.image} alt={hero.imageAlt} loading="eager" fetchPriority="high"/>{hero.lightImage&&<img className="apple-image-light" src={hero.lightImage} alt={hero.imageAlt} loading="eager"/>}</figure>}
  </section>
  <section className="availity-section apple-music-overview" aria-label="Project overview"><div className="apple-music-summary-layout"><div className="apple-music-summary-lead"><dl className="apple-music-summary-role"><div><dt>My role</dt><dd>{project.role}</dd></div></dl><p className="availity-overview">{project.overview}</p></div><dl className="apple-music-summary-details"><div><dt>Client</dt><dd>{project.client}</dd></div><div><dt>Timeline</dt><dd>{project.timeline}</dd></div><div className="apple-music-summary-tools"><dt>Tools</dt><dd><ul aria-label="Project tools">{tools.map((tool,i)=><li key={tool+'-'+i}>{tool}</li>)}</ul></dd></div></dl></div></section>
  <AppleMusicSectionNav/>
  <section className="availity-section apple-music-decisions" id="apple-music-decisions" tabIndex={-1} aria-labelledby={id+'-decisions-title'}>
   <p className="availity-eyebrow">01 / DESIGN DECISIONS</p><h2 id={id+'-decisions-title'}>{decisionStory.title}</h2>
   <dl className="apple-music-decision-grid">
    <div><dt>Problem</dt><dd>{decisionStory.problem}</dd></div>
    <div><dt>My decision</dt><dd>{decisionStory.decision}</dd></div>
    <div><dt>Result <span>What I delivered</span></dt><dd>{decisionStory.result}</dd></div>
   </dl>
   <details className="apple-music-decision-evidence" open><summary><span>{decisionStory.evidenceTitle}</span><ArrowDown size={16} aria-hidden="true"/></summary>
    <div className="apple-music-research-grid apple-music-evidence-grid">{decisionStory.evidence.map((artifact,i)=><figure className="apple-music-evidence-card" key={i}><button type="button" className="apple-music-evidence-preview" onClick={()=>openArtifact(artifact)} aria-label={'View '+artifact.title+' in full size'}><img src={artifact.image} alt={artifact.alt} loading="lazy"/><span className="apple-music-evidence-open">View full design<ArrowUpRight size={14} aria-hidden="true"/></span></button><figcaption><span className="apple-music-evidence-label">Design artifact {String(i+1).padStart(2,'0')}</span><h3>{artifact.title}</h3><p>{artifact.description}</p></figcaption></figure>)}</div>
   </details>
  </section>
  <section className="availity-section apple-music-contribution" id="apple-music-role" tabIndex={-1}><p className="availity-eyebrow">02 / MY ROLE & SCOPE</p><h2>{project.contributionTitle}</h2><div className="apple-music-contribution-grid">{project.contributions.map((item,i)=><div key={i}><span>{String(i+1).padStart(2,'0')}</span><h3>{item.title}</h3><p>{item.description}</p></div>)}</div></section>
  <section className="availity-section apple-music-workflow" id="apple-music-workflow" tabIndex={-1}><p className="availity-eyebrow">03 / DESIGN SYSTEM & WORKFLOW</p><div className="availity-heading-row"><h2>{project.workflowTitle}</h2><p>{project.workflowIntro}</p></div><ol className="apple-music-workflow-steps" aria-label="Design-to-code workflow summary">{project.workflow.map((stage,i)=><li key={i}><details><summary><span className="apple-music-step-number">{String(i+1).padStart(2,'0')}</span><span>{stage.title}</span><ArrowDown size={15} aria-hidden="true"/></summary><p>{stage.description}</p></details></li>)}</ol><AppleMusicMcpFlow content={project.mcpFlow??defaultAppleMcpFlow}/></section>
  <section className="availity-section apple-music-research" id="apple-music-research" tabIndex={-1}><p className="availity-eyebrow">04 / RESEARCH & FLOWS</p><details open><summary><span>{project.researchTitle}</span><ArrowDown size={16} aria-hidden="true"/></summary><p>{project.researchIntro}</p><div className="apple-music-research-grid">{project.research.map((artifact,i)=><figure key={i}><button type="button" onClick={()=>openArtifact(artifact)} aria-label={'View '+artifact.title}><img src={artifact.image} alt={artifact.alt} loading="lazy"/></button><figcaption><h3>{artifact.title}</h3><p>{artifact.description}</p></figcaption></figure>)}</div></details></section>
  <footer className="availity-section availity-ending"><p>{project.closing}</p>{editHref&&<Link className="portfolio-edit-hero" href={editHref}>Edit this portfolio page</Link>}</footer>
  <Dialog open={!!selected} onOpenChange={open=>{if(!open)setSelected(null);}}><DialogContent className="availity-image-dialog apple-music-image-dialog" onCloseAutoFocus={event=>{event.preventDefault();returnFocus.current?.focus({preventScroll:true});}}><DialogTitle>{selected?.title}</DialogTitle><DialogDescription>{selected?.description}</DialogDescription>{selected&&<img src={selected.image} alt={selected.alt}/>}</DialogContent></Dialog>
 </article>;
}
