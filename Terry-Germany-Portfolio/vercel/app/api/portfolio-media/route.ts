import { isPortfolioOwner } from '@/lib/editor-owner';
import { mediaBucket, matchesMediaType } from '@/lib/hero-media-store';
import { acceptedMediaTypes, maxMediaBytes } from '@/lib/hero-media';
export async function POST(request:Request){
 if(!await isPortfolioOwner())return Response.json({error:'Owner access required.'},{status:403});
 if(request.headers.get('origin')!==new URL(request.url).origin)return Response.json({error:'Upload from this site.'},{status:403});
 if(Number(request.headers.get('content-length'))>maxMediaBytes)return Response.json({error:'Choose a file under 4 MB.'},{status:413});
 try{const file=await request.blob(),type=request.headers.get('content-type')||'';if(!file.size||file.size>maxMediaBytes||!acceptedMediaTypes.includes(type)||!matchesMediaType(type,new Uint8Array(await file.slice(0,32).arrayBuffer())))return Response.json({error:'Use JPG, PNG, WebP, AVIF, MP4, or WebM under 4 MB.'},{status:415});const id=crypto.randomUUID();await mediaBucket().put(`portfolio/media/${id}`,file.stream(),{httpMetadata:{contentType:type}});return Response.json({src:`/api/portfolio-media/${id}`,type:type.startsWith('video/')?'video':'image'});}catch(error){console.error(error);return Response.json({error:'The upload did not save. Try again.'},{status:503});}
}
