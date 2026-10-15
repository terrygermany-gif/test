"use client";
import {useId,type ReactNode} from "react";
import {ArrowDown,ArrowUpRight} from "lucide-react";
import {ArtifactGallery} from "./portfolio-artifact-gallery";
import type {OneofSuperlogic} from "@/lib/oneof-superlogic";
export type OneofHero={badge:string;title:string;description:string;tags:string[];image:string;lightImage:string;imageAlt:string;framing:"full"|"dashboard"};
type Artifact={title:string;description:string;image:string;alt:string};

export default function OneofPortfolioBody({hero,project,editHref,onViewArtifact,mobileGallery}:{hero:OneofHero;project:OneofSuperlogic;editHref?:string;onViewArtifact:(artifact:Artifact)=>void;mobileGallery:ReactNode}){
 const id=useId();
 const desktopId=id+"-desktop",creationId=id+"-creation",evidenceId=id+"-evidence";
 return <>
  <section className="oneof-hero">
   <div className="oneof-hero-heading"><p className="availity-eyebrow">{hero.badge}</p>{editHref&&<a className="oneof-edit-link" href={editHref}>Edit portfolio<ArrowUpRight size={14} aria-hidden="true"/></a>}</div>
   <div className="oneof-hero-copy"><h1 id="oneof-title">{hero.title}</h1><p className="oneof-hero-description">{hero.description}</p><ul className="availity-tags" aria-label="Project focus">{hero.tags.map(tag=><li key={tag}>{tag}</li>)}</ul><a className="oneof-primary-link" href={"#"+desktopId}>Explore the work<ArrowDown size={17} aria-hidden="true"/></a></div>
   <figure className="oneof-hero-art"><div className={"oneof-hero-art-frame"+(hero.image==="/work/oneof-dashboard-fp-top-header2.png"&&!hero.lightImage?" oneof-hero-art-trimmed":"")}><img className={hero.lightImage?"availity-cover-image-dark":undefined} src={hero.image} alt={hero.imageAlt} loading="eager" fetchPriority="high"/>{hero.lightImage&&<img className="availity-cover-image-light" src={hero.lightImage} alt={hero.imageAlt} loading="eager"/>}</div></figure>
  </section>
  <section className="oneof-brief" aria-label="Project overview"><dl className="oneof-facts">{[["Client",project.client],["My role",project.role],["Timeline",project.timeline],["Tools",project.tools]].map(([name,value])=><div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}</dl><div className="oneof-delivery"><dl><dt>Delivery status</dt><dd>{project.deliveryStatus}</dd></dl><p>{project.deliverySummary}</p></div><p>{project.overview}</p></section>
  <nav className="oneof-chapters" aria-label="Explore this project"><a href={"#"+desktopId}>01 / Desktop</a><a href={"#"+creationId}>02 / Creation flow</a><a href={"#"+evidenceId}>03 / Process</a></nav>
  <section className="oneof-section oneof-artifact-section" id={desktopId}><div className="oneof-section-heading"><div><p className="availity-eyebrow">01 / THE WORKSPACE</p><h2>{project.desktopTitle}</h2></div><p>{project.desktopIntro}</p></div><ArtifactGallery label="Workspace" items={project.desktop} onViewArtifact={onViewArtifact}/></section>
  <section className="oneof-section oneof-artifact-section" id={creationId}><div className="oneof-section-heading"><div><p className="availity-eyebrow">02 / THE CREATION JOURNEY</p><h2>{project.creationTitle}</h2></div><p>{project.creationIntro}</p></div><ArtifactGallery label="Creation journey" items={project.creation} onViewArtifact={onViewArtifact}/></section>
  {mobileGallery}
  <section className="oneof-section oneof-contribution" id={evidenceId}>
   <p className="availity-eyebrow">03 / RESEARCH, UX & UI DESIGN</p><h2>{project.contribution.title}</h2>
   <div className="oneof-contribution-layout">
    <div className="oneof-project-story">
     <div className="oneof-story-points">{[["My responsibility",project.contribution.led],["Key design takeaway",project.contribution.learned],["What I delivered",project.contribution.changed]].map(([title,description])=><div className="oneof-story-point" key={title}><h3>{title}</h3><p>{description}</p></div>)}</div>
     <div className="oneof-scope"><p>Design scope</p><dl>{[[project.creation.length,"creation screens"],[project.desktop.length,"desktop views"],[project.mobile.length,"mobile views"]].map(([count,label])=><div key={label}><dt>{label}</dt><dd>{count}</dd></div>)}</dl></div>
    </div>
    <div className="oneof-decisions" aria-labelledby={id+"-decisions"}>
     <h3 id={id+"-decisions"}>{project.contribution.evidenceTitle}</h3><p className="oneof-decisions-intro">Explore a decision to see the thinking and the designs behind it.</p>
     {project.contribution.evidence.map((decision,i)=>{
      const artifacts=decision.references.flatMap(reference=>{const artifact=project[reference.group][reference.index];return artifact?[artifact]:[];});
      return <details className="oneof-decision" key={i}>
       <summary><span className="oneof-decision-number" aria-hidden="true">{String(i+1).padStart(2,"0")}</span><span className="oneof-decision-heading"><span>{decision.title}</span><span className="oneof-decision-hint">{artifacts.length?`${artifacts.length} supporting ${artifacts.length===1?"screen":"screens"}`:"Design reasoning"}</span></span><ArrowDown size={16} aria-hidden="true"/></summary>
       <div className="oneof-decision-content"><p>{decision.description}</p><div className="oneof-decision-previews">{artifacts.map((artifact,j)=><button type="button" key={j} onClick={()=>onViewArtifact(artifact)} aria-label={"View "+artifact.title}><span className="oneof-decision-image"><img src={artifact.image} alt={artifact.alt} loading="lazy"/></span><span className="oneof-decision-caption">{artifact.title}<ArrowUpRight size={14} aria-hidden="true"/></span></button>)}</div></div>
      </details>;
     })}
    </div>
   </div>
   <details className="oneof-evidence"><summary><span className="oneof-evidence-title">Research & design approach</span><span className="oneof-evidence-count"><ArrowDown size={16} aria-hidden="true"/></span></summary><div className="oneof-methods"><h3>{project.approachTitle}</h3><p>{project.approachIntro}</p><div className="oneof-approach">{project.approach.map((note,i)=><div key={i}><h3>{note.title}</h3><p>{note.description}</p></div>)}</div>
    {[{title:project.directionTitle,intro:project.directionIntro,items:project.overviewVisuals},{title:project.startingTitle,intro:project.startingIntro,items:project.starting}].map((group,i)=><div className="oneof-method-evidence" key={i}><h3>{group.title}</h3><p>{group.intro}</p><div className="oneof-evidence-grid">{group.items.map((item,index)=><figure key={index}><button type="button" onClick={()=>onViewArtifact(item)} aria-label={"Enlarge "+item.title}><img src={item.image} alt={item.alt} loading="lazy"/></button><figcaption><h3>{item.title}</h3><p>{item.description}</p></figcaption></figure>)}</div></div>)}
   </div></details>
  </section>
  <footer className="oneof-section oneof-ending"><p className="availity-eyebrow">THE DESIGN OUTPUT</p><p>{project.closing}</p>{editHref&&<a className="portfolio-edit-hero" href={editHref}>Edit this portfolio page</a>}</footer>
 </>;
}
