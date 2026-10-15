"use client";

import Image from "next/image";
import StateFarmShoppingPortfolio from '@/components/state-farm-shopping-portfolio';
import AdaPortfolio from '@/components/ada-portfolio';
import NeurotradePortfolio from '@/components/neurotrade-portfolio';
import AppleMusicPortfolio from '@/components/apple-music-portfolio';
import OneofPortfolio from '@/components/oneof-portfolio';
import AvailityPortfolio from "@/components/availity-portfolio";
import UpgatherPortfolio from "@/components/upgather-portfolio";
import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import { portfolioPieces, type PortfolioPiece } from "@/lib/portfolio-pieces";
import { usePortfolioContent } from "@/components/portfolio-content-provider";
import { PortfolioLink } from "@/components/portfolio-viewer";

const details: Record<string, { intro: string; items: string[] }> = {
 shopping: { intro: "A conversational shopping exploration that helps customers move from an insurance question to their next step.", items: ["A guided starting point for shopping", "Conversational assistance alongside the customer’s task", "An interactive prototype to explore the flow"] },
 returning: { intro: "A returning-customer experience that brings quote continuation and relevant guidance into one place.", items: ["Continue an existing quote", "Discover personalized recommendations", "Access contextual Digital Assistance"] },
 "event-flow": { intro: "An event-page workflow for Upgather, connecting event setup with page creation, review, and publishing.", items: ["Create a new page or reuse an existing layout", "Save a draft while details are still taking shape", "Review and publish the event page"] },
};

export default function PortfolioProject({piece,onClose}:{piece:PortfolioPiece;onClose?:()=>void}) {
 const info=details[piece.id];
 const {content,canEdit,preview}=usePortfolioContent();
 const hero=content.portfolioHeroes[piece.id as keyof typeof content.portfolioHeroes];
 const backHref=preview?"/edit/preview?view=work":"/work?view=portfolio";
 if(piece.id==="returning")return <StateFarmShoppingPortfolio onClose={onClose} variant="returning"/>;
 if(piece.id==="shopping")return <StateFarmShoppingPortfolio onClose={onClose}/>;
 if(piece.id==="ada-healthcare-wellness")return <AdaPortfolio onClose={onClose}/>;
 if(piece.id==="fintech-irmp")return <AdaPortfolio onClose={onClose} variant="irmp"/>;
 if(piece.id==="neurotrade")return <NeurotradePortfolio onClose={onClose}/>;
 if(piece.id==="apple-music")return <AppleMusicPortfolio onClose={onClose}/>;
 if(piece.id==="oneof-superlogic")return <OneofPortfolio onClose={onClose}/>;
 if(piece.id==="availity-essentials")return <AvailityPortfolio onClose={onClose}/>;
 if(piece.id==="event-flow")return <UpgatherPortfolio onClose={onClose}/>;
 return <div className="portfolio-project">
  <header className="proof-toolbar"><div className="proof-toolbar-left">{onClose?<button type="button" className="proof-back" onClick={onClose}><ArrowLeft size={17}/>All portfolio</button>:<Link className="proof-back" href={backHref}><ArrowLeft size={17}/>All portfolio</Link>}<span className="proof-toolbar-name">{piece.company}</span></div><div className="proof-toolbar-actions"><ThemeToggle/>{onClose?<button type="button" className="study-tool study-close" onClick={onClose} aria-label="Close portfolio project"><X size={18}/></button>:<Link href={backHref} className="study-tool study-close" aria-label="Back to portfolio"><X size={18}/></Link>}</div></header>
  <section className={`portfolio-split-hero portfolio-split-${piece.id}`} aria-labelledby={`portfolio-${piece.id}-title`}>
   <div className="portfolio-split-copy"><p className="portfolio-split-badge">{hero.badge}</p><h1 id={`portfolio-${piece.id}-title`}>{hero.title}</h1><p className="portfolio-split-description">{hero.description}</p><ul className="portfolio-split-tags" aria-label="Project focus">{hero.tags.map(tag=><li key={tag}>{tag}</li>)}</ul>{canEdit&&!preview&&<Link className="portfolio-edit-hero" href={`/edit?portfolio=${piece.id}`}>Edit hero</Link>}</div>
   <figure className={`portfolio-split-art ${piece.id==="shopping"&&hero.image===piece.image?"portfolio-split-phone":""}`}><div className="portfolio-split-art-frame"><Image className={hero.lightImage?"portfolio-split-image-dark":undefined} src={hero.image} alt={hero.imageAlt} width={piece.id==="shopping"?205:piece.id==="returning"?908:2048} height={piece.id==="shopping"?393:piece.id==="returning"?616:1152} unoptimized priority/>{hero.lightImage&&<Image className="portfolio-split-image-light" src={hero.lightImage} alt={hero.imageAlt} width={2048} height={1152} unoptimized priority/>}</div></figure>
  </section>
  <main className="portfolio-project-content">
   <div className="portfolio-reading-column">
    <section className="portfolio-project-intro" aria-label="Project overview"><p>{info.intro}</p>{piece.href&&<a className="portfolio-prototype-link" href={piece.href} target="_blank" rel="noopener noreferrer">Open interactive prototype<span className="sr-only"> in a new tab</span></a>}{piece.id==="event-flow"&&<a className="portfolio-prototype-link" href={piece.image} target="_blank" rel="noopener noreferrer">Open event workflow<span className="sr-only"> in a new tab</span></a>}</section>
    <dl className="portfolio-project-facts"><div><dt>Product</dt><dd>{piece.company}</dd></div><div><dt>My role</dt><dd>{piece.id==="event-flow"?"Principal Product Designer":"Senior Experience Lead"}</dd></div><div><dt>Format</dt><dd>{piece.type}</dd></div><div><dt>Focus</dt><dd>{piece.tags.join(", ")}</dd></div></dl>
    <section className="portfolio-project-overview"><h2>{piece.id==="shopping"?"A guided start to shopping":piece.id==="returning"?"A familiar place to return":"A clear path from setup to publishing"}</h2><ul>{info.items.map(item=><li key={item}>{item}</li>)}</ul></section>
   </div>
   <nav className="portfolio-project-more" aria-label="More portfolio projects"><h2>More portfolio work</h2><div>{portfolioPieces.filter(other=>other.id!==piece.id).map(other=><PortfolioLink key={other.id} href={`/portfolio/${other.id}`}><span>{other.company}</span><strong>{other.title}</strong><span>{other.type}</span></PortfolioLink>)}</div></nav>
  </main>
 </div>;
}
