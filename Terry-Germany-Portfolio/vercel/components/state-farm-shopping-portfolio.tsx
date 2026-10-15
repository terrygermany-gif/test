"use client";
import {useId,useRef,useState} from 'react';
import Link from 'next/link';
import {ArrowDown,ArrowLeft,ArrowUpRight,X} from 'lucide-react';
import StateFarmResearchStrategy from './state-farm-research-strategy';
import StateFarmContinuation from './state-farm-continuation';
import StateFarmDecisionContent from './state-farm-decision-content';
import StateFarmDesktopDisplay from './state-farm-desktop-display';
import ThemeToggle from './theme-toggle';
import AppleMusicSectionNav from './apple-music-section-nav';
import {usePortfolioContent} from './portfolio-content-provider';
import {Dialog,DialogContent,DialogTitle,DialogDescription} from './ui/dialog';
import {defaultStateFarmShopping,type StateFarmShopping} from '@/lib/state-farm-shopping';
import {defaultStateFarmReturning} from '@/lib/state-farm-returning';
import {defaultPortfolioHeroes} from '@/lib/portfolio-heroes';

const shoppingSections=[{id:"sf-shopping-decisions",label:"Design decisions"},{id:"sf-shopping-role",label:"My role & scope"},{id:"sf-shopping-workflow",label:"Shopping journey"},{id:"sf-shopping-research",label:"Research & principles"}];

const returningSections=[{id:"sf-returning-role",label:"Leadership & impact"},{id:"sf-returning-decisions",label:"Design decisions"},{id:"sf-returning-workflow",label:"Quote continuation"},{id:"sf-returning-research",label:"Research & principles"}];

export default function StateFarmShoppingPortfolio({onClose,variant="shopping"}:{onClose?:()=>void;variant?:"shopping"|"returning"}){
 const {content,canEdit,preview}=usePortfolioContent();
 const returning=variant==='returning',sections=returning?returningSections:shoppingSections,prefix=returning?'sf-returning':'sf-shopping';
 const project=returning?(content.stateFarmReturning??defaultStateFarmReturning):(content.stateFarmShopping??defaultStateFarmShopping),hero=content.portfolioHeroes[variant]??defaultPortfolioHeroes[variant];
 const leadership=returning?(content.stateFarmReturning??defaultStateFarmReturning).leadership:undefined;
 const returningDecisions=returning?(content.stateFarmReturning??defaultStateFarmReturning).designDecisions:undefined;
 const continuation=returning?(content.stateFarmReturning??defaultStateFarmReturning).continuation:undefined;
 const researchStrategy=returning?(content.stateFarmReturning??defaultStateFarmReturning).researchStrategy:undefined;
 const simulatorUrl=project.simulatorUrl;
 const decisionStory=project.decisionStory;
 const id=useId(),backHref=preview?'/edit/preview?view=work':'/work?view=portfolio';
 const editHref=canEdit&&!preview?'/edit?portfolio='+variant:undefined;
 const [selected,setSelected]=useState<StateFarmShopping['decisionStory']['evidence'][number]|null>(null);
 const returnFocus=useRef<HTMLElement|null>(null);
 function openArtifact(artifact:StateFarmShopping['decisionStory']['evidence'][number]){returnFocus.current=document.activeElement instanceof HTMLElement?document.activeElement:null;setSelected(artifact);}
 return <article className={"upgather-research availity-portfolio apple-music-portfolio state-farm-shopping-portfolio"+(returning?" state-farm-returning-portfolio":"")} aria-labelledby={id+'-title'}>
  <header className="upgather-toolbar" aria-label="Portfolio viewer controls">
   {onClose?<button type="button" className="proof-back" onClick={onClose}><ArrowLeft size={17} aria-hidden="true"/>All portfolio</button>:<Link href={backHref} className="proof-back"><ArrowLeft size={17} aria-hidden="true"/>All portfolio</Link>}
   <div className="upgather-toolbar-actions"><ThemeToggle/>{onClose?<button type="button" className="study-close" onClick={onClose} aria-label="Close portfolio project"><X size={18} aria-hidden="true"/></button>:<Link href={backHref} className="study-close" aria-label="Back to portfolio"><X size={18} aria-hidden="true"/></Link>}</div>
  </header>
  <section className={"apple-music-hero"+(simulatorUrl?" apple-music-hero-with-simulator":"")}>
   <div className="apple-music-hero-heading"><p className="availity-eyebrow">{hero.badge}</p>{editHref&&<Link className="apple-music-edit-link" href={editHref}>Edit portfolio<ArrowUpRight size={14} aria-hidden="true"/></Link>}</div>
   <div className="apple-music-hero-copy"><h1 id={id+'-title'}>{hero.title}</h1><p>{hero.description}</p><ul className="availity-tags" aria-label="Project focus">{hero.tags.map(tag=><li key={tag}>{tag}</li>)}</ul><a className="apple-music-primary-link" href={'#'+prefix+'-decisions'}>See my design decisions<ArrowDown size={17} aria-hidden="true"/></a></div>
   {simulatorUrl?<figure className="apple-music-hero-simulator">{returning?<StateFarmDesktopDisplay src={simulatorUrl}/>:<iframe key={simulatorUrl} src={simulatorUrl} title="State Farm Digital Assistant shopping simulator" loading="eager" allow="fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/>}<figcaption><a className="apple-music-simulator-open" href={simulatorUrl} target="_blank" rel="noopener noreferrer">Open simulator<ArrowUpRight size={15} aria-hidden="true"/><span className="sr-only"> in a new tab</span></a><p className="sf-shopping-simulator-note">{project.simulatorNote}</p></figcaption></figure>:<figure className="apple-music-hero-art"><img className={hero.lightImage?'apple-image-dark':undefined} src={hero.image} alt={hero.imageAlt} loading="eager" fetchPriority="high"/>{hero.lightImage&&<img className="apple-image-light" src={hero.lightImage} alt={hero.imageAlt} loading="eager"/>}</figure>}
  </section>
  <section className="availity-section apple-music-overview" aria-label="Project overview"><div className="apple-music-summary-layout"><div className="apple-music-summary-lead">{!returning&&<dl className="apple-music-summary-role"><div><dt>My role</dt><dd>{project.role}</dd></div></dl>}<p className="availity-overview">{project.overview}</p></div><dl className="apple-music-summary-details"><div><dt>Client</dt><dd>{project.client}</dd></div><div><dt>Format</dt><dd>{project.format}</dd></div><div className="apple-music-summary-tools"><dt>Focus</dt><dd>{project.scope}</dd></div></dl></div></section>
  <AppleMusicSectionNav sections={sections} projectName="State Farm"/>
  {leadership&&<section className="availity-section apple-music-contribution sf-returning-leadership" id="sf-returning-role" tabIndex={-1} aria-labelledby={id+'-leadership-title'}><p className="availity-eyebrow">01 / LEADERSHIP & IMPACT</p><h2 id={id+'-leadership-title'}>{leadership.title}</h2><p className="sf-leadership-intro">{leadership.intro}</p><ul className="sf-leadership-responsibilities" role="list" aria-label="Leadership responsibilities">{leadership.responsibilities.map((item,i)=><li key={i}><h3>{item.title}</h3><p>{item.description}</p></li>)}</ul><p className="sf-leadership-impact"><strong>Impact:</strong> {leadership.impact}</p></section>}

  <section className="availity-section apple-music-decisions" id={prefix+'-decisions'} tabIndex={-1} aria-labelledby={id+'-decisions-title'}>
   <p className="availity-eyebrow">{returning?"02 / DESIGN DECISIONS":"01 / DESIGN DECISIONS"}</p><h2 id={id+'-decisions-title'}>{returningDecisions?.title??decisionStory.title}</h2>
   {returningDecisions?<StateFarmDecisionContent value={returningDecisions}/>:<>
   <dl className="apple-music-decision-grid">
    <div><dt>Problem</dt><dd>{decisionStory.problem}</dd></div>
    <div><dt>My decision</dt><dd>{decisionStory.decision}</dd></div>
    <div><dt>Result <span>What I delivered</span></dt><dd>{decisionStory.result}</dd></div>
   </dl>
   <p className="sf-shopping-context-note">{decisionStory.note}</p></>}
   <details className="apple-music-decision-evidence" open><summary><span>{decisionStory.evidenceTitle}</span><ArrowDown size={16} aria-hidden="true"/></summary>
    <div className="apple-music-research-grid apple-music-evidence-grid">{decisionStory.evidence.map((artifact,i)=><figure className="apple-music-evidence-card" key={i}><button type="button" className="apple-music-evidence-preview" onClick={()=>openArtifact(artifact)} aria-label={'View '+artifact.title+' in full size'}><img src={artifact.image} alt={artifact.alt} loading="lazy"/><span className="apple-music-evidence-open">View full design<ArrowUpRight size={14} aria-hidden="true"/></span></button><figcaption><span className="apple-music-evidence-label">Design artifact {String(i+1).padStart(2,'0')}</span><h3>{artifact.title}</h3><p>{artifact.description}</p></figcaption></figure>)}</div>
   </details>
  </section>
  {!returning&&<section className="availity-section apple-music-contribution" id={prefix+'-role'} tabIndex={-1}><p className="availity-eyebrow">02 / MY ROLE & SCOPE</p><h2>{project.contributionTitle}</h2><div className="apple-music-contribution-grid">{project.contributions.map((item,i)=><div key={i}><span>{String(i+1).padStart(2,'0')}</span><h3>{item.title}</h3><p>{item.description}</p></div>)}</div></section>}
  {continuation?<StateFarmContinuation value={continuation} headingId={id+'-continuation-title'}/>:<section className="availity-section apple-music-workflow" id={prefix+'-workflow'} tabIndex={-1}><p className="availity-eyebrow">{returning?"03 / QUOTE CONTINUATION":"03 / THE SHOPPING JOURNEY"}</p><div className="availity-heading-row"><h2>{project.workflowTitle}</h2><p>{project.workflowIntro}</p></div><ol className="apple-music-workflow-steps" aria-label={returning?"Returning-customer interaction model":"Shopping interaction model"}>{project.workflow.map((stage,i)=><li key={i}><details><summary><span className="apple-music-step-number">{String(i+1).padStart(2,'0')}</span><span>{stage.title}</span><ArrowDown size={15} aria-hidden="true"/></summary><p>{stage.description}</p></details></li>)}</ol></section>}
  {researchStrategy?<StateFarmResearchStrategy value={researchStrategy} headingId={id+'-research-title'}/>:<section className="availity-section apple-music-research" id={prefix+'-research'} tabIndex={-1}><p className="availity-eyebrow">04 / RESEARCH & EXPERIENCE PRINCIPLES</p><details open><summary><span>{project.researchTitle}</span><ArrowDown size={16} aria-hidden="true"/></summary><p>{project.researchIntro}</p><div className="apple-music-contribution-grid">{project.research.map((item,i)=><div key={i}><span>{String(i+1).padStart(2,'0')}</span><h3>{item.title}</h3><p>{item.description}</p></div>)}</div></details></section>}
  <footer className="availity-section availity-ending"><p>{project.closing}</p><div className="sf-shopping-related"><Link href="/work/digital-assistance">Read the full State Farm case study<ArrowUpRight size={15} aria-hidden="true"/></Link><Link href={returning?"/portfolio/shopping":"/portfolio/returning"}>{returning?"Explore the shopping prototype":"Explore the returning-customer prototype"}<ArrowUpRight size={15} aria-hidden="true"/></Link></div>{editHref&&<Link className="portfolio-edit-hero" href={editHref}>Edit this portfolio page</Link>}</footer>
  <Dialog open={!!selected} onOpenChange={open=>{if(!open)setSelected(null);}}><DialogContent className="availity-image-dialog apple-music-image-dialog" onCloseAutoFocus={event=>{event.preventDefault();returnFocus.current?.focus({preventScroll:true});}}><DialogTitle>{selected?.title}</DialogTitle><DialogDescription>{selected?.description}</DialogDescription>{selected&&<img src={selected.image} alt={selected.alt}/>}</DialogContent></Dialog>
 </article>;
}
