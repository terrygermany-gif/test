import {z} from 'zod';
const short=z.string().trim().min(1).max(400),text=z.string().trim().min(1).max(8000);
const media=z.string().regex(/^\/(api\/portfolio-media\/[0-9a-f-]{36}|work\/[a-zA-Z0-9_.-]+)$/);
const note=z.object({title:short,description:text}).strict();
const artifact=z.object({title:short,description:text,image:media,alt:short}).strict();
const link=z.union([z.literal(''),z.string().url().refine(value=>{try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password;}catch{return false;}},'Use an HTTPS URL without embedded credentials.')]);
const image=(name:string)=>'/work/neurotrade-'+name;
export const defaultNeurotrade={
 cardCompany:'NeuroTrade',cardTitle:'Making AI trading easier to understand.',
 cardDescription:'Research, UX and UI design for AI trading agents, bot setup, and personal portfolio tracking.',
 cardImage:image('NeuroTrade-1-Dashboard-1024x728.png'),cardAlt:'NeuroTrade dashboard showing portfolio assets, bot choices, and account activity',
 client:'NeuroTrade',role:'Principal Product Designer',timeline:'2 weeks',tools:'Figma, FigJam, Framer',
 status:'Design & prototype',
 overview:'I led research, UX, and UI design for an AI-assisted trading experience, connecting onboarding, exchange setup, bot configuration, and portfolio monitoring. My focus was making complex automation easier to understand and giving people a clearer view of their assets and activity.',
 decisionStory:{title:'Complex automation. Clearer decisions.',problem:'Trading platforms can overwhelm people with dense information, unfamiliar controls, and uncertainty about AI-driven decisions.',decision:'I organized the experience around distinct tasks: understand the portfolio, choose a bot, configure its settings, then monitor its activity.',result:'I delivered onboarding flows, dashboard and trading interfaces, AI / DCA / signal-bot screens, and an interactive Figma prototype.',evidenceTitle:'Explore the supporting designs',evidence:[
  {title:'One portfolio overview',description:'The dashboard brings account balance, assets, bot options, and activity into one starting point.',image:image('NeuroTrade-1-Dashboard-1024x728.png'),alt:'NeuroTrade dashboard with assets, account balance, and AI, DCA, and signal bot options'},
  {title:'Make automation configurable',description:'The AI bot setup exposes the exchange account, risk selection, and investment amount before creation.',image:image('NeuroTrade-AI-Bots-1-1024x728.png'),alt:'Create AI Bot panel with exchange account, risk selection, and investment amount'},
  {title:'Keep active bots visible',description:'Bot cards show active status, investment, runtime, trade count, and realized versus unrealized performance, with an edit action.',image:image('NeuroTrade-AI-Bots-2-1024x728.png'),alt:'AI bot management view with active status, runtime, investment, and edit controls'}
 ]},
 contributionTitle:'Research, interaction design, and the visual system.',contributions:[
  {title:'Research & discovery',description:'Reviewed MVP requirements, explored the AI trading market, and used trader interviews, surveys, personas, and competitor analysis to identify complexity and trust concerns.'},
  {title:'UX & agent workflows',description:'Mapped onboarding and account access, then designed exchange connection, bot configuration, trading, and portfolio monitoring as connected tasks.'},
  {title:'UI & prototyping',description:'Created the visual interface, data displays, high-fidelity screens, and prototype, with reusable design foundations for responsive layouts and dark / light themes.'}
 ],
 agentTitle:'From AI capability to a workflow people can follow.',
 agentIntro:'I translated AI-assisted trading into visible setup and monitoring steps. I made the automated workflow visible through bot configuration, activation, and ongoing oversight.',
 agentStages:[
  {title:'Connect',description:'Choose an exchange account and establish the connection before configuring a bot.'},
  {title:'Configure',description:'Select the bot approach, risk setting, investment amount, and relevant trading parameters.'},
  {title:'Activate',description:'Move through the setup and activation states so the transition into automation is visible.'},
  {title:'Monitor',description:'Return to active-bot cards and portfolio views to inspect activity, investment, runtime, and performance.'}
 ],
 personalTitle:'A personal view across stocks and digital assets.',
 personalIntro:'My broader product direction brings stock tracking and digital-asset monitoring into a personal workspace: what I hold, what has changed, and which automated strategies need attention.',
 personalNote:'The original screens shown here focus on crypto trading and bot management; the stock-tracking scope extends that direction.',
 personalFocus:[{title:'Portfolio context',description:'Keep holdings, account activity, and relevant market information connected to the person’s own portfolio.'},{title:'Automation with oversight',description:'Separate bot setup from monitoring so people can understand the configuration and revisit ongoing activity.'}],
 galleryTitle:'Explore the trading workspace.',galleryIntro:'Browse the original product screens, from the portfolio overview to exchange connection and bot setup.',
 gallery:[
  {title:'Portfolio dashboard',description:'Portfolio assets, account balance, activity, and entry points into the bot workflows.',image:image('NeuroTrade-1-Dashboard-1024x728.png'),alt:'NeuroTrade portfolio dashboard'},
  {title:'Trading workspace',description:'A dedicated workspace for charts, market pairs, order information, and trading controls.',image:image('1-NeuroTrade-Trading-1024x1018.png'),alt:'NeuroTrade trading screen with market chart and order information'},
  {title:'Connect an exchange',description:'The exchange selection step before bot configuration.',image:image('NeuroTrade-Connect-an-exchange-1024x728.png'),alt:'NeuroTrade exchange connection screen'},
  {title:'Connection confirmed',description:'A connection-success state carries the user into the next task.',image:image('NeuroTrade-Connection-Successful-1024x728.png'),alt:'NeuroTrade successful exchange connection state'},
  {title:'DCA bot overview',description:'A separate view for dollar-cost averaging bot activity.',image:image('NeuroTrade-DCA-Bots-1024x728.png'),alt:'NeuroTrade DCA bot management view'},
  {title:'Configure a DCA bot',description:'Exchange, strategy, trading pair, and entry-order controls alongside a market chart.',image:image('NeuroTrade-Create-DCA-Bot-1024x728.png'),alt:'NeuroTrade Create DCA Bot screen'},
  {title:'Bot activated',description:'The original activation state in the bot setup journey.',image:image('NeuroTrade-NeuroTrade-Bot-Activated-1024x728.png'),alt:'NeuroTrade bot activated confirmation'},
  {title:'Create a signal bot',description:'A dedicated configuration screen for signal-based automation.',image:image('NeuroTrade-Creat-Signal-Bot-1024x728.png'),alt:'NeuroTrade Create Signal Bot screen'},
  {title:'Signal bot overview',description:'A management view for signal-based bot activity.',image:image('NeuroTrade-Signal-Bot-1024x728.png'),alt:'NeuroTrade signal bot management view'},
  {title:'AI bot starting state',description:'The initial AI bot view before creating an automated strategy.',image:image('NeuroTrade-AI-Bots-1024x728.png'),alt:'NeuroTrade AI bot starting state'},
  {title:'Configure an AI bot',description:'Exchange, risk selection, and investment controls in a focused panel.',image:image('NeuroTrade-AI-Bots-1-1024x728.png'),alt:'NeuroTrade AI bot creation panel'},
  {title:'Monitor AI bots',description:'Active status, runtime, investment, performance, and edit controls for each bot.',image:image('NeuroTrade-AI-Bots-2-1024x728.png'),alt:'NeuroTrade active AI bot cards'},
  {title:'Marketplace',description:'The original marketplace exploration within the broader trading product.',image:image('NeuroTrade-Marketplace-1024x797.png'),alt:'NeuroTrade marketplace interface'}
 ],
 artifactNote:'Original design artifacts · Figures inside the screens are sample interface data, not verified investment returns or project outcome metrics.',
 researchTitle:'Research & supporting flows',researchIntro:'The project account describes market and competitor research, trader interviews and surveys, and personas spanning casual investors, advanced traders, and AI enthusiasts. The key concerns were interface complexity, trust in automated decisions, and the learning curve for beginners.',
 research:[
  {title:'Account access & recovery',description:'Original FigJam flow showing PIN and password sign-in paths, notification checks, and recovery decisions.',image:image('NeuroTrade-bots-FIGJAM2.png'),alt:'Original FigJam login flow with PIN, password, and account recovery paths'},
  {title:'Sign-up & verification',description:'Original FigJam flow showing registration, account review, verification, and the route into login.',image:image('NeuroTrade-bots-FIGJAM.png'),alt:'Original FigJam registration and verification user flow'}
 ],
 validationTitle:'What I would validate next.',validationIntro:'The next evaluation would test whether people understand the setup and can monitor automation with confidence. These are evaluation priorities, not measured project results.',
 validation:[{title:'Setup comprehension',description:'Can a participant explain the selected account, risk setting, and investment before creating a bot?'},{title:'Monitoring clarity',description:'Can they identify an active bot, distinguish realized from unrealized performance, and find its edit controls?'},{title:'Recovery & control',description:'Can they recover from a connection problem and understand the next available action?'}],
 prototypeUrl:'https://www.figma.com/proto/EYSj0ixlf5H9IliRkR13KQ/NeuroTrade---AI-Crypto-Trading---Portfolio?content-scaling=fixed&node-id=4740-58698&page-id=4740%3A47466&scaling=contain&t=5qXeQFVYwM7gQjcI-1&viewport=3992%2C227%2C0.25',
 prototypeNote:'Explore the original Figma prototype. Figma access may be required.',
 closing:'I designed the connection between intelligent automation and the person using it: clearer setup, visible activity, and a more understandable trading workspace.'
};
export const neurotradeSchema=z.object({
 cardCompany:short,cardTitle:short,cardDescription:text,cardImage:media,cardAlt:short,client:short,role:short,timeline:short,tools:short,status:short,overview:text,
 decisionStory:z.object({title:short,problem:text,decision:text,result:text,evidenceTitle:short,evidence:z.array(artifact).min(1).max(6)}).strict(),
 contributionTitle:short,contributions:z.array(note).min(1).max(6),agentTitle:short,agentIntro:text,agentStages:z.array(note).length(4),personalTitle:short,personalIntro:text,personalNote:text,personalFocus:z.array(note).min(1).max(4),
 galleryTitle:short,galleryIntro:text,gallery:z.array(artifact).min(1).max(20),artifactNote:text,researchTitle:short,researchIntro:text,research:z.array(artifact).min(1).max(8),validationTitle:short,validationIntro:text,validation:z.array(note).min(1).max(6),prototypeUrl:link,prototypeNote:text,closing:text
}).strict().default(()=>structuredClone(defaultNeurotrade));
export type Neurotrade=z.infer<typeof neurotradeSchema>;
