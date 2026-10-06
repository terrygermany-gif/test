import { env } from 'cloudflare:workers';
import { applyStateFarmEvidenceUpdate } from './state-farm-evidence-update';
import { applyStateFarmCopyUpdate } from './state-farm-copy-update';
import { contentSchema, defaultContent, type PortfolioContent } from './portfolio-content';
export function portfolioDb():D1Database { const db=(env as unknown as {DB?:D1Database}).DB;if(!db)throw new Error('Portfolio storage is unavailable.');return db; }
export type StoredDocument={content:PortfolioContent;revision:number;updatedAt:string|null};
export async function readDocument(name:'draft'|'published'):Promise<StoredDocument>{
 const row=await portfolioDb().prepare('SELECT content, revision, updated_at FROM portfolio_documents WHERE name = ?').bind(name).first<{content:string;revision:number;updated_at:string}>();
 return row?{content:applyStateFarmEvidenceUpdate(applyStateFarmCopyUpdate(contentSchema.parse(JSON.parse(row.content)))),revision:row.revision,updatedAt:row.updated_at}:{content:defaultContent,revision:0,updatedAt:null};
}
export async function readPublished(){try{return await readDocument('published');}catch(error){console.error('Portfolio read failed',error);return {content:defaultContent,revision:0,updatedAt:null};}}
export async function editorDocuments(){const published=await readDocument('published');const draft=await readDocument('draft');return {draft:draft.revision?draft:{...draft,content:published.content},published};}
export async function saveDraft(content:PortfolioContent,revision:number){
 const now=new Date().toISOString();const result=await portfolioDb().prepare(`INSERT INTO portfolio_documents (name, content, revision, updated_at) SELECT 'draft', ?, 1, ? WHERE ? = 0 OR EXISTS (SELECT 1 FROM portfolio_documents WHERE name = 'draft' AND revision = ?) ON CONFLICT(name) DO UPDATE SET content = excluded.content, revision = portfolio_documents.revision + 1, updated_at = excluded.updated_at WHERE portfolio_documents.revision = ?`).bind(JSON.stringify(content),now,revision,revision,revision).run();
 if(!result.meta.changes)throw new Error('conflict');return {content,revision:revision+1,updatedAt:now};
}
export async function publishDraft(revision:number){
 const result=await portfolioDb().prepare(`INSERT INTO portfolio_documents (name, content, revision, updated_at) SELECT 'published', content, revision, ? FROM portfolio_documents WHERE name = 'draft' AND revision = ? ON CONFLICT(name) DO UPDATE SET content = excluded.content, revision = excluded.revision, updated_at = excluded.updated_at`).bind(new Date().toISOString(),revision).run();
 if(!result.meta.changes)throw new Error('conflict');return readDocument('published');
}
