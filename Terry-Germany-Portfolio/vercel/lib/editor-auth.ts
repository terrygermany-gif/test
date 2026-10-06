import { createHash, timingSafeEqual } from 'node:crypto';
import { storageConfigured } from './r2-bucket';
export function editorConfigured() {
 return storageConfigured() && (process.env.PORTFOLIO_EDITOR_PASSWORD?.length ?? 0) >= 32;
}
export function validEditorAuthorization(value: string | null) {
 if (!editorConfigured() || !value?.startsWith('Basic ')) return false;
 const credentials = Buffer.from(value.slice(6), 'base64').toString('utf8');
 const expected = `${process.env.PORTFOLIO_EDITOR_USERNAME || 'terry'}:${process.env.PORTFOLIO_EDITOR_PASSWORD}`;
 const hash = (s:string) => createHash('sha256').update(s).digest();
 return timingSafeEqual(hash(credentials), hash(expected));
}
