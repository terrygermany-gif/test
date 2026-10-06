"use client";

import { Header, Footer } from "@/components/portfolio";
import WorkGallery from "@/components/work-gallery";
import { usePortfolioContent } from "@/components/portfolio-content-provider";

export default function WorkPage() {
 const {projects, content} = usePortfolioContent();
 return <><a href="#main" className="skip-link">Skip to content</a><Header workPage/><main id="main" className="wrap work-page"><div className="work-page-intro"><div className="eyebrow">Selected work</div><h1>Portfolio & case studies.</h1><p>{content.home.workDescription} Explore the prototypes and artifacts, or open a case study for the decisions behind the work.</p></div><WorkGallery projects={projects}/></main><Footer/></>;
}
