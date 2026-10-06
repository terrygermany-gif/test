# Terry Germany — Portfolio Intelligence

A standalone portfolio project with cinematic presentation, visitor-specific recommendations, curated topic exploration, four project stories, and a guided briefing builder.

## Current implementation

- React + TypeScript, Next.js App Router conventions, running through Vinext/Vite on Cloudflare Workers.
- Shared visual tokens and responsive layouts in `app/globals.css`.
- Project knowledge and recommendation logic in `lib/portfolio.ts`.
- Interactive homepage and five-step briefing in `components/portfolio.tsx`.
- Project routes in `app/work/[slug]/page.tsx`.
- A feature-detected WebMCP tool uses the same briefing action as the UI.
- Existing September 29 resume in `public/Terry-Germany-Resume.pdf`.

The portfolio guide uses deterministic topic matching against curated content. It does not call an LLM, use a vector database, or send visitor questions to an external service. Visitor choices remain in page memory. The briefing download is a local text file.

## Development

The sun/moon button in the shared header switches between dark and light appearances. Dark is the first-visit default. The chosen appearance is saved as a device preference and follows the visitor across project pages and reloads. Light mode uses white surfaces, dark text, and violet accents across the homepage, case studies, guide, briefing, and media editor; uploaded media keeps its original colors.

Use the project-selected pnpm and existing lockfile. In the managed environment, start preview with `sites-preview start "$PWD"`. Run `node node_modules/typescript/bin/tsc --noEmit` for type checks. Use the Sites build helper for a production build.

## Next phase

1. Review project wording and resume for the public portfolio; add approved imagery and deeper case-study evidence.
2. Add a server-only OpenAI connection with scoped retrieval, source references, bounded requests, and a useful fallback. Never place an API key in client code. Connect an approved secret before enabling live AI.
3. Refine the guided narrative around confirmed outcomes and approved artifacts.
4. Keep owner-only access until Terry requests sharing or public launch.

The abstract hero artwork is a design metaphor, not a company artifact. The overview diagrams communicate interaction concepts and are not product screenshots.

## Hero media

The default hero uses a beehiiv-inspired editorial layout: a bold, four-line headline on the left, layered project visuals on the right, and a compact company-experience row below. The headline reads “Human insight. AI strategy. Product design. Better products.” The introduction identifies Terry's role and links to selected work and the resume. A State Farm assistant phone sits in front of two quietly drifting previews; the phone and caption link to the State Farm case study. Existing editorial product screens and an event journey map fill the supporting previews. Smaller screens stack the introduction above the visuals. Both themes remain available. The original hero is available at `/?hero=original` and tagged `hero-original-2026-10-02`.

Use the image icon in the lower right of the hero to replace the center phone, left/right previews, or their optional alternates with JPG, PNG, WebP, AVIF, MP4, or WebM files up to 50 MB. The original five slot IDs are preserved, so previous uploads still work. Distinct alternate media crossfades every 16 seconds inside the same two frames. Uploads and active slot manifests persist in the platform R2 binding `HERO_MEDIA`. Versioned media URLs support byte ranges for video playback. Resetting a slot restores its original media without deleting previous versioned uploads. The current owner-only Site audience gates this editor and its routes.

Muted videos loop while the hero is visible. The pause icon stops drift, alternate changes, and videos; reduced-motion preferences, hidden tabs, and the media editor also stop playback. Inactive alternate videos stay paused. The State Farm prototype remains in the center until a new file is added.

The project gallery, filters, portfolio guide, case studies, briefing, and downloads are unchanged.
## Proof of Thinking case studies

All four project cards and portfolio project links open an immersive viewer on desktop (1024px and wider). The portfolio stays beneath a softly blurred backdrop. Close, All Work, Terry Germany, Escape, and browser Back return to the portfolio; the viewer restores its original scroll and focus. Previous/Next switches projects inside the viewer. Native history calls deliberately avoid replacing the underlying portfolio through the app router. Browser Forward may open the standalone project route.

Each existing `/work/[slug]` URL renders the same content directly and survives refresh. Tablets and phones use the normal document-scrolling route, with a sticky All Work control and horizontal section navigation. Resizing an open desktop viewer below 1024px converts to the standalone project page.

Content comes from `lib/portfolio.ts` and `lib/project-proof.ts`. The shared presentation is in `components/project-study.tsx`, with viewer lifecycle in `components/case-study-viewer.tsx`. Sticky section buttons track scrolling. Nine evidence categories open nested accessible dialogs; Escape closes evidence before the project. Decision options, a documented-choice reveal, and seven collaboration relationships are interactive. Impact cards distinguish Measured, Projected, Target, and Directional, with no invented launch measurement or calculator. Abstract Apple and systems visuals are clearly labeled as concepts.

The embedded project guide offers seven curated questions with answers drawn from project notes and links to relevant sections/evidence. It does not call live AI or transmit questions externally. Failed concepts, interviews, test findings, unprovided partnerships, and impact measurements are explicitly pending. Illustrative decision alternatives are labeled rather than presented as actually tested concepts.

Replace approved evidence and prototype data in `lib/project-proof.ts`; State Farm's three media slots remain configurable in `lib/state-farm-media.ts`. Set `src` to a public asset path and choose `image` or `video`; videos support `poster` and captions. Supplied State Farm and Upgather artifacts remain separate from conceptual imagery and unverified outcomes. Apple proprietary screens and internal findings are not reproduced.

### Competitive Intelligence + Engagement Strategy

All four case studies include this module between research and decisions, with a Strategy navigation chip and a matching project-guide prompt. Project-specific comparison questions, engagement directions, an opportunity to test, and proposed validation signals live in `lib/project-strategy.ts`. Competitive evidence opens in the existing nested overlay. No named competitor assessment, completed audit, or engagement uplift is claimed: benchmark sources and observed results are pending. Replace this framing with approved findings and artifacts as they become available.

### State Farm AI Maturity Model

The State Farm case study includes an interactive maturity module near the start, a Maturity section chip, a model-context evidence card, and a project-guide prompt. Three accessible tabs show Level 1 Assisted Automation, Level 2 Context-Aware AI, and Level 3 Predictive AI Companion. The labels and progression come from Terry’s supplied insurance-experience board screenshot and his account of implementing the framework with Product and Engineering. This condenses the insurance model; it does not merge the board’s separate 0–7 customer-experience scale. Customer examples and team-focus explanations are illustrative and do not assert universal production delivery or measured enterprise-wide maturity. Data lives in `lib/state-farm-maturity.ts`; the shared module is `components/state-farm-maturity.tsx`.

## Focused portfolio
The homepage now contains the existing media hero, selected work, and a concise About with resume/contact links. Briefing, audience selectors, filters, and static question tools have been removed. Case studies use Overview, Evidence, Research, Strategy, Design decisions, and Outcomes; State Farm also retains the interactive AI Maturity Model. Only available artifacts and substantive summaries appear in the evidence grid. Media with null sources is retained in the source catalog but omitted from the published view. Collaboration is summarized in the overview, decisions are visible without a reveal interaction, and quantitative targets remain distinct from measured outcomes.
