
import { NextResponse } from "next/server";
import { COOKIE_JWT_TOKEN, COOKIE_USER_OID } from "@/constants/Constants";
import { cookies } from "next/headers";


/**
API route to check if the user is signed in by looking for the existence of the cookie, and if he is signed in, returns the role
of the user

*/
export async function POST(request: Request) {
    const cookieStore = await cookies()
    const hasJwtTokenCookie = cookieStore.has(COOKIE_JWT_TOKEN)
    const hasUserOidCookie = cookieStore.has(COOKIE_USER_OID)

    const userOid = (hasUserOidCookie)
                    ? cookieStore.get(COOKIE_USER_OID)?.value
                    : ''

    return NextResponse.json({ isAuthenticated: hasJwtTokenCookie, userOid: userOid })
}