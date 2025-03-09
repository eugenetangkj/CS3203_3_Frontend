import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_JWT_TOKEN } from '@/constants/Constants';
import { SIGN_IN_WEB_APP_ROUTE, SIGN_UP_WEB_APP_ROUTE, PROFILE_WEB_APP_ROUTE } from './constants/WebAppRoutes';

export async function middleware(request: Request) {
    // Check if the user has the JWT token in cookies
    const cookieStore = await cookies()
    const hasCookie = cookieStore.has(COOKIE_JWT_TOKEN)

    //Rule 1: Users with JWT token should not be able to access sign in and sign up pages
    if (hasCookie && (request.url.includes(SIGN_IN_WEB_APP_ROUTE) || request.url.includes(SIGN_UP_WEB_APP_ROUTE))) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    //Rule 2: Users without JWT token should not be able to access profile page
    if (!hasCookie && (request.url.includes(PROFILE_WEB_APP_ROUTE))) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Pass all the rules, so just proceed as per usual
    return NextResponse.next();
}

// Routes to be protected by the auth middleware
export const config = {
    //Cannot use variables as properties must be statically parsed at compiled time
    matcher: ['/sign-in', '/sign-up', '/profile']
};
