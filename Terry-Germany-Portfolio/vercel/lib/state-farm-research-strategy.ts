import {z} from 'zod';

export const defaultStateFarmResearchStrategy={
 title:'Research-Led. Human-Centered. AI-Enabled.',
 intro:'Led research-informed experience strategy to understand how customers navigate insurance decisions, interact with AI assistance, and build trust in personalized digital experiences.',
 translation:'Translated findings into actionable design principles that shaped conversational quoting, embedded AI guidance, quote continuation, and future agentic experiences.',
 process:[
  {title:'Research & Discovery',description:'Customer friction, AI perceptions, usability feedback, entry-point exploration'},
  {title:'Experience Insights',description:'Context matters, guidance should be relevant, trust requires control'},
  {title:'Design Principles',description:'Embedded intelligence, purposeful personalization, progressive disclosure'},
  {title:'Prototype Validation',description:'Conversational quotes, continuation, responsive AI patterns; future concepts remain exploratory'}
 ],
 focus:[
  {title:'Customer Intent & Behavior',description:'Explored customer needs, friction points, and decision-making patterns across quoting, onboarding, and self-service journeys.'},
  {title:'AI Trust & Transparency',description:'Evaluated how customers perceive AI recommendations, contextual assistance, transparency, and control when making insurance decisions.'},
  {title:'Interaction & Usability',description:'Explored AI entry points, conversational interfaces, and responsive layouts, including embedded widgets, side panels, and full-page experiences.'},
  {title:'Personalization & Context',description:'Investigated opportunities to recognize returning customers, preserve journey context, and surface relevant next steps without overwhelming users.'}
 ],
 evidence:[
  {title:'Service friction that framed the opportunity',label:'Program data',description:'Of 27,700 onboarding and service interactions analyzed, 13,088 needed additional support. This broader program evidence framed the opportunity for clearer guidance and human handoff; it is not a quote-specific usability result.'},
  {title:'Research and experimentation',label:'Project record',description:'Directed research and experimentation with Research, Data Science, Product, and Engineering. Prototypes and interface variations supported moderated research and A/B testing around entry points, usefulness, trust, AI identity, and human handoff.'},
  {title:'Prototype artifacts',label:'Design evidence',description:'The saved-quote homepage and related Digital Assistance exploration make the experience direction tangible. They show design decisions, rather than measured launch outcomes or participant-level findings.'}
 ],
 principles:[
  {title:'Intelligence Without Intrusion',description:'Embed AI naturally within customer journeys, offering assistance when relevant rather than interrupting the experience.'},
  {title:'Personalization With Purpose',description:'Use customer context to simplify decisions, reduce repetition, and provide relevant guidance.'},
  {title:'Trust Through Transparency',description:'Make AI recommendations understandable, editable, and easy to verify.'},
  {title:'Progressive AI Maturity',description:'Evolve from reactive assistance toward contextual, predictive, and agentic capabilities as customer trust and technical readiness grow.'},
  {title:'Human Control by Design',description:'Keep customers in control of their information, coverage decisions, and when to engage with human assistance.'}
 ],
 applications:[
  {title:'Restore the quote context',question:'Can returning customers recognize their saved quote and understand how to continue?',principle:'Personalization With Purpose',change:'Bring the saved auto quote, status, and Continue action into the homepage, with relevant next steps nearby.',validation:'Evaluate recognition and continuation in the prototype. No quote-completion lift is claimed.'},
  {title:'Keep guidance inside the task',question:'Where can customers find useful assistance without losing their place?',principle:'Intelligence Without Intrusion',change:'Explore contextual assistance alongside the quote and conversational UI with task controls, across widget, side-panel, and full-page patterns.',validation:'Evaluate entry-point discovery, usefulness, and whether customers stay oriented. Specific post-test changes are not supplied in the project records.'},
  {title:'Make AI understandable and controllable',question:'Can customers understand a recommendation, change information, and reach a person?',principle:'Trust Through Transparency · Human Control by Design',change:'Use explanations, editable information, confirmation steps, and paths to human help in the shared assistance model.',validation:'Evaluate trust, comprehension, and handoff. Predictive and agentic task completion remain future-state directions.'}
 ],
 contextNote:'Project record summaries and design rationale are shown here. Participant observations, survey questionnaires, and study-level results are not published in this section. Applied examples connect documented questions to prototype choices, rather than asserting new test findings.',
 strategicOutcome:'Established research-informed experience principles that connected customer needs, business goals, and AI maturity—creating a scalable design foundation for more intelligent insurance experiences.',
 leadershipTitle:'Connecting Research to AI Experience Strategy',
 leadershipStatement:'Directed research-informed design decisions across multidisciplinary teams, translating customer insights into experience principles, scalable AI interaction patterns, and high-fidelity prototypes. Established a foundation for progressing from conversational assistance toward personalized, predictive, and agentic insurance experiences.'
};
const short=z.string().trim().min(1).max(400),text=z.string().trim().min(1).max(8000);
const note=z.object({title:short,description:text}).strict();
export const stateFarmResearchStrategySchema=z.object({title:short,intro:text,translation:text,process:z.array(note).length(4),focus:z.array(note).length(4),evidence:z.array(note.extend({label:short})).min(1).max(6),principles:z.array(note).length(5),applications:z.array(z.object({title:short,question:text,principle:short,change:text,validation:text}).strict()).length(3),contextNote:text,strategicOutcome:text,leadershipTitle:short,leadershipStatement:text}).strict().default(()=>structuredClone(defaultStateFarmResearchStrategy));
export type StateFarmResearchStrategy=z.infer<typeof stateFarmResearchStrategySchema>;
