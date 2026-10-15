import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { portfolioPieces } from "@/lib/portfolio-pieces";
import { readPublished } from "@/lib/portfolio-store";
import PortfolioProject from "@/components/portfolio-project";

export async function generateMetadata({params}:{params:Promise<{id:string}>}):Promise<Metadata>{const {id}=await params;const piece=portfolioPieces.find(p=>p.id===id);const {content}=await readPublished();const hero=content.portfolioHeroes[id as keyof typeof content.portfolioHeroes];return {title:piece?`${hero.title} — Terry Germany`:"Portfolio project not found",description:piece?hero.description:undefined};}
export default async function PortfolioPage({params}:{params:Promise<{id:string}>}){const {id}=await params;const piece=portfolioPieces.find(p=>p.id===id);if(!piece)notFound();return <PortfolioProject piece={piece}/>;}
