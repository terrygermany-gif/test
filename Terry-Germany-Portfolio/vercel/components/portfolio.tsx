"use client";

import { CaseStudyLink as Link } from "@/components/case-study-viewer";
import Image from "next/image";
import WorkShowcase from "@/components/work-showcase";
import ThemeToggle from "@/components/theme-toggle";
import { FileText } from "lucide-react";
import WorkGallery from "@/components/work-gallery";

import { usePortfolioContent } from "@/components/portfolio-content-provider";

export function Header({workPage=false}:{workPage?:boolean}) {
 const {canEdit,preview}=usePortfolioContent();
 return <header className="site-header wrap"><Link href="/" className="brand" aria-label="Terry Germany home"><span className="brand-mark">TG</span><span>Terry Germany</span></Link><nav className="header-nav" aria-label="Main navigation"><Link href="/work" aria-current={workPage?"page":undefined}>Work</Link><Link href={workPage?"/#about":"#about"}>About</Link><a className="desktop-link" href="/Terry-Germany-Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>{canEdit&&!preview&&<a href="/edit" className="desktop-link">Edit Portfolio</a>}<ThemeToggle/></nav></header>;
}
export function Footer() { return <footer className="site-footer wrap"><span>© {new Date().getFullYear()} Terry Germany</span><span>Human insight. Intelligent experiences.</span><a href="https://www.linkedin.com/in/terrygermany/" target="_blank" rel="noopener noreferrer">LinkedIn</a></footer>; }

export default function Portfolio({heroVariant="showcase"}:{heroVariant?:"original"|"showcase"}) {
 const {content,projects}=usePortfolioContent(); const home=content.home;
 return <><a href="#main" className="skip-link">Skip to content</a><Header/><main id="main" className="wrap portfolio-simple">
  <section className={`hero ${heroVariant==="showcase"?"hero-showcase":""}`} aria-labelledby="hero-title">{heroVariant==="original"?<div className="hero-grid"><div className="hero-copy"><div className="eyebrow">Human–AI interaction · Product design</div><h1 id="hero-title">Explore the work.<br/><span>Let the work<br/>find you.</span></h1><p className="hero-description">I turn complex systems into experiences people understand. Explore 25+ years of product thinking, design craft, and intelligent interaction.</p><div className="media-hero-actions"><Link href="/work" className="button primary">See selected work</Link><a href="/Terry-Germany-Resume.pdf" className="button" target="_blank" rel="noopener noreferrer">View resume</a></div></div><div className="hero-art" aria-hidden="true"><Image src="/human-ai-orbit.png" alt="" width={1536} height={1024} priority unoptimized/><div className="art-caption">Human insight × intelligent systems</div></div></div>:<WorkShowcase/>}</section>
  <section id="work" className="section work-section">
   <div className="section-head"><div><div className="eyebrow">Portfolio & case studies</div><h2>{home.workTitle}</h2></div><p className="section-sub">{home.workDescription}</p></div>
   <WorkGallery projects={projects.slice(0,2)} featured/>
   <div className="featured-work-action"><Link href="/work" className="button">View all portfolio & case studies →</Link></div>
  </section>
  <section id="about" className="about"><div><div className="eyebrow">About Terry</div><h2 style={{whiteSpace:"pre-line"}}>{home.aboutTitle}</h2></div><div>{home.aboutParagraphs.map((p,i)=><p key={i}>{p}</p>)}<div className="about-links"><a href="mailto:terry.germany@gmail.com" className="button primary">Let’s talk</a><a href="/Terry-Germany-Resume.pdf" className="button" target="_blank" rel="noopener noreferrer"><FileText size={15}/>View resume</a><a href="https://www.linkedin.com/in/terrygermany/" className="button" target="_blank" rel="noopener noreferrer">LinkedIn</a></div></div></section>
 </main><Footer/></>;
}
