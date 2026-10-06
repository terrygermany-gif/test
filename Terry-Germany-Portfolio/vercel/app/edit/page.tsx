import { isPortfolioOwner } from '@/lib/editor-owner';
import PortfolioEditor from '@/components/portfolio-editor';
export const dynamic='force-dynamic';
export default async function EditPage(){if(!await isPortfolioOwner())return <main className="editor-denied"><h1>Owner access required</h1><p>Only Terry can edit this portfolio.</p><a href="/">Return to portfolio</a></main>;return <PortfolioEditor/>;}
