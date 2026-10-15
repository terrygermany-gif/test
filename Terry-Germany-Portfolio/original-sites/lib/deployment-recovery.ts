// Run before hydration so stale tabs can recover if a deployment replaces a
// hashed build asset. Only build-file failures trigger a reload, once per minute.
export const deploymentRecoveryScript=String.raw`(()=>{
 const recover=()=>{
  try{
   const key='tg:build-asset-reload',now=Date.now(),last=Number(sessionStorage.getItem(key)||0);
   if(last&&now-last<60000)return false;
   sessionStorage.setItem(key,String(now));
   window.location.reload();
   return true;
  }catch{return false;}
 };
 const ownBuildAsset=value=>{
  try{const url=new URL(value,window.location.href);return url.origin===window.location.origin&&url.pathname.startsWith('/_next/static/');}catch{return false;}
 };
 window.addEventListener('error',event=>{
  const node=event.target;
  if(node instanceof HTMLScriptElement&&ownBuildAsset(node.src)||node instanceof HTMLLinkElement&&node.rel==='stylesheet'&&ownBuildAsset(node.href))recover();
 },true);
 window.addEventListener('vite:preloadError',event=>{if(recover())event.preventDefault();});
 window.addEventListener('unhandledrejection',event=>{
  const message=typeof event.reason?.message==='string'?event.reason.message:'';
  if(/Failed to fetch dynamically imported module|Importing a module script failed|Failed to load module script|Loading chunk .+ failed|error loading dynamically imported module/i.test(message))recover();
 });
})();`;
