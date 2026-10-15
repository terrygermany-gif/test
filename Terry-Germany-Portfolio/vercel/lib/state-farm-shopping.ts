import {z} from 'zod';
const short=z.string().trim().min(1).max(400),text=z.string().trim().min(1).max(8000);
const media=z.string().regex(/^\/(api\/portfolio-media\/[0-9a-f-]{36}|work\/[a-zA-Z0-9_.-]+)$/);
const note=z.object({title:short,description:text}).strict();
const artifact=z.object({title:short,description:text,image:media,alt:short}).strict();
const simulator=z.string().trim().max(2000).refine(value=>{if(value==='')return true;try{const u=new URL(value);return u.protocol==='https:'&&u.hostname.endsWith('.figma.site')&&!u.username&&!u.password&&!u.port;}catch{return false;}},'Use an HTTPS Figma Sites URL, or leave blank for the hero image.');
export const defaultStateFarmShopping={
 cardCompany:'State Farm',cardTitle:'A guided shopping experience.',cardDescription:'Explore the Digital Assistant shopping simulator, from customer intent to guided next steps.',cardImage:'/work/state-farm-hero-phone.png',cardAlt:'State Farm Digital Assistant shopping interface',
 client:'State Farm',role:'Senior Experience Lead · AI & Digital Assistance',format:'Interactive prototype',scope:'Conversational shopping & auto-quote guidance',
 overview:'I explored how Digital Assistance could make insurance shopping feel clearer: start with the customer’s goal, combine conversation with useful interface controls, and keep the next step visible. This portfolio focuses on the shopping prototype within my broader State Farm AI and Digital Assistance work.',
 simulatorUrl:'https://false-stark-55161277.figma.site/shopping',simulatorNote:'Interactive shopping prototype · Open the simulator in a new tab if it does not load here.',
 decisionStory:{title:'Make the next step easier to understand.',problem:'Insurance shopping asks people to share information, understand coverage, and move through unfamiliar decisions. Assistance needs to support the task as it unfolds.',decision:'I combined conversational guidance with task-specific controls: quick replies, license scanning with a manual-entry alternative, coverage cards, and visible continuation actions.',result:'A shopping prototype that makes the assistance model tangible, supported by interface explorations and shared Digital Assistance patterns.',note:'This prototype illustrates a design direction. Measured quote-completion or conversion improvements are not provided.',evidenceTitle:'Explore the supporting designs',evidence:[
  {title:'Give customers a choice',description:'The mobile quote concept offers license scanning alongside manual entry, with a privacy message next to the action.',image:'/work/state-farm-hero-phone.png',alt:'State Farm mobile Digital Assistant quote concept showing license scanning and manual entry options'},
  {title:'Connect conversation to action',description:'The shopping exploration combines a customer’s question with verification, coverage choices, and save-or-continue actions in the same assistance surface.',image:'/work/state-farm-assistant.png',alt:'State Farm shopping assistant exploration with a quote request, coverage card, and save and continue controls'}
 ]},
 contributionTitle:'Connect customer intent, interaction, and delivery.',contributions:[
  {title:'Experience strategy',description:'Defined an assistance approach around the customer’s goal and connected shopping and quoting with the broader Digital Assistance strategy.'},
  {title:'Interaction design',description:'Explored conversation alongside traditional controls, contextual guidance, suggestion chips, and transitions to human support.'},
  {title:'Research & shared standards',description:'Directed prototypes and experimentation, and aligned Product, Research, Data Science, and Engineering through the Digital Assistance Design Kit and shared experience principles.'}
 ],
 workflowTitle:'A guided path through the shopping task.',workflowIntro:'A concise view of the interaction model explored in the prototype. Expand any step for context.',workflow:[
  {title:'Describe the goal',description:'Let the customer begin with what they want to accomplish, such as starting an auto quote.'},
  {title:'Share the details',description:'Use contextual requests and useful controls to gather information, including scanning and a manual-entry alternative.'},
  {title:'Review the guidance',description:'Present coverage choices and relevant explanations close to the customer’s question and current task.'},
  {title:'Take the next step',description:'Make continuation actions visible and carry the customer toward the next part of the shopping journey.'}
 ],
 researchTitle:'Research & experience principles',researchIntro:'The broader State Farm program explored discovery, usefulness, trust, and brand fit through usability studies, experimentation, and prototype validation. These questions frame the shopping direction; they are not presented as quote-specific measured findings.',research:[
  {title:'Can people find the assistance?',description:'Evaluate entry points, CTA language, visual identity, and suggestion chips in the context of the customer’s task.'},
  {title:'Does the interaction feel clear and trustworthy?',description:'Test whether customers understand the request, the available alternatives, and the privacy language around information sharing.'},
  {title:'Can people move forward or get help?',description:'Evaluate continuity between conversation and traditional controls, recovery paths, and transitions to human support.'}
 ],
 closing:'Useful AI assistance helps people understand the task, make an informed choice, and see what to do next.'
};
export const stateFarmShoppingSchema=z.object({
 cardCompany:short,cardTitle:short,cardDescription:text,cardImage:media,cardAlt:short,client:short,role:short,format:short,scope:short,overview:text,simulatorUrl:simulator,simulatorNote:text,
 decisionStory:z.object({title:short,problem:text,decision:text,result:text,note:text,evidenceTitle:short,evidence:z.array(artifact).min(1).max(6)}).strict(),contributionTitle:short,contributions:z.array(note).min(1).max(6),workflowTitle:short,workflowIntro:text,workflow:z.array(note).min(2).max(6),researchTitle:short,researchIntro:text,research:z.array(note).min(1).max(6),closing:text
}).strict().default(()=>structuredClone(defaultStateFarmShopping));
export type StateFarmShopping=z.infer<typeof stateFarmShoppingSchema>;
