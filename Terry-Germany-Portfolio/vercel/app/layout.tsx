import type { Metadata } from "next";
import "./globals.css";
import "./light-theme.css";
import ThemeProvider from "@/components/theme-provider";
import { CaseStudyProvider } from "@/components/case-study-viewer";
import "./case-study.css";
import "./portfolio-editor.css";
import "./work-gallery.css";
import "./portfolio-project.css";
import "./upgather-portfolio.css";
import "./availity-portfolio.css";
import "./oneof-portfolio.css";
import "./ada-portfolio.css";
import "./irmp-portfolio.css";
import "./apple-music-portfolio.css";
import "./state-farm-shopping-portfolio.css";
import "./neurotrade-portfolio.css";
import { PortfolioViewerProvider } from "@/components/portfolio-viewer";
import { PortfolioContentProvider } from "@/components/portfolio-content-provider";
import { readPublished } from "@/lib/portfolio-store";
import { isPortfolioOwner } from "@/lib/editor-owner";
import { deploymentRecoveryScript } from "@/lib/deployment-recovery";
export const dynamic="force-dynamic";

export const metadata: Metadata = {
  title: "Terry Germany — Human–AI Interaction & Product Design",
  description: "Selected work in human–AI interaction, enterprise product design, research, and design leadership by Terry Germany.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [published, canEdit] = await Promise.all([readPublished(),isPortfolioOwner()]);
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{__html:deploymentRecoveryScript}}/></head>
      <body className="antialiased"><ThemeProvider><PortfolioContentProvider content={published.content} canEdit={canEdit}><CaseStudyProvider><PortfolioViewerProvider>{children}</PortfolioViewerProvider></CaseStudyProvider></PortfolioContentProvider></ThemeProvider></body>
    </html>
  );
}
