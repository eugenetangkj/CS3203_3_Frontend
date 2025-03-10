import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { COOKIE_JWT_TOKEN, COOKIE_USER_OID } from '@/constants/Constants';

/**
API Endpoint for signing out where we delete the JWT token stored in the browser cookie.

Adapted from https://nextjs.org/docs/app/api-reference/functions/cookies#deleting-cookies
*/

export async function POST() {
    const cookieStore = await cookies()
    cookieStore.delete(COOKIE_JWT_TOKEN)
    cookieStore.delete(COOKIE_USER_OID)

    // Return a response after logging out
    return NextResponse.json({ message: "Signed out successfully" });
}
