import {z} from 'zod';

const short=z.string().trim().min(1).max(400),text=z.string().trim().min(1).max(8000);
const media=z.string().regex(/^\/(api\/portfolio-media\/[0-9a-f-]{36}|work\/[a-zA-Z0-9_.-]+)$/);
const note=z.object({title:short,description:text}).strict();
const artifact=z.object({title:short,description:text,image:media,alt:short}).strict();
export const defaultAppleSimulatorUrl='https://apple-music-simulator-2022.figma.site/';
const simulatorUrl=z.string().trim().max(2000).refine(value=>{
 if(value==='')return true;
 try{const url=new URL(value);return url.protocol==='https:'&&url.hostname.endsWith('.figma.site')&&!url.username&&!url.password&&!url.port;}catch{return false;}
},'Use an HTTPS Figma Sites URL, or leave blank for the hero image.');
const asset=(name:string)=>'/work/apple-music-'+name;

export const defaultAppleMcpFlow={
 title:'From design context to a working UI.',
 intro:'A natural-language prompt connects design intent, component knowledge, and code through an AI assistant and a local MCP server.',
 prompt:'Create a compact listening view using our existing components.',
 stages:[
  {title:'Design context',subtitle:'Figma + your prompt',detail:'Describe the UI you need and provide the relevant design context: layout, components, and interaction intent.'},
  {title:'AI + MCP',subtitle:'Local context connection',detail:'The AI assistant uses Model Context Protocol (MCP) to discover available tools and retrieve design and component context.'},
  {title:'Components + code',subtitle:'Storybook + repository',detail:'Storybook supplies component documentation and states. With permitted code tools, the assistant can apply changes using the existing codebase.'},
  {title:'UI preview',subtitle:'Review + refine',detail:'Review the resulting interface, check its behavior, and refine the prompt before changes move toward release.'}
 ],
 accelerations:[
  {title:'Design → development',description:'Carry design intent and reusable patterns into the implementation context.'},
  {title:'Development → product UI',description:'Use existing components to move from a request to a preview that can be reviewed and refined.'}
 ],
 note:'Workflow illustration · Preview and review before release.'
};

export const defaultAppleDecisionStory={
 evidenceVersion:2 as const,
 title:'Problem → My decision → Result',
 problem:'Explore improvements to listening and discovery while working within Apple Music’s established interface patterns.',
 decision:'I connected research and flow mapping with sketches and Now Playing prototypes, and converted the Sketch work into reusable Figma foundations.',
 result:'I delivered interface explorations, user flows, interaction prototypes, and a Figma design system with shared libraries.',
 evidenceTitle:'Explore the supporting designs',
 evidence:[
  {title:'Listening experience wireframes',description:'Original hand-drawn explorations of library navigation, playlists, playback controls, and screen transitions.',image:asset('apple-sketch-2.png'),alt:'Original Apple Music hand-drawn wireframe board showing library, playlist, and playback interface ideas'},
  {title:'Navigation and flow mapping',description:'The original navigation map documents the connections between interface states considered in the design work.',image:asset('USER-FLOW-NAVIGATION-scaled-1.webp'),alt:'Original Apple Music navigation user-flow map'},
  {title:'Listening interaction notes',description:'Annotated Apple Music screens explore playback controls, library actions, and navigation details.',image:asset('apple-sketch2-scaled.jpg'),alt:'Original Apple Music screens with handwritten annotations around playback, library, and discovery controls'}
 ]
};

// Original project: https://redhatdigital.com/portfolio/apple-music-ui-enhancement-main/
// MCP/repository contribution was confirmed by Terry in the import request.
// No launch metrics or undocumented automation results are inferred.
export const defaultAppleMusic={
 mcpFlow:structuredClone(defaultAppleMcpFlow),
 heroSimulatorUrl:defaultAppleSimulatorUrl,
 cardCompany:'Apple Music',cardTitle:'Apple Music, from experience to design system.',
 cardDescription:'Lead product design, a Sketch-to-Figma design-system migration, and an MCP-connected repository workflow.',
 cardImage:asset('Apple-Music-portfolio-THUMBNAIL.jpg'),cardAlt:'Apple Music UI enhancement portfolio artwork with mobile interface designs',
 client:'Apple',role:'Lead Product Designer · Consultant',timeline:'5 months',tools:'Sketch, Figma, Jira, Miro, MCP',
 decisionStory:structuredClone(defaultAppleDecisionStory),
 overview:'I led product design across Apple Music experience improvements and the design foundations behind the work. The scope combined interface exploration, research and prototyping with a move from Sketch to Figma and a connected design-to-code workflow.',
 contributionTitle:'Experience, systems, and implementation context.',
 contributions:[
  {title:'Product experience',description:'Led interface exploration, user-centered design and rapid prototyping, working within Apple Music’s established patterns across desktop and mobile.'},
  {title:'Sketch → Figma',description:'Converted Sketch design work into a Figma design system and shared libraries, bringing reusable design foundations into the new workflow.'},
  {title:'MCP → repository',description:'Connected MCP-assisted workflows with the code repository so design and implementation context could be reviewed together.'}
 ],
 galleryTitle:'From exploration to the listening experience.',
 galleryIntro:'Original project artifacts show the Now Playing direction and the Sketch explorations behind the interface work. Open a design for a closer look.',
 gallery:[
  {title:'Now Playing',description:'Original interface explorations for the listening experience.',image:asset('apple1a-portfolio-2-1.jpg'),alt:'Apple Music Now Playing explorations shown on two phones'},
  {title:'Interaction sketches',description:'Annotated sketches explore how the interface and controls could work together.',image:asset('apple-sketch2-scaled.jpg'),alt:'Annotated Apple Music interface sketches'},
  {title:'Sketch exploration board',description:'A broader view of the original Sketch explorations.',image:asset('apple-sketch-2.png'),alt:'Apple Music Sketch exploration board'}
 ],
 workflowTitle:'A connected path from design to code.',
 workflowIntro:'A summary of my Sketch-to-Figma migration and MCP/repository work. Expand a stage for context.',
 workflow:[
  {title:'Sketch',description:'The existing Sketch work provided the starting point for the migration.'},
  {title:'Figma system',description:'Rebuilt the design foundations as a Figma design system and shared libraries.'},
  {title:'MCP',description:'Connected MCP (Model Context Protocol) workflows with the repository to share relevant design and implementation context.'},
  {title:'Repository',description:'Connected the workflow with the repository to support the move from design intent to implementation.'}
 ],
 researchTitle:'Research & supporting flows',
 researchIntro:'Research explored listening and discovery needs, compared streaming features, and informed task flows and low-fidelity exploration. The work considered how new interactions could fit Apple Music’s existing design patterns.',
 research:[
  {title:'Login flow',description:'Original user-flow artifact for access and entry into the experience.',image:asset('USER-FLOW-LOGIN-scaled.jpg'),alt:'Apple Music login user-flow diagram'},
  {title:'Navigation flow',description:'Original map of navigation and the connections between interface states.',image:asset('USER-FLOW-NAVIGATION-scaled-1.webp'),alt:'Apple Music navigation user-flow diagram'}
 ],
 motionTitle:'Explore the interaction.',motionNote:'Play the original interaction preview when you want to see the listening flow in motion.',
 motion:{src:asset('UPNEXT.gif'),poster:asset('apple1a-portfolio-2-1.jpg'),kind:'image' as 'image'|'video',alt:'Apple Music interaction preview showing the Now Playing and Up Next experience'},
 prototypeUrl:'',
 closing:'I connected hands-on interface design with shared design foundations and an MCP-assisted path toward implementation.'
};

export const appleMusicSchema=z.object({
 mcpFlow:z.object({title:short,intro:text,prompt:text,stages:z.array(z.object({title:short,subtitle:short,detail:text}).strict()).length(4),accelerations:z.array(note).length(2),note:short}).strict().default(()=>structuredClone(defaultAppleMcpFlow)),
 decisionStory:z.object({evidenceVersion:z.union([z.literal(1),z.literal(2)]).optional(),title:short,problem:text,decision:text,result:text,evidenceTitle:short,evidence:z.array(artifact).min(1).max(6)}).strict().default(()=>structuredClone(defaultAppleDecisionStory)).transform(story=>{
  const evidence=story.evidenceVersion?story.evidence:story.evidence.map(item=>item.title==='Listening experience exploration'&&item.image===asset('apple1a-portfolio-2-1.jpg')?{...defaultAppleDecisionStory.evidence[0],description:item.description==='The original Now Playing designs show the interface direction explored through prototyping.'?defaultAppleDecisionStory.evidence[0].description:item.description}:item);
  const addition=defaultAppleDecisionStory.evidence[2];
  return {...story,evidenceVersion:2 as const,evidence:story.evidenceVersion===2||evidence.length>=6||evidence.some(item=>item.image===addition.image)?evidence:[...evidence,structuredClone(addition)]};
 }),
 heroSimulatorUrl:simulatorUrl.default(defaultAppleSimulatorUrl),
 cardCompany:short,cardTitle:short,cardDescription:text,cardImage:media,cardAlt:short,
 client:short,role:short,timeline:short,tools:short,overview:text,
 contributionTitle:short,contributions:z.array(note).min(1).max(6),
 galleryTitle:short,galleryIntro:text,gallery:z.array(artifact).min(1).max(12),
 workflowTitle:short,workflowIntro:text,workflow:z.array(note).min(2).max(6),
 researchTitle:short,researchIntro:text,research:z.array(artifact).min(1).max(8),
 motionTitle:short,motionNote:text,motion:z.object({src:media,poster:media,kind:z.enum(['image','video']),alt:short}).strict(),
 prototypeUrl:z.union([z.literal(''),z.string().url().refine(value=>value.startsWith('https://'),'Use an HTTPS URL.')]),closing:text
}).strict().default(()=>structuredClone(defaultAppleMusic));
export type AppleMusic=z.infer<typeof appleMusicSchema>;
