# Terry Germany portfolio — source export and Vercel preparation

Restored project: appgprj_6abff415802c819196a800db664ff60a
Exact saved commit: 36c4deeabd3e1b75248ef66815e9ec950e0c65cb
Prepared October 6, 2026. Nothing was deployed or changed on Sites.

## Contents

- `original-sites/`: complete tracked source at the requested commit, including Vinext/Cloudflare configuration, original package files and lockfile, schema/migrations, assets, fonts, license files, and media in the repository. Git history, dependencies, caches, credentials, and generated builds are omitted.
- `vercel/`: runnable Next.js App Router adaptation. This is the folder to import as the Vercel project root.
- `migration/published-content.json`: the exact bundled default content used when no published database document exists.
- `migration/asset-inventory.json`: file sizes and SHA-256 hashes for all 17 bundled public assets.
- `migration/VERIFICATION.md`: completed checks and remaining verification limits.

## Run locally

Install Node 22.13 or later and pnpm 11.25.0. In `vercel/`:

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm start
```

The public portfolio, work gallery, four case studies, fullscreen viewer, themes, resume, font, and bundled video do not require environment variables. To change bundled content without the editor, edit `lib/portfolio-content.ts` and the related case-study data modules, then rebuild.

## Later Vercel setup (not executed)

Import the `vercel/` folder from your Git repository. Use Next.js as the framework, Node 22 or newer, `pnpm install --frozen-lockfile` for installation, and `pnpm build` for the build command. Let Vercel choose the output directory. The included `vercel.json` specifies the framework and commands.

The public portfolio is accessible without Sites sign-in in this version. If you want restricted visitor access, configure Vercel Deployment Protection before sharing a deployment. Owner editing has separate authentication below.

## Optional editor and media persistence

D1 is replaced by a JSON document at `portfolio/documents.json` in R2. The adapter uses R2's S3 HTTP API with AWS Signature V4 from Node, rather than a Cloudflare Worker binding. There is no additional SDK dependency. Draft saves and publishing use ETag conditional writes, retaining optimistic concurrency protection. Existing R2 media keys and API paths are preserved.

1. Use an R2 bucket you control. If you can access the original media bucket and its S3 credentials, configure that bucket to retain its active hero slots and uploaded media. Otherwise use a new bucket; the bundled media remains available.
2. Create bucket-scoped R2 S3 credentials with Object Read & Write permissions. Copy the HTTPS S3 endpoint from Cloudflare. Do not use a public bucket URL.
3. Copy `.env.example` to `.env.local` for local use, or enter its variables in the Vercel project's environment settings:
   - `R2_ENDPOINT`: e.g. `https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com` (use the endpoint supplied for your jurisdiction).
   - `R2_BUCKET`: actual bucket name, not the old logical `HERO_MEDIA` binding.
   - `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY`: bucket-scoped S3 credentials.
   - `PORTFOLIO_EDITOR_USERNAME`: defaults to `terry`.
   - `PORTFOLIO_EDITOR_PASSWORD`: random password at least 32 characters. Generate one locally with `openssl rand -hex 32`.
4. Start/restart the app and visit `/edit`. The browser's standard username/password prompt protects the editor. The existing editor UI is retained. The APIs also verify the password and mutation origin. Sites identity headers are no longer trusted.
5. Save a draft, preview it, and publish. With no stored documents, the editor starts from the bundled public portfolio. No old D1 records are altered.

Keep all credentials server-side; none use a `NEXT_PUBLIC_` prefix. Without complete storage configuration and a strong password, owner editing remains unavailable and write APIs deny requests.

New media uploads through the existing editor are limited to 4 MiB to fit Vercel Function request-size limits. Previously bundled larger files (including the walkthrough MP4) are static files and still work. Supporting new uploads up to the former 50 MiB limit would require a separate direct-to-storage upload flow.

## Recovery limits

The Sites database inventory reported one `draft` document (revision 1, October 3, 2026) and no `published` document. Its API response truncated the draft content, so this export does not pretend to contain a complete recoverable database draft. The live portfolio uses bundled defaults when no published document exists; those defaults and all source case-study data are included.

Authenticated requests to the live hero-media and editor endpoints returned 403. No callable bucket-list/download tool was available. Additional R2 uploads, active slot metadata, old versions, and orphaned objects could not be enumerated or downloaded. Uploaded media is included only where it was already saved in the source repository. Use the original authenticated Sites editor/account to recover remaining uploads or obtain a full bucket export if available. Do not delete the original Site or storage until that is complete.

Cloudflare/Sites-managed bucket credentials are not in the source and were not retrieved. Connecting the original bucket requires authorized credentials you can obtain; otherwise the adapted portfolio uses the bundled assets.

## References

- Next.js deployment: https://nextjs.org/docs/app/getting-started/deploying
- R2 S3 API compatibility: https://developers.cloudflare.com/r2/api/s3/api/
- R2 S3 credentials: https://developers.cloudflare.com/r2/api/tokens/
