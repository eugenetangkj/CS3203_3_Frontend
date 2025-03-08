import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { COOKIE_JWT_TOKEN } from '@/constants/Constants';

/**
API Endpoint for signing out where we delete the cookie JWT token
*/

export async function POST() {
    (await cookies()).delete(COOKIE_JWT_TOKEN)

    // Return a response after logging out
    return NextResponse.json({ message: "Signed out successfully" });
}
