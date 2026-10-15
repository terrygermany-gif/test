import {z} from 'zod';

const short=z.string().trim().min(1).max(400);
const text=z.string().trim().min(1).max(8000);
const media=z.string().regex(/^\/(api\/portfolio-media\/[0-9a-f-]{36}|work\/[a-zA-Z0-9_.-]+)$/);
const artifact=z.object({title:short,description:text,image:media,alt:short,lightImage:z.union([z.literal(''),media]).optional()}).strict();
const note=z.object({title:short,description:text}).strict();
const screen=(file:string,title:string,description:string)=>({title,description,image:`/work/ada-${file}.png`,alt:`Ada mobile interface: ${title}`});

// Project facts and original artwork: https://redhatdigital.com/portfolio/ada-ai-driven-healthcare/
// Captions describe the supplied designs; interface sample values are not project outcomes.
export const defaultAdaHealthcare={
 cardCompany:'Ada Driven Healthcare & Wellness',
 cardTitle:'A clearer path to everyday wellness.',
 cardDescription:'Mobile product design for health assessment, wellness tracking and conversational AI.',
 cardImage:'/work/ada-ada-img-side-2.png',
 cardAlt:'Ada health and wellness interfaces presented on two phones',
 client:'ada',role:'Product design · Research, UX & UI',timeline:'3 months',tools:'Figma, FigJam, AI, Miro, Framer, Bravo Studio',
 overview:'I worked across research, conceptualization, visual design and testing to explore a connected healthcare and wellness experience. The mobile designs bring onboarding, personal health information, activity tracking and AI conversations into one product direction.',
 researchTitle:'From research to a connected mobile experience.',
 researchIntro:'The original project combined personas, a sitemap, wireframes and high-fidelity prototyping. My role spanned the complete product design process.',
 methods:[
  {title:'Understand the person',description:'Use personas to frame the needs behind the health and wellness experience.'},
  {title:'Structure the journey',description:'Connect the product’s information architecture and wireframes before developing the visual direction.'},
  {title:'Make it tangible',description:'Bring the experience into high-fidelity screens and a prototype for exploration and testing.'}
 ],
 onboardingTitle:'A welcoming start, with a clear next step.',
 onboardingIntro:'The introduction explains the wellness experience through focused screens for personalization, fitness, AI conversation and medication tracking.',
 onboarding:[
  screen('2-ada-Welcome-Screen','Welcome to Ada','An illustrated introduction with a clear starting action.'),
  screen('3-ada-Welcome-Screen','Personalize the experience','Introduce the idea of a personalized health and wellness experience.'),
  screen('4-ada-Welcome-Screen','Fitness at a glance','Introduce fitness tracking before asking for personal details.'),
  screen('5-ada-Welcome-Screen','Conversational support','Explain the AI chatbot as part of the wellness experience.'),
  screen('6-ada-Welcome-Screen','Medication tracking','Introduce another part of the connected wellness journey.')
 ],
 assessmentTitle:'One question at a time.',
 assessmentIntro:'A progressive assessment uses focused questions and visual controls for personal information, habits and preferences.',
 assessment:[
  screen('7-Onboarding-Health-Assessment','Weight','A unit selector and scale keep the question focused.'),
  screen('8-Onboarding-Health-Assessment','Blood type','A dedicated selection screen with a visible continuation action.'),
  screen('9-Onboarding-Health-Assessment','Fitness level','An illustrated step selector for the current activity level.'),
  screen('Onboarding-Health-Assessment-1','Sleep habits','A vertical selector presents a range of sleep durations.'),
  screen('Onboarding-Health-Assessment-2','How you feel','A visual selector explores emotional well-being.'),
  screen('Onboarding-Health-Assessment-3','Eating habits','Cards organize the available dietary preferences.'),
  screen('Onboarding-Health-Assessment-4','Medications','A searchable selection pattern for medication information.'),
  screen('Onboarding-Health-Assessment-5','Symptoms and allergies','A selection interface for additional health context.')
 ],
 wellnessTitle:'Make daily wellness easier to explore.',
 wellnessIntro:'The ongoing experience brings health indicators, activity and AI conversation into dedicated mobile views. Values shown are interface examples.',
 wellness:[
  screen('20-ada-Blood-Pressure2','Blood pressure','A visual exploration of trends and related health information.'),
  screen('21-ada-Heart-Rate','Heart rate','A daily view combines a prominent reading with a trend chart.'),
  screen('22-ada-Heart-Rate-Details','Heart analysis','A detail screen organizes related indicators in one view.'),
  screen('23-ada-Steps','Daily activity','Progress and a weekly chart bring activity information together.'),
  screen('25-ada-Wellness-AI-Chatbot','AI conversations','An overview of conversations and the assistant experience.')
 ],
 prototypeTitle:'Explore the connected experience.',
 prototypeIntro:'Move from individual screens to the original interactive prototype.',
 prototypeUrl:'https://www.figma.com/proto/aNCW7O2L29U7wznCdnZdih/IR---Project-Wirth?mode=design&node-id=2046-83576&page-id=2046%3A77693&scaling=scale-down&starting-point-node-id=2046%3A83576&t=gvMUdRkLd1dCZR2Z-1&type=design&viewport=5053%2C-5686%2C0.25',
 prototypeNote:'Open the original Figma prototype in a separate tab. Figma access may be required.',
 prototypeImage:'/work/ada-ada-img-side-3.png',prototypeAlt:'Ada conversational AI interface on two phones',
 visualTitle:'A consistent visual language.',
 visualIntro:'Rounded forms, illustration and a shared color palette connect the mobile experience.',
 visuals:[
  {title:'Illustration and visual tone',description:'Wellness illustration from the original project.',image:'/work/ada-ada-ai-frame.png',alt:'Ada wellness illustration of a seated person'},
  {title:'AI conversation interface',description:'The mobile conversation overview combines topic cards, search and recent activity.',image:'/work/ada-ada-ai.png',alt:'Ada AI conversation overview on a phone'}
 ],
 closing:'The work connects a welcoming introduction, focused assessment and ongoing wellness into one mobile product experience.'
};

export const adaHealthcareSchema=z.object({
 cardCompany:short,cardTitle:short,cardDescription:text,cardImage:media,cardAlt:short,
 client:short,role:short,timeline:short,tools:short,overview:text,
 researchTitle:short,researchIntro:text,methods:z.array(note).min(1).max(6),
 onboardingTitle:short,onboardingIntro:text,onboarding:z.array(artifact).min(1).max(12),
 assessmentTitle:short,assessmentIntro:text,assessment:z.array(artifact).min(1).max(12),
 wellnessTitle:short,wellnessIntro:text,wellness:z.array(artifact).min(1).max(12),
 prototypeTitle:short,prototypeIntro:text,prototypeUrl:z.string().url().refine(value=>value.startsWith('https://'),'Use an HTTPS URL.'),prototypeNote:text,prototypeImage:media,prototypeAlt:short,
 visualTitle:short,visualIntro:text,visuals:z.array(artifact).min(1).max(8),closing:text
}).strict().default(()=>structuredClone(defaultAdaHealthcare));
export type AdaHealthcare=z.infer<typeof adaHealthcareSchema>;
