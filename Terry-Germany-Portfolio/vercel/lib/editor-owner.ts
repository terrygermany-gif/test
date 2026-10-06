import { headers } from 'next/headers';
import { validEditorAuthorization } from './editor-auth';
export async function isPortfolioOwner() {
 return validEditorAuthorization((await headers()).get('authorization'));
}
