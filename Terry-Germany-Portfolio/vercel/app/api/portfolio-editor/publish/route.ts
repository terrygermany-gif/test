import { isPortfolioOwner } from '@/lib/editor-owner';
import { publishDraft } from '@/lib/portfolio-store';
export async function POST(request:Request){
 if(!await isPortfolioOwner())return Response.json({error:'Owner access required.'},{status:403});
 if(request.headers.get('origin')!==new URL(request.url).origin)return Response.json({error:'Publish from this site.'},{status:403});
 try{const {revision}=await request.json() as {revision:number};if(!Number.isSafeInteger(revision)||revision<1)return Response.json({error:'Save a draft before publishing.'},{status:400});return Response.json({published:await publishDraft(revision)},{headers:{'Cache-Control':'no-store'}});}catch(error){const conflict=error instanceof Error&&error.message==='conflict';if(!conflict)console.error(error);return Response.json({error:conflict?'The saved draft changed. Reload and preview the latest version before publishing.':'Publishing failed. Your saved draft is safe. Try again.'},{status:conflict?409:503});}
}
