"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, Check, Copy, Expand, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import ThemeToggle from "@/components/theme-toggle";
import { CaseStudyLink } from "@/components/case-study-viewer";
import { type Project } from "@/lib/portfolio";
import { getProof, type Evidence } from "@/lib/project-proof";
import { usePortfolioContent } from "@/components/portfolio-content-provider";
import StateFarmMaturity from "@/components/state-farm-maturity";
import StateFarmRadar from "@/components/state-farm-radar";
import StateFarmOpportunity from "@/components/state-farm-opportunity";
import StateFarmDesignStory, { StateFarmDelivery } from "@/components/state-farm-design-story";
import StateFarmShoppingSimulator from "@/components/state-farm-shopping-simulator";
import StateFarmHero from "@/components/state-farm-hero";
import { StudyChapterHeading, StudyChapterNav } from "@/components/study-chapters";
import type { CaseMedia } from "@/lib/state-farm-media";

export function scrollToStudy(slug:string,section:string) {
 document.getElementById(`${slug}-${section}`)?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"start"});
}
function HomeControl({onClose,href="/work",children,...props}:{onClose?:()=>void;href?:string;children:ReactNode;className?:string;"aria-label"?:string}) {
 const {preview}=usePortfolioContent();const destination=preview?`/edit/preview${href.includes("#")?href.slice(href.indexOf("#")):""}`:href;
 return <a {...props} href={destination} onClick={event=>{if(onClose&&event.button===0&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey){event.preventDefault();onClose();}}}>{children}</a>;
}
export function ProjectStudyToolbar({project,onClose,closeHref="/work"}:{project:Project;onClose?:()=>void;closeHref?:string}) {
 const [copyState,setCopyState]=useState("");
 useEffect(()=>setCopyState(""),[project.slug]);
 async function copyLink(){try{await navigator.clipboard.writeText(`${window.location.origin}/work/${project.slug}`);setCopyState("Link copied");}catch{setCopyState("Copy the project URL from your address bar.");}}
 return <header className="proof-toolbar"><div className="proof-toolbar-left"><HomeControl onClose={onClose} href={closeHref} className="proof-back"><ArrowLeft size={17}/> All Work</HomeControl><span className="proof-toolbar-name">{project.company}</span></div><div className="proof-toolbar-actions"><button className="study-tool" onClick={copyLink} aria-label="Copy case study link">{copyState==="Link copied"?<Check size={17}/>:<Copy size={17}/>}</button><ThemeToggle/><HomeControl onClose={onClose} href={closeHref} className="study-tool study-close" aria-label={`Close ${project.company} case study`}><X size={19}/><span>Close</span></HomeControl></div><span className="study-copy-status" role="status">{copyState}</span></header>;
}

function Media({media,onOpen}:{media:CaseMedia;onOpen:(e:Evidence)=>void}) {
 if(!media.src)return null;
 return <figure className="proof-media">{media.type==="video"?<video controls playsInline preload="metadata" poster={media.poster} aria-label={media.title}><source src={media.src}/>{media.captions&&<track kind="captions" src={media.captions} srcLang="en" label="English" default/>}</video>:<button className="proof-media-image" onClick={()=>onOpen({id:media.title,title:media.title,status:"Artifact available",summary:media.caption,detail:media.caption,src:media.src!})} aria-label={`Enlarge ${media.title}`}><img src={media.src} alt={media.title}/><span><Expand size={15}/> Inspect artifact</span></button>}<figcaption>{media.caption}</figcaption></figure>;
}

// Present case-study context in the portfolio's first-person voice, including saved editor content.
function studyContext(text?:string) {
 return text?.replace(/Based on Terry[’']s supplied SF — GenAI Maturity Model-v2 board screenshot and his account of implementing the model with Product and Engineering\.\s*/g, "")
  .replace(/Terry[’']s supplied project account describes /g, "The project included ")
  .replace(/Terry led /g, "I led ")
  .replace(/His account describes ownership of /g, "My responsibilities included ");
}
const sectionNames=[ ["overview","Overview"],["evidence","Evidence"],["research","Research"],["strategy","Strategy"],["decisions","Design decisions"],["impact","Outcomes"] ];
const collaboration:Record<string,string>={
 "digital-assistance":"Aligned Product and Engineering through shared conversation patterns, a Digital Assistance design kit, and the AI Maturity Model.",
 "apple-intelligence":"Partnered with data scientists, ML engineers, and platform teams on interaction patterns and prototype validation.",
 upgather:"Worked with Engineering on consistency and change tracking across Figma, Storybook, and the repository.",
 "design-systems":"Worked through implementation trade-offs with Engineering using working sessions, prototypes, and shared references."
};
export default function ProjectStudy({project,onClose}:{project:Project;onClose?:()=>void}) {
 const {content,projects}=usePortfolioContent();
 const study=content.studies[project.slug];
 const proof={...getProof(project.slug),...study,prototypes:study.media}, strategy=study.strategy, index=projects.findIndex(p=>p.slug===project.slug);
 const hasMaturity=project.slug==="digital-assistance";
 const hasVisual=project.slug==="digital-assistance"||project.slug==="upgather";
 const evidence=proof.evidence.filter(e=>e.status!=="Placeholder"&&["research","concepts","engineering","ai-maturity","stakeholders"].includes(e.id)).filter(e=>e.id!=="stakeholders"||!hasMaturity&&project.slug!=="apple-intelligence");
 const media=proof.prototypes.filter(item=>item.src);
 const [expanded,setExpanded]=useState<Evidence|null>(null);
 const id=(name:string)=>`${project.slug}-${name}`;
 const chapterOrder=hasMaturity?["contribution",...study.sectionOrder.filter(name=>name!=="evidence")]:study.sectionOrder;
 const contributionContent=<><ul>{project.contribution.slice(0,3).map(c=><li key={c}>{c}</li>)}</ul><p className={hasMaturity?"study-collaboration-copy":undefined}>{study.collaboration}</p></>;
 const chapterNumber=(name:string)=>String(chapterOrder.indexOf(name)+1).padStart(2,"0");
 const section=(name:string,number:string,title:string,children:ReactNode)=> <section id={id(name)} className={`proof-section proof-section-${name}`} aria-labelledby={id(name+"-heading")}><StudyChapterHeading name={name} number={chapterNumber(name)} title={title} headingId={id(name+"-heading")} compact={hasMaturity}/><div className="study-section-body">{children}</div></section>;
 const evidenceCards=<div className={`proof-evidence-grid ${evidence.length===3?"":"proof-evidence-pairs"}`}>{evidence.map(e=><button key={e.id} className="proof-evidence-card" onClick={()=>setExpanded(e)} aria-label={`Open ${e.title} evidence`}><span className="study-evidence-title"><h3>{e.title}</h3><span className="proof-status">{e.status}</span></span><span className="proof-card-action">Read context</span></button>)}</div>;
 const renderedSections:Record<string,ReactNode>={
  contribution: hasMaturity&&section("contribution","01","My contribution & collaboration",<div className="study-contribution-body">{contributionContent}</div>),
  maturity: hasMaturity&&section("maturity","01","AI Maturity Model",<StateFarmMaturity/>),
  evidence: section("evidence","02","Follow the evidence.",<><p className="proof-section-deck">A closer look at the research, concepts, and collaboration behind the experience.</p>{evidenceCards}</>),
  research: section("research","03",hasMaturity?"Follow the evidence: Research & experimentation.":"Research that shaped the direction.",<><p className="proof-section-deck">{study.researchIntro}</p>{hasMaturity&&<div className="sf-research-artifacts" id={id("evidence")}><h3>Explore the work behind the decisions.</h3>{evidenceCards}</div>}<details className="study-disclosure"><summary>Research questions & context</summary><div className="proof-insights">{proof.insights.map((text,i)=><div key={text}><span>0{i+1}</span><p>{text}</p></div>)}</div>{!hasMaturity&&proof.evidence[0].status!=="Placeholder"&&<button className="proof-inline-link" onClick={()=>setExpanded(proof.evidence[0])}>Read research context</button>}<p className="proof-note">{study.researchNote}</p></details>{hasMaturity&&<><StateFarmOpportunity/>{study.caseDetails?.researchObservation&&study.caseDetails.designChange&&study.caseDetails.researchArtifactSrc&&<div className="sf-research-takeaway"><h3>What research changed.</h3><dl><div><dt>What we observed</dt><dd>{study.caseDetails.researchObservation}</dd></div><div><dt>What I changed</dt><dd>{study.caseDetails.designChange}</dd></div></dl><Media media={{title:"Research-informed design",caption:"The design change connected to this research observation.",src:study.caseDetails.researchArtifactSrc,type:"image"}} onOpen={setExpanded}/></div>}</>}</>),
  strategy: section("strategy","04","Competitive Intelligence + Engagement Strategy",<><p className="proof-section-deck">{strategy.context}</p>{hasMaturity&&<StateFarmRadar/>}<div className="proof-strategy-grid"><details className="proof-strategy-panel study-disclosure"><summary>Competitive intelligence</summary><p className="proof-strategy-note">{hasMaturity ? "Comparison questions behind the supplied capability assessment." : "Comparison framework · benchmark findings are not supplied."}</p><ul className="proof-comparison-topics">{strategy.comparisons.map(c=><li key={c.title}>{c.title}</li>)}</ul><details className="proof-strategy-details"><summary>View comparison questions</summary><ul className="proof-strategy-lenses">{strategy.comparisons.map(c=><li key={c.title}><h4>{c.title}</h4><p>{c.question}</p></li>)}</ul></details></details><details className="proof-strategy-panel study-disclosure"><summary>Engagement strategy</summary><ol className="proof-engagement-steps">{strategy.engagement.map((step,i)=><li key={step.title}><span>0{i+1}</span><div><h4>{step.title}</h4><p>{step.direction}</p></div></li>)}</ol></details></div>{!hasMaturity&&<div className="proof-strategy-opportunity"><span className="study-kicker">Opportunity to test</span><p>{strategy.opportunity}</p></div>}<details className="study-disclosure"><summary>Proposed measures</summary><p className="proof-strategy-measures">{strategy.signals.join(" · ")}. Results are not supplied.</p></details></>),
  decisions: section("decisions","05","Design decisions, made visible.",hasMaturity?<><StateFarmShoppingSimulator/><StateFarmDesignStory onOpen={setExpanded}/><details className="study-disclosure sf-additional-design"><summary>Additional design explorations</summary><div className={`proof-design-layout ${media.length?"has-media":""}`}><div className="proof-key-decisions"><div><span className="study-kicker">Decision 01</span><h3>{proof.choice}</h3><p>{proof.why}</p></div><div><span className="study-kicker">Decision 02</span><h3>{project.decisions[1].title}</h3><p>{project.decisions[1].text}</p></div></div>{media.length>0&&<div className="proof-design-media">{media.map(item=><Media key={item.title} media={item} onOpen={setExpanded}/>)}</div>}</div></details></>:<div className={`proof-design-layout ${media.length?"has-media":""}`}><div className="proof-key-decisions"><div><span className="study-kicker">Decision 01</span><h3>{proof.choice}</h3><p>{proof.why}</p></div><div><span className="study-kicker">Decision 02</span><h3>{project.decisions[1].title}</h3><p>{project.decisions[1].text}</p></div></div>{media.length>0&&<div className="proof-design-media">{media.map(item=><Media key={item.title} media={item} onOpen={setExpanded}/>)}</div>}</div>),
  impact: section("impact","06",hasMaturity?"What reached implementation—and what comes next.":"Outcomes & lessons.",<>{hasMaturity?<><StateFarmDelivery/>{study.caseDetails?.deliveryExample&&<div className="sf-delivery-example"><span className="study-kicker">Adopted by Product + Engineering</span><p>{study.caseDetails.deliveryExample}</p></div>}</>:<><div className="proof-outcome-summary"><span className="study-kicker">Documented contribution</span><h3>{proof.directional}</h3><p>{project.evidence}</p></div><p className="proof-note">{study.outcomeNote}</p></>}<div className="proof-lesson"><span className="study-kicker">What I take forward</span><p>{project.takeaway}</p></div></>),
 };
 return <><article className={`project-study proof-editorial proof-${project.color} ${hasMaturity?"proof-state-farm":""}`}>
  {hasMaturity?<StateFarmHero title={project.title} description={project.subtitle} headingId={id("heading")} onInspect={kind=>setExpanded({id:`hero-${kind}`,title:kind==="phone"?"State Farm Digital Assistant":"State Farm returning-customer experience",status:"Artifact available",summary:"State Farm experience design",detail:kind==="phone"?"Digital Assistant auto-quote experience with license scanning and manual entry.":"Returning-customer homepage with quote continuation, recommendations, and contextual Digital Assistance.",src:kind==="phone"?"/work/state-farm-hero-phone.png":"/work/state-farm-hero-laptop.png"})}/>:<>
  <section id={id("overview")} className={`study-cover ${hasVisual?"study-cover-with-artifact":"study-cover-type"}`} aria-labelledby={id("heading")}>
   <span className="study-cover-label">{project.company} / Case study</span>
   {hasVisual&&<figure className={`study-cover-artifact ${hasMaturity?"study-cover-phone":""}`}><button onClick={()=>setExpanded(proof.evidence.find(e=>e.id==="concepts")!)} aria-label={`Inspect ${proof.visualLabel}`}>{hasMaturity?<div className="study-phone-shell"><div className="study-phone-screen"><img src={proof.visual} alt="State Farm conversational assistant mobile prototype"/></div></div>:<img src={proof.visual} alt={proof.visualLabel}/>}<span className="proof-visual-inspect"><Expand size={15}/> Inspect visual</span></button></figure>}
   <div className="study-cover-title"><h1 id={id("heading")}>{project.title}</h1><p>{project.subtitle}</p></div>
  </section>
  </>}
  <div className="study-overview">
   {hasMaturity&&<div className="study-overview-story"><h2 className="study-kicker">Project at a glance</h2>{study.caseDetails?.timeframe&&<p className="sf-project-timeframe">{study.caseDetails.timeframe}</p>}<p className="study-overview-summary">{project.challenge === 'Insurance journeys and emerging AI initiatives were spread across separate teams, forms, and digital surfaces. I defined an assistance model around customer intent: understand the goal, guide complex decisions, explain recommendations, and connect people to human support when needed.' ? 'I unified fragmented insurance journeys around customer intent—helping people navigate complex decisions, understand recommendations, and reach human support when needed.' : project.challenge}</p></div>}
   <aside className="study-scope">{!hasMaturity&&<span className="study-kicker">Project scope</span>}<dl className="proof-facts"><div><dt>My role</dt><dd>{project.role}</dd></div><div><dt>Focus</dt><dd>{project.domain}</dd></div><div><dt>Scope</dt><dd>{hasMaturity?"10M+ customer ecosystem":proof.scope}</dd></div></dl></aside>
   {!hasMaturity&&<div className="study-overview-story"><span className="study-kicker">Overview</span><h2>{project.challenge}</h2><details className="study-disclosure"><summary>My contribution & collaboration</summary>{contributionContent}</details></div>}
  </div>
  <StudyChapterNav slug={project.slug} sections={chapterOrder}/>
  <div className="proof-content">
   {chapterOrder.map(name=><div key={name} className="proof-ordered-section">{renderedSections[name]}</div>)}
   <footer className="proof-footer"><CaseStudyLink href={`/work/${projects[(index+projects.length-1)%projects.length].slug}`}><span>Previous project</span><strong>{projects[(index+projects.length-1)%projects.length].company}</strong></CaseStudyLink><HomeControl onClose={onClose} className="proof-back">Back to Work</HomeControl><CaseStudyLink href={`/work/${projects[(index+1)%projects.length].slug}`}><span>Next project</span><strong>{projects[(index+1)%projects.length].company}</strong></CaseStudyLink></footer>
   <div className="proof-signoff"><HomeControl href="/" onClose={onClose} aria-label="Terry Germany home">Terry Germany</HomeControl><a href="mailto:terry.germany@gmail.com">Let’s talk about your team</a></div>
  </div>
 </article><Dialog open={!!expanded} onOpenChange={open=>{if(!open)setExpanded(null);}}><DialogContent className="proof-evidence-dialog" showCloseButton={false}><div className="proof-evidence-dialog-header"><div><span className="proof-status">{expanded?.status}</span><DialogTitle>{expanded?.title}</DialogTitle></div><button className="study-tool" onClick={()=>setExpanded(null)} aria-label="Close evidence"><X size={20}/></button></div><DialogDescription asChild><div>{studyContext(expanded?.detail)?.split(/\n\s*\n/).map((paragraph,i)=><p key={i}>{paragraph}</p>)}</div></DialogDescription>{expanded?.src&&<div className="proof-artifact-scroll"><img src={expanded.src} alt={expanded.title}/></div>}</DialogContent></Dialog></>;
}

export function ProjectStudyPage({project:original}:{project:Project}) {
 const {projects,preview}=usePortfolioContent();const project=projects.find(p=>p.slug===original.slug)!;
 useEffect(()=>{if(preview)return;const escape=(event:KeyboardEvent)=>{if(event.key==="Escape"&&!document.querySelector('[role="dialog"]')&&!(event.target instanceof HTMLElement&&event.target.matches("input,textarea,[contenteditable=true]")))window.location.assign("/work");};window.addEventListener("keydown",escape);return()=>window.removeEventListener("keydown",escape);},[preview]);
 return <><a href={`#${project.slug}-heading`} className="skip-link">Skip to case study</a><ProjectStudyToolbar project={project}/><main className="proof-page"><ProjectStudy key={project.slug} project={project}/></main></>;
}
