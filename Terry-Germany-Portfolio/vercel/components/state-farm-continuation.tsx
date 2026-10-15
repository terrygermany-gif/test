import {ArrowDown,ArrowRight} from 'lucide-react';
import type {StateFarmReturning} from '@/lib/state-farm-returning';

export default function StateFarmContinuation({value,headingId}:{value:StateFarmReturning['continuation'];headingId:string}){
 return <section className="availity-section apple-music-workflow sf-continuation" id="sf-returning-workflow" tabIndex={-1} aria-labelledby={headingId}>
  <p className="availity-eyebrow">03 / QUOTE CONTINUATION</p><h2 id={headingId}>{value.title}</h2>
  <div className="sf-continuation-intro"><p>{value.intro}</p><p>{value.rationale}</p></div>
  <div className="sf-continuation-reasoning">
   <div><span className="sf-continuation-phase">Before</span><h3>The Problem</h3><p>{value.problem}</p></div>
   <div><span className="sf-continuation-phase">Design Decision</span><h3>Key Design Decisions</h3><ul role="list">{value.decisions.map((decision,i)=><li key={i}><strong>{decision.title}</strong> {decision.description}</li>)}</ul></div>
  </div>
  <div className="sf-continuation-prototype"><span className="sf-continuation-phase">Prototype</span><h3>The Experience</h3><p>{value.experienceIntro}</p>
   <figure><figcaption>Returning-customer experience architecture</figcaption><ol className="sf-continuation-stages" aria-label="Returning-customer journey">
    {value.stages.map((stage,i)=><li key={i}><details><summary><span className="sf-continuation-stage-number">{String(i+1).padStart(2,'0')}</span><span className="sf-continuation-stage-copy"><strong>{stage.title}</strong><span>{stage.subtitle}</span></span><ArrowDown size={15} aria-hidden="true"/></summary><div><h4>{stage.capability}</h4><p>{stage.description}</p></div></details>{i<value.stages.length-1&&<ArrowRight className="sf-continuation-connector" size={16} aria-hidden="true"/>}</li>)}
   </ol></figure>
  </div>
  <div className="sf-continuation-contribution"><h3>My Leadership &amp; Contribution</h3><p>{value.contribution}</p></div>
  <div className="sf-continuation-outcome"><span className="sf-continuation-phase">Intended Outcome</span><h3>Intended Impact</h3><p>{value.intendedImpact}</p><div className="sf-continuation-impact"><h3>{value.impactTitle}</h3><p>{value.impactStatement}</p></div><p className="sf-continuation-status">{value.statusNote}</p></div>
 </section>;
}
