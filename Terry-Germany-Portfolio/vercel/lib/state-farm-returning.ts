import {z} from 'zod';
import {defaultStateFarmResearchStrategy,stateFarmResearchStrategySchema,type StateFarmResearchStrategy} from './state-farm-research-strategy';
import {stateFarmShoppingSchema,type StateFarmShopping} from './state-farm-shopping';

export const defaultStateFarmReturningLeadership={
 title:'My Leadership & Impact',
 intro:'As Senior Experience Lead, I drove the AI experience vision across Auto, Home, and Renters insurance, aligning 25+ cross-functional stakeholders around a scalable AI maturity roadmap.',
 responsibilities:[
  {title:'AI Strategy',description:'Defined the evolution from reactive assistance to contextual, personalized, and future agentic AI experiences.'},
  {title:'UX Research',description:'Led experience validation, usability testing, and research-driven design decisions.'},
  {title:'Experience Design',description:'Shaped end-to-end quoting, onboarding, and self-service journeys, identifying opportunities to reduce friction and improve engagement.'},
  {title:'Prototyping',description:'Directed high-fidelity AI prototypes to validate conversational, embedded, and proactive assistance concepts.'},
  {title:'Cross-Functional Leadership',description:'Connected product, engineering, research, and AI teams around shared design patterns and implementation priorities.'}
 ],
 impact:'Established a strategic UX foundation for scaling intelligent insurance experiences, translating AI maturity goals into actionable product concepts and testable customer journeys.'
};
export const defaultStateFarmReturningDecisions={
 title:'Designing Intelligence Into Every Insurance Journey',
 intro:'Reimagined Auto, Home, and Renters insurance by shifting from static, transactional experiences toward personalized, AI-assisted journeys. Each design decision balanced customer trust, usability, business goals, and the evolution toward agentic AI.',
 cards:[
  {title:'Personalized by Context',summary:'Relevant guidance based on intent and journey progress',description:'Designed contextual entry points, returning-customer journeys, and intelligent recommendations that adapt to customer needs, progress, and intent.',decision:'Make every interaction feel relevant, not repetitive.'},
  {title:'AI Beyond Chat',summary:'Intelligence embedded into the insurance experience',description:'Explored AI guidance directly within quoting, coverage selection, onboarding, and self-service—reducing the need to leave the task to find assistance.',decision:'Bring intelligence into the experience, not just a chatbot.'},
  {title:'Progressive AI Maturity',summary:'From reactive assistance toward proactive intelligence',description:'Defined a phased AI maturity approach, moving from reactive assistance to context-aware recommendations and future proactive, agentic capabilities.',decision:'Build customer trust before introducing autonomy.'},
  {title:'Seamless Continuity',summary:'Resume quotes and decisions without starting over',description:'Designed returning-customer experiences that preserve quote progress, surface relevant next steps, and simplify moving between insurance tasks.',decision:'Make continuing easier than restarting.'}
 ],
 leadershipTitle:'From AI Strategy to Experience Execution',
 leadershipStatement:'Led research-informed design decisions across product, engineering, and AI teams—translating AI maturity goals into scalable interaction patterns, high-fidelity prototypes, and testable experiences that shaped the future of digital insurance.',
 principles:[
  {title:'Human Control Over Black-Box AI',description:'Prioritized transparent recommendations, editable inputs, clear next steps, and human support when needed.',decision:'Keep customers informed and in control of important coverage decisions.'},
  {title:'Scalable Patterns Over One-Off Solutions',description:"Established reusable conversational UI patterns, responsive interactions, and AI-assisted components aligned with State Farm's design system.",decision:'Design once, scale across multiple insurance experiences.'}
 ],
 designScope:'Experience strategy, research-led design, high-fidelity prototypes, and reusable interaction patterns. The screens below show the returning-customer concept and a related Digital Assistance exploration; they are not evidence of production deployment or measured conversion lift.',
 futureScope:'Proactive recommendations and agentic capabilities describe the longer-term AI maturity direction. They are separate from the designed and tested concepts and are not presented as delivered autonomous experiences.'
};
export const defaultStateFarmContinuation={
 title:'Pick Up Where You Left Off. Smarter.',
 intro:'Reimagined the returning-customer experience by bringing quote continuation, AI-powered personalization, and contextual guidance into one seamless journey across Auto, Home, and Renters insurance.',
 rationale:'Rather than forcing customers to restart or navigate disconnected experiences, the prototype explored how embedded AI could recognize customer intent, restore progress, and recommend the most relevant next action.',
 problem:'Traditional quoting experiences can create friction when customers leave and return. Repeated questions, disconnected journeys, and limited contextual guidance increase cognitive effort and introduce opportunities for abandonment.',
 experienceIntro:'Designed an intelligent continuation experience centered on four capabilities. Explore each stage to see the capability behind it.',
 stages:[
  {title:'Recognize',subtitle:'Returning customer',capability:'Personalized Recommendations',description:'Tailor content, guidance, and coverage options to known customer information and intent.'},
  {title:'Restore',subtitle:'Saved progress',capability:'Resume with Context',description:'Surface saved quote progress and guide customers directly to their next step.'},
  {title:'Guide',subtitle:'Contextual AI',capability:'Embedded AI Assistance',description:'Provide contextual support directly within the quoting experience instead of requiring a separate chatbot.'},
  {title:'Continue',subtitle:'Next best action',capability:'Customer Control',description:'Allow customers to review, edit, and confirm information before continuing.'}
 ],
 decisions:[
  {title:'Continuity over repetition.',description:'Prioritized saved progress and contextual next steps over restarting the journey.'},
  {title:'Guidance over complexity.',description:'Simplified insurance decisions through progressive disclosure and relevant assistance.'},
  {title:'Intelligence over automation.',description:'Introduced helpful AI recommendations while keeping customers in control.'}
 ],
 contribution:'Led UX strategy, experience architecture, interaction design, and high-fidelity prototyping. Connected research insights with AI maturity goals to explore a scalable continuation experience and align cross-functional teams on future product direction.',
 intendedImpact:'Reduce unnecessary steps, increase quote completion opportunities, strengthen customer confidence, and establish a foundation for more predictive and agentic insurance experiences.',
 impactTitle:'From Disconnected Quotes to Intelligent Continuity',
 impactStatement:'Shifted the experience from repetitive, transactional interactions toward context-aware guidance—demonstrating how personalization and embedded AI could simplify quote completion while laying the groundwork for proactive insurance assistance.',
 statusNote:'Prototype exploration · The returning auto-quote screens illustrate the broader Auto, Home, and Renters direction. Intended outcomes are not measured results or a claim of shipped AI capabilities.'
};
export const defaultStateFarmReturning:StateFarmShopping&{leadership:typeof defaultStateFarmReturningLeadership;designDecisions:typeof defaultStateFarmReturningDecisions;continuation:typeof defaultStateFarmContinuation;researchStrategy:StateFarmResearchStrategy}={
 leadership:structuredClone(defaultStateFarmReturningLeadership),
 designDecisions:structuredClone(defaultStateFarmReturningDecisions),
 continuation:structuredClone(defaultStateFarmContinuation),
 researchStrategy:structuredClone(defaultStateFarmResearchStrategy),
 cardCompany:'State Farm',cardTitle:'Pick up where you left off.',cardDescription:'A returning-customer prototype that brings quote continuation and personalized guidance into one experience.',cardImage:'/work/state-farm-hero-laptop.png',cardAlt:'State Farm returning-customer experience on a laptop',
 client:'State Farm',role:'Senior Experience Lead · AI & Digital Assistance',format:'Interactive prototype',scope:'Quote continuation, personalization & contextual assistance',
 overview:'I explored how a returning-customer homepage could help people resume an unfinished auto quote with less effort. The concept brings the saved quote, its status, and a clear continuation action together, with personalized guidance and Digital Assistance close to the task.',
 simulatorUrl:'https://easing-saint-57808727.figma.site/',simulatorNote:'Returning-customer prototype · Open the simulator in a new tab if it does not load here.',
 decisionStory:{title:'Make returning feel like continuing.',problem:'A customer with an unfinished quote needs to recognize where they left off and find the next action without navigating the site again.',decision:'I made the saved quote and continuation action prominent on the homepage, supported by contextual recommendations and a Digital Assistant entry point.',result:'A returning-customer homepage prototype that makes quote continuation visible and connects the next step with relevant guidance.',note:'This is a prototype direction. Quote-completion and conversion improvements have not been measured here.',evidenceTitle:'Explore the supporting designs',evidence:[
  {title:'Bring the unfinished quote forward',description:'The homepage concept pairs a welcome-back message and saved auto quote with a prominent Continue action, recommendations, and contextual assistance.',image:'/work/state-farm-hero-laptop.png',alt:'State Farm returning-customer homepage prototype with a saved auto quote and Continue action on a laptop'},
  {title:'Keep assistance connected to the task',description:'A related Digital Assistance exploration shows how conversation, verification, coverage choices, and continuation actions can work together. It provides context for the shared assistance patterns.',image:'/work/state-farm-assistant.png',alt:'Related State Farm Digital Assistance shopping exploration with conversation and task controls'}
 ]},
 contributionTitle:'Connect continuity, personalization, and assistance.',contributions:[
  {title:'Experience strategy',description:'Connected the returning-customer direction with the broader Digital Assistance strategy, centering the customer’s existing task and next step.'},
  {title:'Homepage & interaction direction',description:'Explored how saved-quote status, continuation, personalized recommendations, and assistance could share one coherent starting point.'},
  {title:'Research & shared standards',description:'Directed research and prototypes across the broader program, working with Product, Engineering, Research, and Data Science on reusable Digital Assistance patterns.'}
 ],
 workflowTitle:'A clear route back to the quote.',workflowIntro:'The interaction model explored in the returning-customer prototype. Expand a step for context.',workflow:[
  {title:'Recognize the return',description:'Welcome the customer back and make the unfinished auto quote recognizable on the homepage.'},
  {title:'Recover the context',description:'Bring the saved quote and its status forward so the customer can understand where they left off.'},
  {title:'Continue the task',description:'Make the next action prominent, with recommendations and Digital Assistance available alongside the quote.'},
  {title:'Stay oriented',description:'Keep the current task and continuation route visible as the customer explores relevant guidance.'}
 ],
 researchTitle:'Research & experience principles',researchIntro:'The broader State Farm program explored discovery, usefulness, trust, and continuity through usability studies, experimentation, and prototype validation. These questions frame the returning-customer direction; they are not presented as measured results for this homepage.',research:[
  {title:'Can people recognize their saved quote?',description:'Evaluate whether the welcome-back message, quote information, status, and continuation action help a returning customer regain context.'},
  {title:'Does personalization support the task?',description:'Test whether recommendations feel relevant while the unfinished quote remains easy to find and continue.'},
  {title:'Is assistance useful at the point of need?',description:'Evaluate the Digital Assistant entry point, explanations, transitions, and access to human support alongside the customer’s current task.'}
 ],
 closing:'A useful returning experience restores context, makes the next action clear, and keeps assistance close to the customer’s goal.'
};
const short=z.string().trim().min(1).max(400),text=z.string().trim().min(1).max(8000);
const decisionCard=z.object({title:short,summary:short,description:text,decision:text}).strict();
const decisionPrinciple=z.object({title:short,description:text,decision:text}).strict();
const returningDecisionsSchema=z.object({title:short,intro:text,cards:z.array(decisionCard).length(4),leadershipTitle:short,leadershipStatement:text,principles:z.array(decisionPrinciple).length(2),designScope:text,futureScope:text}).strict();
const continuationSchema=z.object({title:short,intro:text,rationale:text,problem:text,experienceIntro:text,stages:z.array(z.object({title:short,subtitle:short,capability:short,description:text}).strict()).length(4),decisions:z.array(z.object({title:short,description:text}).strict()).length(3),contribution:text,intendedImpact:text,impactTitle:short,impactStatement:text,statusNote:text}).strict();
export const stateFarmReturningSchema=stateFarmShoppingSchema.removeDefault().extend({researchStrategy:stateFarmResearchStrategySchema,continuation:continuationSchema.default(()=>structuredClone(defaultStateFarmContinuation)),designDecisions:returningDecisionsSchema.default(()=>structuredClone(defaultStateFarmReturningDecisions)),leadership:z.object({title:short,intro:text,responsibilities:z.array(z.object({title:short,description:text}).strict()).min(1).max(8),impact:text}).strict().default(()=>structuredClone(defaultStateFarmReturningLeadership))}).default(()=>structuredClone(defaultStateFarmReturning));

export type StateFarmReturning=z.infer<typeof stateFarmReturningSchema>;
