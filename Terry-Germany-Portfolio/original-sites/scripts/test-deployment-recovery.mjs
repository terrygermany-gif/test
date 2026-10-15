import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source=fs.readFileSync('lib/deployment-recovery.ts','utf8');
const script=source.split('String.raw`')[1].split('`;')[0];
function setup({storageAvailable=true}={}){
 const listeners=new Map(),stored=new Map();let reloads=0,now=100000;
 class HTMLScriptElement{constructor(src){this.src=src;}}
 class HTMLLinkElement{constructor(href,rel='stylesheet'){this.href=href;this.rel=rel;}}
 const location={href:'https://portfolio.test/work',origin:'https://portfolio.test',reload(){reloads++;}};
 const sessionStorage={getItem(key){if(!storageAvailable)throw new Error('Storage blocked');return stored.get(key);},setItem(key,value){stored.set(key,value);}};
 vm.runInNewContext(script,{window:{location,addEventListener:(name,handler)=>listeners.set(name,handler)},sessionStorage,HTMLScriptElement,HTMLLinkElement,URL,Date:{now:()=>now}});
 return {emit:(name,event)=>listeners.get(name)?.(event),HTMLScriptElement,HTMLLinkElement,reloads:()=>reloads,advance:()=>{now+=60001;}};
}
const page=setup();
page.emit('error',{target:{src:'https://portfolio.test/work/missing-image.png'}});assert.equal(page.reloads(),0,'Missing images do not reload the page');
page.emit('unhandledrejection',{reason:new Error('Cannot read properties of undefined')});assert.equal(page.reloads(),0,'Application errors are not hidden by automatic reloads');
page.emit('error',{target:new page.HTMLScriptElement('https://other.test/_next/static/chunks/missing.js')});assert.equal(page.reloads(),0,'Third-party errors do not reload the page');
page.emit('error',{target:new page.HTMLLinkElement('/_next/static/chunks/preload.js','modulepreload')});assert.equal(page.reloads(),0,'A failed optional preload does not interrupt navigation');
page.emit('error',{target:new page.HTMLScriptElement('/_next/static/chunks/previous-build.js')});assert.equal(page.reloads(),1,'A missing build script reloads the stale page');
page.emit('error',{target:new page.HTMLLinkElement('/_next/static/css/previous-build.css')});assert.equal(page.reloads(),1,'Multiple missing assets cannot create a reload loop');
page.advance();page.emit('unhandledrejection',{reason:new Error('Failed to fetch dynamically imported module: /_next/static/chunks/old.js')});assert.equal(page.reloads(),2,'A later deployment can recover again');
const vite=setup();let prevented=false;vite.emit('vite:preloadError',{preventDefault(){prevented=true;}});assert.equal(vite.reloads(),1);assert.ok(prevented);
const unavailable=setup({storageAvailable:false});unavailable.emit('error',{target:new unavailable.HTMLScriptElement('/_next/static/chunks/old.js')});assert.equal(unavailable.reloads(),0,'Blocked storage cannot cause an unbounded reload loop');
console.log('PASS: build asset recovery, cooldown, module import failures, and unrelated-error isolation.');
