"use client";
import {useEffect,useRef} from 'react';

const viewportWidth=1440;

export default function StateFarmDesktopDisplay({src}:{src:string}){
 const screenRef=useRef<HTMLDivElement|null>(null);
 useEffect(()=>{
  const screen=screenRef.current;if(!screen)return;
  const fit=()=>{
   if(screen.clientWidth>0)screen.style.setProperty('--sf-display-scale',String(screen.clientWidth/viewportWidth));
  };
  fit();
  if(typeof ResizeObserver==='undefined'){
   window.addEventListener('resize',fit);
   return ()=>window.removeEventListener('resize',fit);
  }
  const observer=new ResizeObserver(fit);observer.observe(screen);
  return ()=>observer.disconnect();
 },[]);
 return <div className="sf-desktop-display">
  <div className="sf-desktop-bezel"><span className="sf-desktop-camera" aria-hidden="true"/><div className="sf-desktop-screen" ref={screenRef}><iframe key={src} src={src} title="State Farm returning-customer simulator" loading="eager" allow="fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/></div></div>
  <div className="sf-desktop-chin" aria-hidden="true"/>
  <div className="sf-desktop-stand" aria-hidden="true"><span/><i/></div>
 </div>;
}
