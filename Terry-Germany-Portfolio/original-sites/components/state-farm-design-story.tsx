"use client";

import { Expand } from 'lucide-react';
import type { Evidence } from '@/lib/project-proof';

const steps = [
  { label: 'Customer problem', text: 'Returning customers need to pick up an unfinished quote without finding their way through the site again.' },
  { label: 'Evidence that framed the opportunity', text: 'Of 27,700 onboarding and service interactions analyzed, 13,088 needed additional support. That highlighted a broader opportunity for clearer guidance—not a quote-specific usability finding.' },
  { label: 'Design decision', text: 'Bring the saved quote, its status, and the next action into the returning-customer homepage. Keep contextual assistance close to the task.' },
  { label: 'Resulting prototype', text: 'The screen makes quote continuation prominent, with recommendations and a Digital Assistant entry point alongside it. This shows the design direction; completion-rate improvement has not been measured here.' }
];

export default function StateFarmDesignStory({onOpen}:{onOpen:(evidence:Evidence)=>void}) {
  const artifact:Evidence = {id:'quote-continuation',title:'Returning to an unfinished quote',status:'Artifact available',summary:'Returning-customer homepage prototype.',detail:'A returning-customer homepage concept that brings the saved quote, its status, and the next action together. Contextual recommendations and Digital Assistance support the journey. This is a prototype example, not a measured launch result.',src:'/work/state-farm-hero-laptop.png'};
  return <div className="sf-design-story">
    <div className="sf-story-intro"><span className="study-kicker">One decision, made concrete</span><h3>Make it easy to pick up where you left off.</h3></div>
    <div className="sf-story-layout">
      <ol className="sf-story-steps">{steps.map((step,index)=><li key={step.label}><span aria-hidden="true">0{index+1}</span><div><h4>{step.label}</h4><p>{step.text}</p></div></li>)}</ol>
      <figure className="sf-story-artifact"><button type="button" onClick={()=>onOpen(artifact)} aria-label="Enlarge the quote-continuation prototype"><img src={artifact.src} width={908} height={616} alt="State Farm returning-customer homepage on a laptop, showing a saved auto quote and a continue action"/><span><Expand size={15} aria-hidden="true"/> View prototype</span></button><figcaption>Quote continuation · Homepage prototype</figcaption></figure>
    </div>
  </div>;
}

export function StateFarmDelivery() {
  return <dl className="sf-delivery">
    <div><dt><span className="sf-delivery-status">Implemented foundations</span>Shared standards and planning</dt><dd>Digital Assistance Design Kit, experience principles, and the Level 1–3 AI Maturity Model implemented with Product and Engineering.</dd></div>
    <div><dt><span className="sf-delivery-status">Research & prototypes</span>Making the direction tangible</dt><dd>Conversational assistance, quote continuation, entry-point variations, and desktop/mobile concepts developed for research and experimentation.</dd></div>
    <div><dt><span className="sf-delivery-status">Future direction</span>More proactive assistance</dt><dd>Predictive guidance and agentic task completion. The engagement and friction-reduction figures in Research are design targets, separate from achieved results.</dd></div>
  </dl>;
}
