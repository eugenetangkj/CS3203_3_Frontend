import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_JWT_TOKEN, COOKIE_USER_OID } from '@/constants/Constants';
import { SIGN_IN_WEB_APP_ROUTE, SIGN_UP_WEB_APP_ROUTE, PROFILE_WEB_APP_ROUTE, ADMIN_PROTECTED_ROUTES } from './constants/WebAppRoutes';
import axios from 'axios';
import { UserRoleEnum } from './types/User';
import { API_BASE_URL_USER_MANAGEMENT, GET_PROFILE_BY_OID_ENDPOINT } from './constants/ApiRoutes';

export async function middleware(request: Request) {
    // Check if the user has the JWT token in cookies
    const cookieStore = await cookies()
    const hasJwtTokenCookie = cookieStore.has(COOKIE_JWT_TOKEN)

    //Rule 1: Users with JWT token should not be able to access sign in and sign up pages
    if (hasJwtTokenCookie && (request.url.includes(SIGN_IN_WEB_APP_ROUTE) || request.url.includes(SIGN_UP_WEB_APP_ROUTE))) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    //Rule 2: Users without JWT token should not be able to access profile page
    if (!hasJwtTokenCookie && (request.url.includes(PROFILE_WEB_APP_ROUTE))) {
        return NextResponse.redirect(new URL('/', request.url));
    }


    // Get user oid cookie
    const hasUserOidCookie = cookieStore.has(COOKIE_USER_OID)
    if (!hasUserOidCookie && hasJwtTokenCookie) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    const userOid = cookieStore.get(COOKIE_USER_OID)?.value

    //Obtain user role
    let userRole = UserRoleEnum.Citizen
    try {
        const getProfileApiEndpoint = API_BASE_URL_USER_MANAGEMENT + '/' + GET_PROFILE_BY_OID_ENDPOINT
        const userData = await axios.post(getProfileApiEndpoint,
            {
                "oid": userOid,
            }
        )
        userRole = userData.data.role
    } catch (error) {
        console.error(error)
        userRole = UserRoleEnum.Citizen
    }


    //Rule 3: Users not an admin cannot access an admin protected route
    const isProtectedRoute = ADMIN_PROTECTED_ROUTES.some(route => request.url.includes(route));
    if (userRole !== UserRoleEnum.Admin && isProtectedRoute) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    

    // Pass all the rules, so just proceed as per usual
    return NextResponse.next();
}

// Routes to be protected by the auth middleware
export const config = {
    //Cannot use variables as properties must be statically parsed at compiled time
    matcher: ['/sign-in', '/sign-up', '/profile', '/all-complaints', '/categories/:path*', '/analytics', '/create-admin']
};
