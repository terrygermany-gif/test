# Terry Germany portfolio — Vercel app

This Next.js app includes the portfolio published on October 15, 2026 (Sites version 133, source commit `ab49ee9d91f8b4d2e5350b1a59df45ce7b643a3f`). The latest source pages, themes, responsive navigation, project gallery, and published editable content are included.

## Run

Use Node 22.13 or newer and pnpm 11.25.0 from this directory:

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm start
```

For Vercel, set the project Root Directory to `Terry-Germany-Portfolio/vercel`. Use the Next.js framework preset, `pnpm install --frozen-lockfile`, and `pnpm build`. Let Vercel select the output directory. GitHub changes deploy automatically only when the Vercel project is connected to this repository and production branch.

## Included updates

- All nine portfolio pages and four case studies, including Apple Music, NeuroTrade, and the State Farm Experience.
- Work card headlines follow the detail-page hero title, while company/project names remain visible separately.
- State Farm research examples use tabs with one supporting drawer and responsive numbered strategy cards.
- Dark and light themes, simulator embeds, editable portfolio sections, and portfolio-specific draft previews.
- A current published-content snapshot and all referenced bundled artwork. The recovered uploaded image is stored under `public/work/` so it does not depend on the original Sites media endpoint.

## Updating content

Without storage configuration, the public site reads `lib/published-snapshot.json`. Update that JSON and the relevant data/schema modules, then rebuild. Updating defaults alone does not override this snapshot. Portfolio Work card headlines follow `portfolioHeroes[projectId].title`; case-study headlines follow `studies[slug].project.title`.

For the owner editor, configure these server-only environment variables in Vercel or a local `.env.local` file:

- `R2_ENDPOINT`: your HTTPS Cloudflare R2 S3 endpoint.
- `R2_BUCKET`: the actual bucket name.
- `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY`: bucket-scoped object read/write credentials.
- `PORTFOLIO_EDITOR_USERNAME`: optional; defaults to `terry`.
- `PORTFOLIO_EDITOR_PASSWORD`: a random password of at least 32 characters.

Visit `/edit` and use the browser's username/password prompt. Save, preview, and publish through the editor. The first saved draft starts from the included publication; existing R2 documents take precedence and are preserved. Draft and published documents use `portfolio/documents.json` with conditional writes to protect against conflicting edits. New media uploads are limited to 4 MiB for the Vercel function request limit.

The editor denies access until storage and a strong password are configured. No Sites identity headers, private credentials, or Cloudflare Worker bindings are required by this Vercel app.

The ChatGPT-hosted site and this GitHub app are separate publications. Changes to one do not automatically synchronize with the other.
