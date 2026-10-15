import {z} from 'zod';

const short=z.string().trim().min(1).max(400);
const text=z.string().trim().min(1).max(8000);
const media=z.string().regex(/^\/(api\/portfolio-media\/[0-9a-f-]{36}|work\/[a-zA-Z0-9_.-]+)$/);
const artifact=z.object({title:short,description:text,image:media,alt:short}).strict();
const note=z.object({title:short,description:text}).strict();
export const defaultAvailityEssentials={
  client:'Elevance Health',role:'Product design · Research to visualization',timeline:'1.5 months',tools:'Figma, FigJam, Miro',
  overview:'A healthcare information network connecting eligibility, authorizations, claims, and remittances. I worked across research, workflow design, UI, and data visualization to make complex information easier to navigate.',
  researchTitle:'Understanding the work behind healthcare decisions',
  researchIntro:'The research explored digital interactions and habits, then translated those observations into UI and UX direction, wireframes, and high-fidelity prototypes.',
  methods:[
    {title:'Understand users',description:'Study digital interactions and habits to understand how people work across healthcare information and operational tasks.'},
    {title:'Map the experience',description:'Use personas, sitemaps, and wireframes to connect user needs with the product’s goals.'},
    {title:'Make the direction tangible',description:'Build high-fidelity prototypes and supporting visual assets to explore the proposed experience.'}
  ],
  auditTitle:'Evaluate the product before defining the solution',
  auditIntro:'A product audit reviewed usability heuristics and the enterprise design framework, identified problem areas, and informed design recommendations.',
  audit:[
    {title:'Heuristic evaluation',description:'Review the interface against usability principles and identify where the experience creates friction.'},
    {title:'Overall findings',description:'Bring observations together to clarify problem areas and opportunities for the design.'},
    {title:'Enterprise design validation',description:'Consider the existing design framework and validate the direction against enterprise needs.'}
  ],
  directionTitle:'Connect workflows, data, and decisions',
  directionIntro:'The design exploration brought direct data entry and data visualization together, from eligibility and authorizations to claims and remittances. The clinical-data concept explored how teams could review information and support decision-making.',
  prototypeImage:'/work/availity-availity-img-iphones-3.png',prototypeAlt:'Availity Essentials mobile screens presented on three phones',
  workflowTitle:'From information to connected workflows',workflowIntro:'Original workflow artifacts show the starting points behind the product direction.',
  prototypeUrl:'https://www.figma.com/proto/aNCW7O2L29U7wznCdnZdih/IR---Project-Wirth?mode=design&node-id=2046-83576&page-id=2046%3A77693&scaling=scale-down&starting-point-node-id=2046%3A83576',
  prototypeNote:'Explore the original high-fidelity design prototype in Figma. Access may require signing in. These visuals document design explorations; no measured production outcomes are presented.',
  workflows:['availity-workflow1','availity-workflow3','availity-workflow2','availity-workflow5'].map((name,i)=>({title:'Workflow exploration '+(i+1),description:'Original workflow artifact from the Availity Essentials project.',image:'/work/availity-'+name+'.png',alt:'Availity Essentials workflow exploration '+(i+1)})),
  desktopTitle:'Desktop experience',desktopIntro:'Dashboard and data visualization explorations for the desktop experience.',
  desktop:['Dashboard-V1','Dashboard-v2'].map((name,i)=>({title:'Dashboard direction '+(i+1),description:'A desktop dashboard exploration from the original project.',image:'/work/availity-'+name+'.png',alt:'Availity Essentials desktop dashboard direction '+(i+1)})),
  mobileTitle:'Mobile experience',mobileIntro:'Mobile interface explorations showing how the experience carries across smaller screens.',
  mobile:['21','23','26','24','25','20','22'].map((name,i)=>({title:'Mobile exploration '+(i+1),description:'A mobile interface artifact from the original project.',image:'/work/availity-avaibility-iphone-'+name+'.png',alt:'Availity Essentials mobile interface exploration '+(i+1)})),
  closing:'The work connected research, an enterprise product audit, workflow design, and visual prototyping into one product direction.'
};
export const availityEssentialsSchema=z.object({
 client:short,role:short,timeline:short,tools:short,overview:text,
 researchTitle:short,researchIntro:text,methods:z.array(note).min(1).max(6),
 auditTitle:short,auditIntro:text,audit:z.array(note).min(1).max(6),
 directionTitle:short,directionIntro:text,
 prototypeUrl:z.string().url().refine(value=>value.startsWith('https://'),'Use an HTTPS URL.'),
 prototypeImage:media,prototypeAlt:short,workflowTitle:short,workflowIntro:text,
 prototypeNote:text,workflows:z.array(artifact).min(1).max(8),
 desktopTitle:short,desktopIntro:text,desktop:z.array(artifact).min(1).max(8),
 mobileTitle:short,mobileIntro:text,mobile:z.array(artifact).min(1).max(12),closing:text
}).strict().default(()=>structuredClone(defaultAvailityEssentials));
export type AvailityEssentials=z.infer<typeof availityEssentialsSchema>;
