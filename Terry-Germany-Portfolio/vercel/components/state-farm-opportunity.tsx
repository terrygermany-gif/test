"use client";

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { outcomeRows, outcomeShare, opportunityJourney, opportunityResearchTopics, serviceOutcomes } from '@/lib/state-farm-opportunity';

const count = (value:number) => value.toLocaleString('en-US');
export default function StateFarmOpportunity() {
  const [unit,setUnit] = useState<'count'|'share'>('count');
  const [outcome,setOutcome] = useState(1);
  const [step,setStep] = useState(0);
  const [entered,setEntered] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){setEntered(true);observer.disconnect();}},{threshold:.12});
    if(ref.current)observer.observe(ref.current);
    return()=>observer.disconnect();
  },[]);
  return <section ref={ref} id="digital-assistance-opportunity" className="sf-opportunity" aria-labelledby="sf-opportunity-heading">
    <header className="sf-opportunity-heading"><span className="study-kicker">Operational evidence / AI opportunity</span><h3 id="sf-opportunity-heading">Turning Customer Friction Into AI Opportunity</h3><p>Onboarding and service data showed how often customers completed without escalation—and how often they needed more support. These signals helped identify opportunities for AI-assisted guidance, personalization, better intent recognition, and agentic task completion.</p></header>
    <div className="sf-opportunity-baseline"><div className="sf-fcr-primary"><span className="study-kicker">What the data showed</span><strong>{serviceOutcomes.reportedFcr}<span>%</span></strong><span>First Contact Resolution · Reported baseline</span></div><div className="sf-fcr-support"><strong>{(serviceOutcomes.total/1000).toFixed(1)}K</strong><span>Interactions analyzed</span><p>Onboarding & service · {count(serviceOutcomes.total)} total</p></div></div>
    <div className="sf-outcome-chart">
      <div className="sf-outcome-chart-heading"><h4>Onboarding & service interaction outcomes</h4><div className="sf-data-switch" role="group" aria-label="Chart display"><button type="button" aria-pressed={unit==='count'} onClick={()=>setUnit('count')}>Interactions</button><button type="button" aria-pressed={unit==='share'} onClick={()=>setUnit('share')}>Percentage</button></div></div>
      <p className="sf-data-deck">Slightly more customers completed without escalation than required escalation. Select a bar to explore.</p>
      <div className={`sf-outcome-bars ${entered?'is-visible':''}`}>
        {outcomeRows.map((row,index)=><button type="button" key={row.key} className={`sf-outcome-row sf-outcome-${row.key}`} aria-pressed={outcome===index} aria-label={`${row.label}: ${count(row.value)} interactions, ${outcomeShare(row.value).toFixed(1)} percent`} onClick={()=>setOutcome(index)}><span className="sf-outcome-label">{row.label}</span><span className="sf-outcome-track"><span className="sf-outcome-fill" style={{width:`${entered?(unit==='count'?row.value/16000*100:outcomeShare(row.value)):0}%`}}/></span><span className="sf-outcome-value">{unit==='count'?count(row.value):`${outcomeShare(row.value).toFixed(1)}%`}</span></button>)}
        <div className="sf-outcome-axis" aria-hidden="true">{(unit==='count'?['0','4K','8K','12K','16K']:['0','25%','50%','75%','100%']).map(tick=><span key={tick}>{tick}</span>)}</div>
      </div>
      <div className="sf-outcome-context" role="status"><strong>{outcomeRows[outcome].label} · {outcomeShare(outcomeRows[outcome].value).toFixed(1)}%</strong><p>{outcomeRows[outcome].detail}</p></div>
    </div>
    <div className="sf-opportunity-insight"><span className="study-kicker">Design opportunity</span><p>Reduce unnecessary effort by <strong>recognizing customer intent earlier, adapting guidance to context, and proactively surfacing the next-best action</strong>. Keep the transition to human support clear and seamless when additional help is needed.</p></div>
    <ol className="sf-evidence-response" aria-label="From operational evidence to design response"><li><span>01 / Evidence</span><p>{count(serviceOutcomes.total)} interactions analyzed; {serviceOutcomes.reportedFcr}% reported FCR.</p></li><li><span>02 / Friction</span><p>{count(serviceOutcomes.escalated)} interactions required escalation.</p></li><li><span>03 / AI opportunity</span><p>Personalized guidance, better intent recognition, and agentic task completion.</p></li><li><span>04 / Design response</span><p>Prototype contextual assistance, clearer next actions, and human handoff.</p></li></ol>
    <details className="study-disclosure sf-journey-disclosure"><summary>Explore the From → To journey</summary><div className="sf-journey"><div className="sf-journey-heading"><h4>From friction to purposeful assistance</h4><p>Select a stage to see the design opportunity.</p></div><div className="sf-journey-columns"><div><span className="study-kicker">From / Traditional experience</span><ol>{opportunityJourney.map((item,index)=><li key={item.from}><button type="button" aria-pressed={step===index} onClick={()=>setStep(index)}><span>0{index+1}</span>{item.from}</button></li>)}</ol></div><ArrowRight className="sf-journey-arrow" size={24} aria-hidden="true"/><div><span className="study-kicker">To / Proposed AI experience</span><ol>{opportunityJourney.map((item,index)=><li key={item.to}><button type="button" aria-pressed={step===index} onClick={()=>setStep(index)}><span>0{index+1}</span>{item.to}</button></li>)}</ol></div></div><div className="sf-journey-context" role="status"><strong>{opportunityJourney[step].from} <ArrowRight size={16} aria-hidden="true"/> {opportunityJourney[step].to}</strong><p>{opportunityJourney[step].detail}</p></div></div></details>
    <div className="sf-opportunity-targets"><span className="study-kicker">Design targets / To validate</span><div className="sf-target-grid"><div><strong>7–8%</strong><h4>Digital Assistant engagement</h4><p>Target within 90 days.</p></div><div><strong>Up to 50%</strong><h4>High-friction journey reduction</h4><p>Target for journeys such as Replace Vehicle.</p></div></div><p className="proof-note">These are design targets, not achieved results. The reduction measure and baseline should be defined before evaluation.</p></div>
    <details className="study-disclosure"><summary>Research coverage & data context</summary><ul className="sf-research-topics">{opportunityResearchTopics.map(topic=><li key={topic}>{topic}</li>)}</ul><p className="proof-note">Counts total 27,700. Their calculated split is 52.8% without escalation and 47.2% escalated (approximately 53% / 47%). The reported 52.7% FCR is shown separately as supplied. Dataset dates and the FCR measurement definition were not provided.</p></details>
  </section>;
}
