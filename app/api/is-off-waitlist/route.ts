import allowedUsers from '@/allowedUsers';
import { NextRequest } from 'next/server';

// /Users/ian/Development/cowrie/app/api/allowedUsers.ts
export async function POST(req: NextRequest) {
    const { email } = await req.json();
    console.log(email)
    if (allowedUsers.includes(email)) {
        return new Response(JSON.stringify({ message: 'User is allowed', isAllowed: true }));
    } else {
        return new Response(JSON.stringify({ message: 'User is not allowed', isAllowed: false }));
    }
}