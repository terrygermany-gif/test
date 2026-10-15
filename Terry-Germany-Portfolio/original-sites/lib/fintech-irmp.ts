import {z} from 'zod';
import {adaHealthcareSchema} from './ada-healthcare';

const image=(name:string)=>'/work/irmp-'+name;
const screen=(file:string,title:string,description:string,light?:string)=>({title,description,image:image(file),alt:`Innovation Refunds mobile interface: ${title}`,...(light?{lightImage:image(light)}:{})});
// Source project: https://redhatdigital.com/portfolio/innovation-refunds-erc-mobile-app-2-6/
// Business targets and sample financial values are not presented as measured results.
export const defaultFintechIrmp={
 cardCompany:'FinTech IRMP',cardTitle:'Making tax-credit workflows easier to navigate.',
 cardDescription:'Innovation Refunds mobile product design, from pre-qualification to payroll information and reusable interface patterns.',
 cardImage:image('IR2-6-THUMBNAIL.jpg'),cardAlt:'Innovation Refunds FinTech App 2.6 mobile interface designs',
 client:'Innovation Refunds',role:'Product design · Research, UX & UI',timeline:'4 months',tools:'Figma, FigJam, Miro, Bravo Studio',
 overview:'I worked across research, concept development, visual design and testing for ERC Mobile App 2.6. The design connects business information, payroll documents and financial progress through focused mobile workflows.',
 researchTitle:'Research shaped the product direction.',
 researchIntro:'Discovery combined domain research, stakeholder input, competitor analysis, a product audit and user interviews. Personas, flows, wireframes and prototypes supported the design process.',
 methods:[
  {title:'Discover & evaluate',description:'Review MVP requirements and audit the experience through usability heuristics and the enterprise design framework.'},
  {title:'Research & synthesize',description:'Combine competitor review, stakeholder perspectives and user interviews through thematic analysis.'},
  {title:'Structure the experience',description:'Develop user flows and wireframes to connect the key tasks.'},
  {title:'Prototype & test',description:'Bring the visual direction into high-fidelity screens and an interactive prototype.'}
 ],
 onboardingTitle:'Start with the business, one step at a time.',
 onboardingIntro:'The pre-qualification exploration separates company information, employee counts and the initial estimate into focused steps. Original light and dark variants follow the page theme.',
 onboarding:[
  screen('ERC-Pre-qualification-Dark-1.png','Company information','A focused form for the business details at the start of the journey.','ERC-Pre-qualification-Light.png'),
  screen('ERC-Pre-qualification-Dark-2.png','Employee information','A dedicated question for yearly employee counts.','ERC-Pre-qualification-Light-2.png'),
  screen('ERC-Pre-qualification-Dark-4.png','Initial estimate','An estimate screen introduces the next stage of the application. Values are design examples.','ERC-Pre-qualification-Light-3.png')
 ],
 assessmentTitle:'Keep the next action visible.',
 assessmentIntro:'Payroll screens explore document lists, uploads, connection states and confirmation. Each state supports a different moment in the workflow.',
 assessment:[
  screen('Wizard-Payroll-wages-Light-2.png','Payroll document list','Monthly records and an upload option organize the payroll task.','1Wizard-Payroll-wages-Light-1.png'),
  screen('2Wizard-Payroll-wages-Light-2.png','Next payroll period','The workflow continues into another reporting period.'),
  screen('3Wizard-Payroll-wages-Light-3.png','Completed records','Completed months use a visible status indicator.'),
  screen('5Wizard-Payroll-wages-Light.png','Upload in progress','Progress indicators and file actions make the upload state visible.'),
  screen('Wizard-Payroll-wages-Dark.png','Connection needs attention','A connection-error state keeps retry and provider options available.','4Wizard-Payroll-wages-Light-4.png'),
  screen('Wizard-Payroll-wages-Light.png','Upload confirmation','A confirmation state marks the completion of the document step.'),
  screen('Wizard-Payroll-wages-Light-3.png','Document actions','A dark interface exploration for viewing and managing uploaded records.')
 ],
 wellnessTitle:'Consistent patterns across the experience.',
 wellnessIntro:'Shared form controls, benefit-document views and a data-protection explanation connect the product. These are original interface explorations, with sample content.',
 wellness:[
  screen('IR-2-6-iphone-dark.png','Benefit documents','A mobile view of records, statuses and file actions.','IR-2-6-iphone-light.png'),
  screen('IR-Wizard-Input-fields-DARK1.png','Input fields','A consistent pattern for entering company details.','IR-Wizard-Input-fields-Light.png'),
  screen('IR-Wizard-Segment-buttons-DARK2.png','Segmented choices','A grouped choice pattern for focused questions.','IR-Wizard-Segment-buttons-Light.png'),
  screen('IR-Wizard-Checkboxes-DARK3.png','Multiple selections','Checkboxes support questions with more than one selection.','IR-Wizard-Checkboxes-Light.png'),
  screen('IR-Wizard-Radio-buttons-DARK4.png','Single selection','Radio controls support a single answer within a group.','IR-Wizard-Radio-buttons-Light.png'),
  screen('IR-2-6-iphone-dark-2.png','Data-protection explanation','An explanatory overlay appears within the document workflow.','Wizard-Payroll-wages-Light-1.png')
 ],
 prototypeTitle:'Explore the product and its design system.',
 prototypeIntro:'The original project includes an interactive prototype and a shared design-system file.',
 prototypeUrl:'https://www.figma.com/proto/aNCW7O2L29U7wznCdnZdih/IR---Project-Wirth?mode=design&node-id=2046-83576&page-id=2046%3A77693&scaling=scale-down&starting-point-node-id=2046%3A83576',
 prototypeNote:'Open the original Figma resources in a separate tab. Figma access may be required.',
 prototypeImage:image('IR-ERC-FINTECH-TAX-Iphone-Mockup.png'),prototypeAlt:'Innovation Refunds mobile product shown on two phones',
 visualTitle:'Research artifacts & early direction',
 visualIntro:'Explore the audit blueprint, interview synthesis, journey maps and wireframe direction behind the mobile work.',
 visuals:[
  {title:'Product audit blueprint',description:'The original research and audit board.',image:image('UXResearch-Blueprint-Audit-ERC2.jpg'),alt:'Innovation Refunds UX research blueprint and audit board'},
  {title:'Interview synthesis',description:'Original interview notes organized around insights and feelings.',image:image('User-Interviews-IR.jpg'),alt:'Innovation Refunds interview synthesis board'},
  {title:'Pre-qualification workflow',description:'A workflow map for the early application journey.',image:image('HoneyShake-pre-qualification-App-workflow-1.jpg'),alt:'Innovation Refunds pre-qualification workflow diagram'},
  {title:'Interface flows',description:'A map connecting the mobile interface states.',image:image('IR-26-UI-Flows-1.jpg'),alt:'Innovation Refunds mobile interface flow map'},
  {title:'Wireframe direction',description:'Early campaign and company-information interface explorations.',image:image('wireframe-Iphone-Mockup.png'),alt:'Innovation Refunds wireframe interfaces shown on phones'},
  {title:'Company-information concept',description:'An alternate visual exploration for company details.',image:image('IR-ERC-Phone-mockup4.png'),alt:'Innovation Refunds company-information screen on a phone'}
 ],
 closing:'The work connects research, clear mobile workflows, document states and reusable interface patterns across light and dark themes.',
 designSystemUrl:'https://www.figma.com/file/DoAeHMmfvf30WQEX1rkSFF/IR---Design-System-4.0?mode=design&node-id=6-13',
 walkthroughTitle:'See the interactions in motion.',
 walkthroughIntro:'Original project videos show the product direction and a voice interaction exploration. Play each video when you want a closer look.',
 walkthroughs:[
  {title:'Product overview',description:'Original Innovation Refunds mobile app presentation.',src:image('IR-ERCA_promo_v2.mp4'),poster:image('IR2-6-THUMBNAIL.jpg')},
  {title:'Voice interaction',description:'A short recording of the voice and text interaction exploration.',src:image('IR-VOICE-TEXT-VIDEO.mp4'),poster:image('IR-ERC-Phone-mockup4.png')}
 ]
};
const short=z.string().trim().min(1).max(400),text=z.string().trim().min(1).max(8000);
const media=z.string().regex(/^\/(api\/portfolio-media\/[0-9a-f-]{36}|work\/[a-zA-Z0-9_.-]+)$/);
export const fintechIrmpSchema=adaHealthcareSchema.removeDefault().extend({
 designSystemUrl:z.string().url().refine(value=>value.startsWith('https://'),'Use an HTTPS URL.'),
 walkthroughTitle:short,walkthroughIntro:text,
 walkthroughs:z.array(z.object({title:short,description:text,src:media,poster:media}).strict()).min(1).max(4)
}).strict().default(()=>structuredClone(defaultFintechIrmp));
export type FintechIrmp=z.infer<typeof fintechIrmpSchema>;
