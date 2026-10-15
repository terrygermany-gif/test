import type { Metadata } from "next";
import WorkPage from "@/components/work-page";

export const metadata: Metadata = {
 title: "Work — Terry Germany",
 description: "Portfolio projects, interactive prototypes, and case studies in AI experience strategy, enterprise product design, and design systems.",
};

export default async function Page({searchParams}:{searchParams:Promise<{view?:string}>}) { const {view}=await searchParams;return <WorkPage portfolioOnly={view==="portfolio"}/>; }
