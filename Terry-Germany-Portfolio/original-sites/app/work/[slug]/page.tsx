import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/lib/portfolio";
import { readPublished } from "@/lib/portfolio-store";
import { contentProjects } from "@/lib/portfolio-content";
import { ProjectStudyPage } from "@/components/project-study";

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata> { const {slug}=await params;const p=contentProjects((await readPublished()).content).find(p=>p.slug===slug);return {title:p?`${p.company} — Terry Germany`:"Project not found — Terry Germany",description:p?.subtitle}; }
export default async function ProjectPage({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params; const p=projects.find(p=>p.slug===slug);if(!p)notFound();
 return <ProjectStudyPage project={p}/>;
}
