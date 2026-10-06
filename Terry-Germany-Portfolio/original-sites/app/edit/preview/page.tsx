import { requireChatGPTUser } from '@/app/chatgpt-auth';
import { isPortfolioOwner } from '@/lib/editor-owner';
import { editorDocuments } from '@/lib/portfolio-store';
import { contentProjects } from '@/lib/portfolio-content';
import { PortfolioContentProvider } from '@/components/portfolio-content-provider';
import { CaseStudyProvider } from '@/components/case-study-viewer';
import { ProjectStudyPage } from '@/components/project-study';
import Portfolio from '@/components/portfolio';
import PreviewKeyboard from '@/components/preview-keyboard';
import WorkPage from '@/components/work-page';
export const dynamic='force-dynamic';
async function DraftPreview({project,view}:{project?:string;view?:string}){await requireChatGPTUser('/edit/preview');if(!await isPortfolioOwner())return <main className="editor-denied"><h1>Owner access required</h1></main>;try{const {draft}=await editorDocuments();const selected=contentProjects(draft.content).find(p=>p.slug===project);return <PortfolioContentProvider content={draft.content} preview canEdit><CaseStudyProvider><PreviewKeyboard/><div className="draft-preview-label">Draft preview · Changes are not live</div>{selected?<ProjectStudyPage project={selected}/>:view==="work"?<WorkPage/>:<Portfolio/>}</CaseStudyProvider></PortfolioContentProvider>;}catch{return <main className="editor-denied"><h1>Preview unavailable</h1><p>Your draft could not load. Return to the editor and try again.</p></main>;}}
export default async function PreviewPage({searchParams}:{searchParams:Promise<{project?:string;view?:string}>}){const params=await searchParams;return <DraftPreview project={params.project} view={params.view}/>;}
