import { isPortfolioOwner } from '@/lib/editor-owner';
import { editorDocuments, saveDraft } from '@/lib/portfolio-store';
import { contentSchema } from '@/lib/portfolio-content';
export const dynamic='force-dynamic';
export async function GET(){if(!await isPortfolioOwner())return Response.json({error:'Owner access required.'},{status:403});try{return Response.json(await editorDocuments(),{headers:{'Cache-Control':'private, no-store'}});}catch(error){console.error(error);return Response.json({error:'Your draft could not load. Try again.'},{status:503});}}
export async function PUT(request:Request){
 if(!await isPortfolioOwner())return Response.json({error:'Owner access required.'},{status:403});
 if(request.headers.get('origin')!==new URL(request.url).origin)return Response.json({error:'Save from this site.'},{status:403});
 try{if(Number(request.headers.get('content-length'))>250000)return Response.json({error:'This draft is too large.'},{status:413});const body=await request.text();if(body.length>250000)return Response.json({error:'This draft is too large.'},{status:413});const value=JSON.parse(body);const parsed=contentSchema.safeParse(value.content);if(!parsed.success||!Number.isSafeInteger(value.revision)||value.revision<0)return Response.json({error:parsed.success?'Invalid draft revision.':parsed.error.issues[0].message},{status:400});const draft=await saveDraft(parsed.data,value.revision);return Response.json({draft},{headers:{'Cache-Control':'no-store'}});}catch(error){const conflict=error instanceof Error&&error.message==='conflict';if(!conflict)console.error(error);return Response.json({error:conflict?'This draft was updated in another tab. Reload to see the latest version; copy your changes first.':'Your changes could not save. They are still here. Try again.'},{status:conflict?409:503});}
}
