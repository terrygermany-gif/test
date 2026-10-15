import { z } from 'zod';
import { portfolioPieces } from './portfolio-pieces';

const source=z.string().regex(/^\/(api\/portfolio-media\/[0-9a-f-]{36}|work\/[a-zA-Z0-9_.-]+)$/);
export const portfolioHeroSchema=z.object({
 badge:z.string().trim().min(1).max(400),
 title:z.string().trim().min(1).max(400),
 description:z.string().trim().min(1).max(8000),
 tags:z.array(z.string().trim().max(100)).transform(tags=>tags.filter(Boolean)).pipe(z.array(z.string().min(1).max(100)).max(5)),
 image:source,
 lightImage:z.union([z.literal(''),source]),
 imageAlt:z.string().trim().min(1).max(400),
 framing:z.enum(['full','dashboard']),
}).strict();
export type PortfolioHero=z.infer<typeof portfolioHeroSchema>;
export const defaultPortfolioHeroes:Record<string,PortfolioHero>=Object.fromEntries(portfolioPieces.map(piece=>[piece.id,{
 badge:`${piece.company} / Portfolio`,
 title:piece.id==='event-flow'?'Simplifying complex enterprise experiences.':piece.title,
 description:piece.id==='event-flow'?'I connect UX research, product strategy, and hands-on design to make complex enterprise workflows easier to navigate.':piece.description,
 tags:piece.tags,
 image:piece.id==='event-flow'?'/work/upgather-portfolio-hero-v2.png':piece.id==='availity-essentials'?'/work/availity-availity-mac-laptop-2-1.png':piece.image,
 lightImage:piece.id==='event-flow'?'/work/upgather-portfolio-hero-light.png':'',
 imageAlt:piece.id==='event-flow'?'Upgather dashboard for event operations, registrations, and task management':piece.id==='availity-essentials'?'Availity Essentials desktop interface presented on a laptop':piece.alt,
 framing:'full',
}]));
defaultPortfolioHeroes['fintech-irmp'].image='/work/irmp-IR-ERC-FINTECH-TAX-Iphone-Mockup.png';
defaultPortfolioHeroes['fintech-irmp'].imageAlt='Innovation Refunds mobile application shown on two phones';
defaultPortfolioHeroes['apple-music'].image='/work/apple-music-apple-music-header-1.png';
defaultPortfolioHeroes['apple-music'].imageAlt='Apple Music mobile interfaces for listening, discovery and radio';
defaultPortfolioHeroes['apple-music'].title='Refining Apple Music. Connecting design to code.';
export const portfolioHeroesSchema=z.object({
 shopping:portfolioHeroSchema,
 returning:portfolioHeroSchema,
 'event-flow':portfolioHeroSchema,
 'oneof-superlogic':portfolioHeroSchema.default(()=>structuredClone(defaultPortfolioHeroes['oneof-superlogic'])),
 'availity-essentials':portfolioHeroSchema.default(()=>structuredClone(defaultPortfolioHeroes['availity-essentials'])),
 'ada-healthcare-wellness':portfolioHeroSchema.default(()=>structuredClone(defaultPortfolioHeroes['ada-healthcare-wellness'])),
 'fintech-irmp':portfolioHeroSchema.default(()=>structuredClone(defaultPortfolioHeroes['fintech-irmp'])),
 'apple-music':portfolioHeroSchema.default(()=>structuredClone(defaultPortfolioHeroes['apple-music'])),
}).strict().default(()=>structuredClone(defaultPortfolioHeroes) as {shopping:PortfolioHero;returning:PortfolioHero;'event-flow':PortfolioHero;'availity-essentials':PortfolioHero;'oneof-superlogic':PortfolioHero;'ada-healthcare-wellness':PortfolioHero;'fintech-irmp':PortfolioHero;'apple-music':PortfolioHero});
