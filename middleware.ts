import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { B2BClient } from 'stytch';
import allowedUsers from './allowedUsers';


if (!process.env.STYTCH_PROJECT_ID || !process.env.STYTCH_SECRET) {
    throw new Error('Missing Stytch environment variables');
}
const client = new B2BClient({
    project_id: process.env.STYTCH_PROJECT_ID,
    secret: process.env.STYTCH_SECRET,
});

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    try {
    const session = await client.sessions.authenticate({
        session_token: request.cookies.get("stytch_session")?.value,
    })

    if (!session) return NextResponse.redirect(new URL('/app/authenticate', request.url))
    if (!allowedUsers.includes(session.member.email_address)) return NextResponse.error()
    if (request.url.includes("/admin") && session.organization.organization_id !== process.env.NEXT_PUBLIC_ADMIN_ORG) return NextResponse.error()
    if (request.url.includes("/dashboard") && session.organization.trusted_metadata?.choice_bank_status !== "approved") return NextResponse.redirect(new URL('/app/add-bank-info', request.url))
        
    return NextResponse.next()
    } catch (error) {
        console.error(error)
        return NextResponse.redirect(new URL('/app/authenticate', request.url))
    }
}

export const config = {
    matcher: ['/app/dashboard/:path*', '/app/add-bank-info', '/app/admin/:path*'],
}