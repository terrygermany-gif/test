"use client";
import {useEffect,useRef,useState} from 'react';
import {activeSectionAtReadingLine} from '@/lib/apple-music-navigation';

const appleSections=[
 {id:'apple-music-decisions',label:'Design decisions'},
 {id:'apple-music-role',label:'My role & scope'},
 {id:'apple-music-workflow',label:'Design system & workflow'},
 {id:'apple-music-research',label:'Research & flows'}
];

export default function AppleMusicSectionNav({sections=appleSections,projectName='Apple Music'}:{sections?:readonly {id:string;label:string}[];projectName?:string}){
 const navRef=useRef<HTMLElement|null>(null),listRef=useRef<HTMLUListElement|null>(null);
 const [active,setActive]=useState(sections[0].id);

 useEffect(()=>{
  const nav=navRef.current,article=nav?.closest<HTMLElement>('.apple-music-portfolio');
  if(!nav||!article)return;
  const scroller=article.closest<HTMLElement>('.portfolio-viewer');
  const scrollTarget=scroller??window;
  const targets=sections.map(section=>article.querySelector<HTMLElement>('#'+section.id));
  let frame=0;
  function update(){
   frame=0;
   if(!nav||!article)return;
   const height=nav.getBoundingClientRect().height;
   const heightValue=height+'px';
   if(article.style.getPropertyValue('--apple-nav-height')!==heightValue)article.style.setProperty('--apple-nav-height',heightValue);
   const scrollPadding=Number.parseFloat(window.getComputedStyle(scroller??document.documentElement).scrollPaddingTop)||0;
   const readingLine=(scroller?.getBoundingClientRect().top??0)+height+24+scrollPadding+1;
   const positions=targets.flatMap((target,i)=>target?[{id:sections[i].id,top:target.getBoundingClientRect().top}]:[]);
   const atEnd=scroller?scroller.scrollTop+scroller.clientHeight>=scroller.scrollHeight-8:window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-8;
   const next=activeSectionAtReadingLine(positions,readingLine,atEnd)??sections[0].id;
   setActive(current=>current===next?current:next);
  }
  function schedule(){if(!frame)frame=window.requestAnimationFrame(update);}
  scrollTarget.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule);
  const observer=typeof ResizeObserver==='undefined'?null:new ResizeObserver(schedule);
  observer?.observe(nav);observer?.observe(article);
  schedule();
  return ()=>{scrollTarget.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);observer?.disconnect();window.cancelAnimationFrame(frame);article.style.removeProperty('--apple-nav-height');};
 },[sections]);

 useEffect(()=>{
  const list=listRef.current,link=list?.querySelector<HTMLElement>('[aria-current="location"]');
  if(!list||!link)return;
  const bounds=list.getBoundingClientRect(),item=link.getBoundingClientRect();
  if(item.left<bounds.left)list.scrollLeft-=bounds.left-item.left+8;
  else if(item.right>bounds.right)list.scrollLeft+=item.right-bounds.right+8;
 },[active]);

 return <nav ref={navRef} className="apple-music-section-nav" aria-label={projectName+" project sections"}>
  <div className="apple-music-nav-label"><span>{projectName}</span><strong>On this page</strong></div>
  <ul ref={listRef}>{sections.map((section,i)=><li key={section.id}><a href={'#'+section.id} aria-current={active===section.id?'location':undefined}><span aria-hidden="true">{String(i+1).padStart(2,'0')}</span>{section.label}</a></li>)}</ul>
 </nav>;
}
