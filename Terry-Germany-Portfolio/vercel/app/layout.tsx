import type { Metadata } from "next";
import "./globals.css";
import "./light-theme.css";
import ThemeProvider from "@/components/theme-provider";
import { CaseStudyProvider } from "@/components/case-study-viewer";
import "./case-study.css";
import "./portfolio-editor.css";
import "./work-gallery.css";
import { PortfolioContentProvider } from "@/components/portfolio-content-provider";
import { readPublished } from "@/lib/portfolio-store";
import { isPortfolioOwner } from "@/lib/editor-owner";
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
      <body className="antialiased"><ThemeProvider><PortfolioContentProvider content={published.content} canEdit={canEdit}><CaseStudyProvider>{children}</CaseStudyProvider></PortfolioContentProvider></ThemeProvider></body>
    </html>
  );
}
