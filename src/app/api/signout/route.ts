import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { COOKIE_JWT_TOKEN } from '@/constants/Constants';

/**
API Endpoint for signing out where we delete the JWT token stored in the browser cookie.

Adapted from https://nextjs.org/docs/app/api-reference/functions/cookies#deleting-cookies
*/

export async function POST() {
    (await cookies()).delete(COOKIE_JWT_TOKEN)

    // Return a response after logging out
    return NextResponse.json({ message: "Signed out successfully" });
}
