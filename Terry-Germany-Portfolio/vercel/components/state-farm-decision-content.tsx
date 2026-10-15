import {ArrowDown} from 'lucide-react';
import type {StateFarmReturning} from '@/lib/state-farm-returning';

export default function StateFarmDecisionContent({value}:{value:StateFarmReturning['designDecisions']}){
 return <div className="sf-decision-content">
  <p className="sf-decision-intro">{value.intro}</p>
  <ol className="sf-decision-cards" aria-label="Primary design decisions">
   {value.cards.map((card,i)=><li key={i}>
    <div className="sf-decision-card-heading"><span className="sf-decision-number" aria-hidden="true">{String(i+1).padStart(2,'0')}</span><h3>{card.title}</h3></div><p>{card.summary}</p>
    <p className="sf-decision-takeaway"><strong>Decision</strong>{card.decision}</p>
    <details><summary>Design rationale<ArrowDown size={14} aria-hidden="true"/></summary><p>{card.description}</p></details>
   </li>)}
  </ol>
  <div className="sf-decision-leadership"><h3>{value.leadershipTitle}</h3><p>{value.leadershipStatement}</p></div>
  <div className="sf-decision-principles">{value.principles.map((item,i)=><div key={i}><h3>{item.title}</h3><p>{item.description}</p><p><strong>Decision:</strong> {item.decision}</p></div>)}</div>
  <dl className="sf-decision-scope"><div><dt>Design & prototype work</dt><dd>{value.designScope}</dd></div><div><dt>Future-state AI vision</dt><dd>{value.futureScope}</dd></div></dl>
 </div>;
}
