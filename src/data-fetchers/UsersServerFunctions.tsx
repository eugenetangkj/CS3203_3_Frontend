"use server"

import { COOKIE_JWT_TOKEN, COOKIE_USER_OID, COOKIE_USER_ROLE } from "@/constants/Constants";
import { UserCookies } from "@/types/User";
import { cookies } from "next/headers";


//Set cookies after signing in
export const setCookiesForSigningIn = async (jwtToken: string, userOid: string, userRole: string) => {
    const cookieStore = await cookies()
    cookieStore.set({
        name: COOKIE_JWT_TOKEN,
        value: jwtToken,
        httpOnly: true,
        path: '/',
    })
    cookieStore.set({
        name: COOKIE_USER_OID,
        value: userOid,
        httpOnly: true,
        path: '/',
    })
    cookieStore.set({
        name: COOKIE_USER_ROLE,
        value: userRole,
        httpOnly: true,
        path: '/',
    })

}

//Set cookies after signing out
export const setCookiesForSigningOut = async () => {
    const cookieStore = await cookies()
    cookieStore.delete(COOKIE_JWT_TOKEN)
    cookieStore.delete(COOKIE_USER_OID)
    cookieStore.delete(COOKIE_USER_ROLE)
}

//Get the user's auth cookies
export const getUserAuthCookies = async () : Promise<UserCookies> => {
    const cookieStore = await cookies()
    const hasJwtTokenCookie = cookieStore.has(COOKIE_JWT_TOKEN)
    const hasUserOidCookie = cookieStore.has(COOKIE_USER_OID)

    const jwtToken = (hasJwtTokenCookie)
                     ? cookieStore.get(COOKIE_JWT_TOKEN)?.value || ''
                     : ''

    const userOid = (hasUserOidCookie)
                        ? cookieStore.get(COOKIE_USER_OID)?.value || ''
                        : ''

    return {
        'jwtToken': jwtToken,
        'userOid': userOid
    }
}