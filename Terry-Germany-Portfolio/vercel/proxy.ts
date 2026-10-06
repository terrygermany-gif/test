import { NextRequest, NextResponse } from 'next/server';
import { editorConfigured, validEditorAuthorization } from './lib/editor-auth';
export function proxy(request:NextRequest) {
 if (!editorConfigured()) return new NextResponse('Editor unavailable. Configure R2 storage and an editor password first.', {status:503});
 if (!validEditorAuthorization(request.headers.get('authorization'))) return new NextResponse('Owner sign-in required.', {status:401,headers:{'WWW-Authenticate':'Basic realm="Portfolio editor", charset="UTF-8"','Cache-Control':'no-store'}});
 return NextResponse.next();
}
export const config={matcher:['/edit/:path*']};
