// Exercise the built Next.js app locally, without production credentials or storage.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import net from 'node:net';
import {spawn} from 'node:child_process';
const snapshot=JSON.parse(fs.readFileSync('lib/published-snapshot.json','utf8'));
const socket=net.createServer();await new Promise(resolve=>socket.listen(0,'127.0.0.1',resolve));const port=socket.address().port;await new Promise(resolve=>socket.close(resolve));
const env={...process.env,NEXT_TELEMETRY_DISABLED:'1'};for(const key of Object.keys(env))if(key.startsWith('R2_')||key.startsWith('PORTFOLIO_EDITOR_'))delete env[key];
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',String(port)],{env,stdio:['ignore','pipe','pipe']});let logs='';server.stdout.on('data',v=>logs+=v);server.stderr.on('data',v=>logs+=v);
const origin=`http://127.0.0.1:${port}`;const text=html=>html.replace(/<[^>]+>/g,'').replaceAll('&amp;','&').replaceAll('&#x27;',"'").replaceAll('&quot;','"').replace(/\s+/g,' ').trim();
async function get(route){const res=await fetch(origin+route);assert.equal(res.status,200,route+' loads');return res.text();}
try{
 let ready=false;for(let i=0;i<150;i++){if(server.exitCode!==null)throw new Error(logs);try{const r=await fetch(origin+'/api/hero-media');if(r.ok){ready=true;break;}}catch{}await new Promise(resolve=>setTimeout(resolve,100));}assert.ok(ready,'Production server started');
 const home=await get('/');assert.ok(home.includes('id="about"'),'About section remains available');
 const gallery=await get('/work');let cards=0;
 for(const [id,hero] of Object.entries(snapshot.portfolioHeroes)){
  const html=await get('/portfolio/'+id);const h1=html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1];assert.ok(h1,'Portfolio heading exists: '+id);assert.ok(text(h1).length>0);if(id==='event-flow')assert.ok(html.includes('src="/work/upgather-figma/hero.png"'),'Upgather keeps its current Figma cover');
  const card=gallery.match(new RegExp('<a[^>]*href="/portfolio/'+id+'"[^>]*>[\\s\\S]*?</a>'))?.[0];assert.ok(card);assert.equal(text(card.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)[1]),text(h1));cards++;
 }
 for(const [slug,study] of Object.entries(snapshot.studies)){
  const html=await get('/work/'+slug);assert.equal(text(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]),study.project.title);
  const card=gallery.match(new RegExp('<a[^>]*href="/work/'+slug+'"[^>]*>[\\s\\S]*?</a>'))?.[0];assert.ok(card);assert.equal(text(card.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)[1]),study.project.title);assert.ok(text(card).includes(study.project.company));cards++;
 }
 assert.ok((await get('/portfolio/returning')).includes('State Farm Experience'));
 const assets=new Set();function scan(v){if(typeof v==='string'&&v.startsWith('/work/'))assets.add(v);else if(v&&typeof v==='object')Object.values(v).forEach(scan);}scan(snapshot);
 for(const src of assets){assert.ok(fs.existsSync(path.join('public',src)),src+' is bundled');const res=await fetch(origin+src,{method:'HEAD'});assert.equal(res.status,200,src+' is served');}
 for(const route of ['/api/portfolio-editor','/api/portfolio-editor/publish','/api/portfolio-media']){const res=await fetch(origin+route,{method:route==='/api/portfolio-editor'?'GET':'POST'});assert.equal(res.status,403,'Owner write access stays protected: '+route);}
 assert.equal((await fetch(origin+'/edit')).status,503,'Editor fails closed without configuration');
 assert.equal((await fetch(origin+'/api/portfolio-media/00000000-0000-4000-8000-000000000000')).status,404,'Unpublished media is not exposed');
 assert.ok(!logs.includes('Portfolio read failed'),'Snapshot is valid and loads without storage');
 console.log(`PASS: homepage, ${cards} portfolio/case-study pages and matching cards, ${assets.size} bundled media references, and owner access gates.`);
}finally{server.kill('SIGTERM');await new Promise(resolve=>{server.once('exit',resolve);setTimeout(()=>{server.kill('SIGKILL');resolve();},3000).unref();});}
