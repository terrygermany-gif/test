"use client";
import {useId,useRef,useState,type KeyboardEvent} from 'react';
import Link from 'next/link';
import {ArrowDown,ArrowUpRight} from 'lucide-react';
import type {StateFarmResearchStrategy as ResearchStrategy} from '@/lib/state-farm-research-strategy';

export default function StateFarmResearchStrategy({value,headingId}:{value:ResearchStrategy;headingId:string}){
 const id=useId(),[selected,setSelected]=useState(0),tabs=useRef<(HTMLButtonElement|null)[]>([]);
 function navigate(event:KeyboardEvent<HTMLButtonElement>,index:number){
  let next:number;
  switch(event.key){
   case 'ArrowRight':next=(index+1)%value.applications.length;break;
   case 'ArrowLeft':next=(index-1+value.applications.length)%value.applications.length;break;
   case 'Home':next=0;break;
   case 'End':next=value.applications.length-1;break;
   default:return;
  }
  event.preventDefault();setSelected(next);tabs.current[next]?.focus();
 }
 return <section className="availity-section apple-music-research sf-research-strategy" id="sf-returning-research" tabIndex={-1} aria-labelledby={headingId}>
  <p className="availity-eyebrow">04 / RESEARCH &amp; EXPERIENCE PRINCIPLES</p><h2 id={headingId}>{value.title}</h2>
  <p className="sf-research-intro">{value.intro}</p>
  <div className="sf-research-explorer">
   <div className="sf-research-tabs" role="tablist" aria-label="Research-to-design examples">{value.applications.map((item,i)=><button key={i} ref={node=>{tabs.current[i]=node;}} type="button" role="tab" id={id+'-tab-'+i} aria-controls={id+'-panel-'+i} aria-selected={selected===i} tabIndex={selected===i?0:-1} onClick={()=>setSelected(i)} onKeyDown={event=>navigate(event,i)}><span aria-hidden="true">{String(i+1).padStart(2,'0')}</span>{item.title}</button>)}</div>
   {value.applications.map((item,i)=><div className="sf-research-panel" key={i} role="tabpanel" id={id+'-panel-'+i} aria-labelledby={id+'-tab-'+i} hidden={selected!==i} tabIndex={0}>
    <p className="sf-research-example-label">Research to design · {String(i+1).padStart(2,'0')} / {String(value.applications.length).padStart(2,'0')}</p>
    <h3>{item.title}</h3>
    <dl><div><dt>Design question</dt><dd>{item.question}</dd></div><div><dt>Guiding principle</dt><dd>{item.principle}</dd></div><div><dt>Prototype choice</dt><dd>{item.change}</dd></div></dl>
    <p className="sf-research-validation"><strong>Validation context</strong>{item.validation}</p>
    <a className="sf-research-link" href={i===0?'#sf-returning-workflow':'#sf-returning-decisions'}>{i===0?'Explore the continuation journey':'Explore the design decisions'}<ArrowUpRight size={14} aria-hidden="true"/></a>
   </div>)}
  </div>
  <details className="sf-research-support"><summary><span>Research approach &amp; supporting evidence<small>{value.focus.length} focus areas · {value.principles.length} principles</small></span><ArrowDown size={16} aria-hidden="true"/></summary>
   <div className="sf-research-support-body"><p>{value.translation}</p>
    <div className="sf-research-support-group"><h3>Research Focus</h3><ol className="sf-research-note-grid">{value.focus.map((item,i)=><li key={i}><h4><span>{String(i+1).padStart(2,'0')}</span>{item.title}</h4><p>{item.description}</p></li>)}</ol></div>
    <div className="sf-research-support-group"><h3>Documented Evidence</h3>{value.evidence.map((item,i)=><div className="sf-research-record" key={i}><span>{item.label}</span><h4>{item.title}</h4><p>{item.description}</p></div>)}<p className="sf-research-context">{value.contextNote}</p><Link className="sf-research-link" href="/work/digital-assistance">Explore the full research context<ArrowUpRight size={14} aria-hidden="true"/></Link></div>
    <div className="sf-research-support-group"><h3>Experience Principles</h3><ol className="sf-research-note-grid">{value.principles.map((item,i)=><li key={i}><h4><span>{String(i+1).padStart(2,'0')}</span>{item.title}</h4><p>{item.description}</p></li>)}</ol></div>
    <div className="sf-research-support-group"><h3>From research evidence to experience strategy</h3><ol className="sf-research-method">{value.process.map((step,i)=><li key={i}><span className="sf-research-method-number" aria-hidden="true">{String(i+1).padStart(2,'0')}</span><h4>{step.title}</h4><p>{step.description}</p></li>)}</ol></div>
    <div className="sf-research-support-group"><h3>Strategic Outcome</h3><p>{value.strategicOutcome}</p></div>
   </div>
  </details>
  <div className="sf-research-leadership"><h3>{value.leadershipTitle}</h3><p>{value.leadershipStatement}</p></div>
 </section>;
}
