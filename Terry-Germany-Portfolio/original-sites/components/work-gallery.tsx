"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Layers, Sparkles } from "lucide-react";
import { CaseStudyLink } from "@/components/case-study-viewer";
import { PortfolioLink } from "@/components/portfolio-viewer";
import { portfolioPieces } from "@/lib/portfolio-pieces";
import { usePortfolioContent } from "@/components/portfolio-content-provider";
import { defaultAdaHealthcare } from "@/lib/ada-healthcare";
import { defaultFintechIrmp } from "@/lib/fintech-irmp";
import { defaultAppleMusic } from "@/lib/apple-music";
import type { Project } from "@/lib/portfolio";

const filters = ["All work", "Portfolio", "Case studies"] as const;
type GalleryFilter = typeof filters[number];

function ProjectPreview({ slug }: { slug: string }) {
 if (slug === "digital-assistance") return <div className="gallery-preview gallery-preview-insurance"><Image src="/work/state-farm-case-study-thumbnail.jpg" alt="State Farm Digital Assistant: a faster start to your quote with license scanning" fill unoptimized sizes="(max-width: 599px) calc(100vw - 36px), (max-width: 959px) 50vw, (max-width: 1199px) 33vw, 360px" className="gallery-thumbnail-image"/></div>;
 if (slug === "upgather") return <div className="gallery-preview gallery-preview-upgather"><Image src="/work/upgather-card-thumbnail.png" alt="Upgather: simplifying complex enterprise experiences, with enterprise dashboard and product design strategy" fill unoptimized sizes="(max-width: 599px) calc(100vw - 36px), (max-width: 959px) 50vw, (max-width: 1199px) 33vw, 360px" className="gallery-thumbnail-image"/></div>;
 if (slug === "apple-intelligence") return <div className="gallery-preview gallery-preview-intelligence"><span className="gallery-preview-label">Intelligent interaction · Cross-platform</span><div className="gallery-intelligence-art" aria-hidden="true"><div className="gallery-orbit"/><div className="gallery-intelligence-core"><Sparkles size={44} strokeWidth={1.2}/></div><span className="gallery-context">Context</span><span className="gallery-interaction">Interaction</span></div><span className="gallery-art-caption">Experience principles</span></div>;
 return <div className="gallery-preview gallery-preview-systems"><span className="gallery-preview-label">Reusable patterns · Design + engineering</span><div className="gallery-system-art" aria-hidden="true"><div className="gallery-system-header"><Layers size={20}/><span>Component foundations</span><i/></div><div className="gallery-system-palette"><i/><i/><i/><i/><i/></div><div className="gallery-system-controls"><span>Default</span><span>Selected</span><span>Disabled</span></div><div className="gallery-system-lines"><i/><i/><i/></div></div><span className="gallery-art-caption">Interaction standards</span></div>;
}



function GalleryCardCopy({title,company,type,tags,role,description,action,featured}:{title:string;company:string;type:string;tags:readonly string[];role?:string;description:string;action:string;featured:boolean}) {
 if(!featured) return <div className="gallery-card-copy gallery-copy-compact"><div className="gallery-title-row"><h3 title={title}>{title}</h3><ArrowUpRight size={17} aria-hidden="true"/></div><div className="gallery-compact-meta"><span className="gallery-compact-company" title={company}>{company}</span><span aria-hidden="true">·</span><span className="gallery-compact-type">{type}</span></div><div className="gallery-card-footer"><div className="gallery-tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></div>;
 return <div className="gallery-card-copy"><div className="gallery-card-company"><span>{company}</span><ArrowUpRight size={20} aria-hidden="true"/></div><span className="gallery-content-type">{type}</span><h3>{title}</h3>{role&&<p className="gallery-card-role">{role}</p>}<p className="gallery-card-description">{description}</p><div className="gallery-card-footer"><div className="gallery-tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div><span className="gallery-open">{action}</span></div></div>;
}

export default function WorkGallery({ projects, featured=false, compact=false, initialFilter="All work" }: { projects: Project[]; featured?:boolean; compact?:boolean; initialFilter?:GalleryFilter }) {
 const [filter, setFilter] = useState<GalleryFilter>(initialFilter);
 const {content}=usePortfolioContent();

 const showStudies = featured || filter !== "Portfolio";
 const showPortfolio = !featured && filter !== "Case studies";
 const count = (showStudies ? projects.length : 0) + (showPortfolio ? portfolioPieces.length : 0);
 return <div className={`work-gallery${!featured || compact ? " work-gallery-compact" : ""}`}>{!featured && <div className="gallery-toolbar"><div className="gallery-filters" role="group" aria-label="Filter selected work">{filters.map(item => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div><span className="gallery-count" aria-live="polite" aria-atomic="true">{count} {count === 1 ? "project" : "projects"}</span></div>}<div className="gallery-grid">{showStudies && projects.map(project => <CaseStudyLink key={project.slug} href={`/work/${project.slug}`} className="gallery-card" aria-label={`View ${project.company} case study: ${project.title}`}><ProjectPreview slug={project.slug}/><GalleryCardCopy title={project.title} company={project.company} type="Case study" tags={project.tags.slice(0,3)} role={project.role} description={project.subtitle} action="View case study" featured={featured && !compact}/></CaseStudyLink>)}{showPortfolio && portfolioPieces.map(original => {
 const ada=content.adaHealthcare??defaultAdaHealthcare;
 const irmp=content.fintechIrmp??defaultFintechIrmp;
 const apple=content.appleMusic??defaultAppleMusic;
 const editable=original.id==="ada-healthcare-wellness"?ada:original.id==="fintech-irmp"?irmp:original.id==="apple-music"?apple:null;
 const piece=editable?{...original,company:editable.cardCompany,title:editable.cardTitle,description:editable.cardDescription,image:editable.cardImage,alt:editable.cardAlt}:original;
 const body = <>{piece.id === "event-flow" ? <ProjectPreview slug="upgather"/> : <div className={`gallery-preview gallery-piece-preview gallery-piece-${piece.id}`}><span className="gallery-preview-label">Portfolio · {piece.type}</span><Image src={piece.image} alt={piece.alt} width={piece.id === "shopping" ? 205 : piece.id === "returning" ? 908 : piece.id === "availity-essentials" ? 1262 : piece.id === "oneof-superlogic" ? 1249 : piece.id === "ada-healthcare-wellness" ? 906 : ["fintech-irmp","apple-music"].includes(piece.id) ? 1800 : 2048} height={piece.id === "shopping" ? 393 : piece.id === "returning" ? 616 : piece.id === "availity-essentials" ? 997 : piece.id === "oneof-superlogic" ? 860 : piece.id === "ada-healthcare-wellness" ? 997 : ["fintech-irmp","apple-music"].includes(piece.id) ? 1360 : 398}/></div>}<GalleryCardCopy title={piece.title} company={piece.company} type={piece.type} tags={piece.tags} description={piece.description} action="View portfolio project" featured={featured && !compact}/></>;
 return <PortfolioLink className="gallery-card" key={piece.id} href={`/portfolio/${piece.id}`} aria-label={`View portfolio project: ${piece.title}`}>{body}</PortfolioLink>;
 })}</div></div>;
}
