// Exercises the built Worker with isolated local D1/R2 storage.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const packageDir=fs.readdirSync('node_modules/.pnpm').find(n=>n.startsWith('miniflare@'));
const {Miniflare,Log,LogLevel}=await import(path.resolve('node_modules/.pnpm',packageDir,'node_modules/miniflare/dist/src/index.js'));
const ownerEmail=JSON.parse(fs.readFileSync('lib/editor-owner.ts','utf8').match(/const ownerEmail = (.*);/)[1]);
const serverRoot=path.resolve('dist/server');
const moduleFiles=['index.js',...fs.readdirSync(serverRoot,{recursive:true}).filter(n=>n.endsWith('.js')&&n!=='index.js')];
const mf=new Miniflare({name:'portfolio-qa',modules:moduleFiles.map(file=>({type:'ESModule',path:path.join(serverRoot,file)})),modulesRoot:serverRoot,compatibilityDate:'2026-05-15',compatibilityFlags:['nodejs_compat'],d1Databases:['DB'],r2Buckets:['HERO_MEDIA'],assets:{directory:path.resolve('dist/client'),binding:'ASSETS',routerConfig:{invoke_user_worker_ahead_of_assets:true,has_user_worker:true}},log:new Log(LogLevel.ERROR)});
const origin='https://portfolio.test';
async function request(route,{owner=true,identity,method='GET',body,type}={}){const headers={};if(owner){headers['oai-authenticated-user-id']='isolated-qa-owner';headers['oai-authenticated-user-email']=identity||ownerEmail;}if(method!=='GET')headers.origin=origin;if(body)headers['content-type']=type||'application/json';return mf.dispatchFetch(origin+route,{redirect:'manual',method,headers,body:body?typeof body==='string'||body instanceof Uint8Array?body:JSON.stringify(body):undefined});}
const json=async r=>{assert.equal(r.status,200,await r.clone().text());return r.json();};
try{
 const db=await mf.getD1Database('DB');await db.exec(fs.readFileSync('drizzle/0000_glamorous_mephistopheles.sql','utf8').replace(/\s+/g,' '));
 const denied=await request('/api/portfolio-editor',{owner:false});assert.equal(denied.status,403,(await denied.text()).slice(0,2000));
 assert.equal((await request('/api/portfolio-editor',{identity:'other@example.test'})).status,403);
 assert.equal((await request('/api/portfolio-editor',{owner:false,method:'PUT',body:{}})).status,403);
 assert.equal((await request('/api/portfolio-editor/publish',{owner:false,method:'POST',body:{revision:1}})).status,403);
 assert.equal((await request('/api/portfolio-media',{owner:false,method:'POST',body:new Uint8Array([1]),type:'image/png'})).status,403);
 const {draft}=await json(await request('/api/portfolio-editor'));const content=structuredClone(draft.content);
 assert.ok(draft.content.studies['digital-assistance'].scope.includes('25+ multidisciplinary'));
 assert.ok(draft.content.studies['digital-assistance'].researchIntro.includes('embedded research in product strategy'));
 assert.ok(draft.content.studies['digital-assistance'].project.contribution[1].includes('SmartQuote'));
 // Older saved documents receive the new editorial copy without losing owner edits.
 const updateSource=fs.readFileSync('lib/state-farm-copy-update.ts','utf8');
 const previousCopy=JSON.parse(updateSource.split('const previousCopy = ')[1].split(';\nexport const stateFarmCopy')[0]);
 const legacy=structuredClone(draft.content);delete legacy.stateFarmCopyVersion;
 legacy.studies['digital-assistance']={...legacy.studies['digital-assistance'],...previousCopy};
 legacy.studies['digital-assistance'].project.title='Owner edited State Farm title';
 legacy.studies['digital-assistance'].media[0].caption='Owner edited media caption';
 legacy.studies['digital-assistance'].sectionOrder=['strategy','research','maturity','evidence','decisions','impact'];
 legacy.home.heroDescription='Owner edited homepage';
 for(const name of ['draft','published'])await db.prepare('INSERT INTO portfolio_documents (name, content, revision, updated_at) VALUES (?, ?, ?, ?)').bind(name,JSON.stringify(legacy),4,new Date().toISOString()).run();
 const upgraded=await json(await request('/api/portfolio-editor'));
 for(const name of ['draft','published']){
  assert.equal(upgraded[name].revision,4);
  assert.equal(upgraded[name].content.stateFarmCopyVersion,1);
  assert.equal(upgraded[name].content.studies['digital-assistance'].project.title,'Owner edited State Farm title');
  assert.equal(upgraded[name].content.studies['digital-assistance'].media[0].caption,'Owner edited media caption');
  assert.equal(upgraded[name].content.home.heroDescription,'Owner edited homepage');
  assert.equal(upgraded[name].content.studies['digital-assistance'].sectionOrder[0],'strategy');
  assert.ok(upgraded[name].content.studies['digital-assistance'].scope.includes('25+ multidisciplinary'));
  assert.ok(upgraded[name].content.studies['digital-assistance'].project.contribution[0].includes('Led 25+ specialists'));
 }
 const upgradedHtml=await (await request('/work/digital-assistance',{owner:false})).text();
 assert.ok(upgradedHtml.includes('Owner edited State Farm title'));
 assert.ok(upgradedHtml.includes('25+ multidisciplinary team members'));
 const persisted=await json(await request('/api/portfolio-editor',{method:'PUT',body:{content:upgraded.draft.content,revision:4}}));
 assert.equal(persisted.draft.revision,5);
 assert.equal(JSON.parse((await db.prepare("SELECT content FROM portfolio_documents WHERE name = 'draft'").first()).content).stateFarmCopyVersion,1);
 for(const name of ['draft','published'])await db.prepare('DELETE FROM portfolio_documents WHERE name = ?').bind(name).run();
 assert.equal(content.studies['digital-assistance'].media.length,1,'Existing State Farm prototype is retained');
 content.home.heroLines[0]='QA draft headline';content.studies['digital-assistance'].project.title='QA State Farm title';content.studies['digital-assistance'].sectionOrder=['strategy','research','maturity','evidence','decisions','impact'];
 const image=new Uint8Array(fs.readFileSync('public/work/event-flow.png'));
 const uploaded=await json(await request('/api/portfolio-media',{method:'POST',body:image,type:'image/png'}));content.studies['digital-assistance'].media.push({...uploaded,title:'QA uploaded artifact',caption:'QA caption'});
 assert.equal((await request(uploaded.src,{owner:false})).status,404,'Draft upload is owner-only');
 assert.equal((await request(uploaded.src)).status,200);
 assert.equal((await request('/api/portfolio-media',{method:'POST',body:new Uint8Array([1,2,3]),type:'image/png'})).status,415);
 const saved=await json(await request('/api/portfolio-editor',{method:'PUT',body:{content,revision:0}}));assert.equal(saved.draft.revision,1);
 assert.equal((await request('/api/portfolio-editor',{method:'PUT',body:{content,revision:0}})).status,409,'Stale saves cannot overwrite a newer draft');
 const liveBefore=await (await request('/',{owner:false})).text();assert.ok(!liveBefore.includes('QA draft headline'),'Saving a draft leaves homepage unchanged');
 const liveCaseBefore=await (await request('/work/digital-assistance',{owner:false})).text();assert.ok(!liveCaseBefore.includes('QA State Farm title'));
 const preview=await request('/edit/preview?project=digital-assistance');assert.equal(preview.status,200);const previewHtml=await preview.text();assert.ok(previewHtml.includes('QA State Farm title'));assert.ok(previewHtml.includes('QA uploaded artifact'));
 assert.ok(previewHtml.indexOf('<section id="digital-assistance-strategy"')<previewHtml.indexOf('<section id="digital-assistance-maturity"'),'Preview uses edited section order');
 assert.equal((await request('/edit/preview',{owner:false})).status,307);
 const editedAgain=await json(await request('/api/portfolio-editor',{method:'PUT',body:{content,revision:1}}));assert.equal(editedAgain.draft.revision,2);
 assert.equal((await request('/api/portfolio-editor/publish',{method:'POST',body:{revision:1}})).status,409);
 await json(await request('/api/portfolio-editor/publish',{method:'POST',body:{revision:2}}));
 const liveAfter=await (await request('/',{owner:false})).text();assert.ok(liveAfter.includes('QA draft headline'),'Publish updates homepage');
 const caseAfter=await (await request('/work/digital-assistance',{owner:false})).text();assert.ok(caseAfter.includes('QA State Farm title'),'Publish updates case study');assert.ok(caseAfter.includes('QA uploaded artifact'));assert.ok(!liveAfter.includes('Edit Portfolio'),'Visitors cannot see owner editor link');
 assert.equal((await request(uploaded.src,{owner:false})).status,200,'Published media is available to portfolio visitors');
 const ranged=await request(uploaded.src,{owner:false});assert.equal(ranged.headers.get('content-type'),'image/png');
 const editor=await request('/edit');assert.equal(editor.status,200);assert.ok((await editor.text()).includes('Save draft'));
 console.log('PASS: owner authorization, draft isolation, existing media, upload validation, private preview, ordering, stale-write protection, explicit publishing, published media, editor rendering, State Farm copy update, preservation of existing draft and published edits.');
}finally{await mf.dispose();}
