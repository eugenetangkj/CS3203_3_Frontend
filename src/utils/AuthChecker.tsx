import { COOKIE_JWT_TOKEN, COOKIE_USER_OID } from "@/constants/Constants";
import { cookies } from "next/headers";
import { API_BASE_URL_USER_MANAGEMENT, GET_PROFILE_BY_OID_ENDPOINT } from "@/constants/ApiRoutes";
import { UserRoleEnum } from "@/types/User";


//Determines if the user is an admin, citizen or not signed in. Note that this is a server-side function.
export const determineUserRole = async () => {
    try {
        const cookieStore = await cookies()
        const hasUserOidCookie = cookieStore.has(COOKIE_USER_OID)
        
        const userOid = (hasUserOidCookie)
            ? cookieStore.get(COOKIE_USER_OID)?.value
            : ''
        
        if (userOid === '') {
            return UserRoleEnum.None
        }

        // Fetch user profile
        const userDataResponse = await fetch(`${API_BASE_URL_USER_MANAGEMENT}/${GET_PROFILE_BY_OID_ENDPOINT}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ oid: userOid })
        })
        if (!userDataResponse.ok) {
            return UserRoleEnum.None
        } 
        const userData = await userDataResponse.json()
        return (userData.role === UserRoleEnum.Admin) ? UserRoleEnum.Admin : UserRoleEnum.Citizen 

    } catch (error) {
    // console.error(error)
    return UserRoleEnum.None
    }
}


//Determines if the user is signed in
export const determineIfUserIsSignedIn = async () => {
    try {
        const cookieStore = await cookies()
        const hasUserOidCookie = cookieStore.has(COOKIE_JWT_TOKEN)
        return hasUserOidCookie

    } catch (error) {
        // console.error(error)
        return false
    }
}

//Get user's OID value
export const getUserOidValue = async () => {
    try {
        const cookieStore = await cookies()
        const oid = cookieStore.get(COOKIE_USER_OID)

        return (!oid)
               ? ''
               : oid.value 

    } catch (error) {
        // console.error(error)
        return ''
    }
}