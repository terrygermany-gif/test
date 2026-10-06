import { r2Request, storageConfigured } from './r2-bucket';
import { applyStateFarmEvidenceUpdate } from './state-farm-evidence-update';
import { applyStateFarmCopyUpdate } from './state-farm-copy-update';
import { contentSchema, defaultContent, type PortfolioContent } from './portfolio-content';
export type StoredDocument={content:PortfolioContent;revision:number;updatedAt:string|null};
type Documents={draft?:StoredDocument;published?:StoredDocument};
const key='portfolio/documents.json';
const fallback=():StoredDocument=>({content:defaultContent,revision:0,updatedAt:null});
const normalize=(doc:StoredDocument):StoredDocument=>({...doc,content:applyStateFarmEvidenceUpdate(applyStateFarmCopyUpdate(contentSchema.parse(doc.content)))});
async function documents() {
 if(!storageConfigured())return {data:{} as Documents,etag:undefined};
 const result=await r2Request('GET',key);
 if(result.status===404)return {data:{} as Documents,etag:undefined};
 return {data:await result.json() as Documents,etag:result.headers.get('etag')??undefined};
}
async function writeDocuments(data:Documents,etag?:string){
 await r2Request('PUT',key,Buffer.from(JSON.stringify(data)),{'content-type':'application/json',...(etag?{'if-match':etag}:{'if-none-match':'*'})});
}
export async function readDocument(name:'draft'|'published'):Promise<StoredDocument>{const {data}=await documents();return data[name]?normalize(data[name]):fallback();}
export async function readPublished(){try{return await readDocument('published');}catch(error){console.error('Portfolio read failed',error);return fallback();}}
export async function editorDocuments(){const {data}=await documents();const published=data.published?normalize(data.published):fallback();const draft=data.draft?normalize(data.draft):{...fallback(),content:published.content};return {draft,published};}
export async function saveDraft(content:PortfolioContent,revision:number){const {data,etag}=await documents();if((data.draft?.revision??0)!==revision)throw new Error('conflict');const draft={content:contentSchema.parse(content),revision:revision+1,updatedAt:new Date().toISOString()};await writeDocuments({...data,draft},etag);return draft;}
export async function publishDraft(revision:number){const {data,etag}=await documents();if(!data.draft||data.draft.revision!==revision)throw new Error('conflict');const published={...data.draft,updatedAt:new Date().toISOString()};await writeDocuments({...data,published},etag);return normalize(published);}
