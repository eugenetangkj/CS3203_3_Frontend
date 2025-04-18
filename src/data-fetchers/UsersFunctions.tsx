"use server"

import { API_BASE_URL_USER_MANAGEMENT, CREATE_ADMIN_ACCOUNT_ENDPOINT, GET_PROFILE_BY_OID_ENDPOINT, LOGIN_ENDPOINT, SIGNUP_ENDPOINT, UPDATE_PROFILE_BY_OID_ENDPOINT } from "@/constants/ApiRoutes";
import { ERROR_MESSAGE_API, SUCCESS, NO_MATCHING_DOCUMENTS_API_ERROR_MESSAGE } from "@/constants/Constants";
import axios from "axios";
import { User, UserRoleEnum } from "@/types/User";
import { getUserAuthCookies } from "./UsersServerFunctions";
import { ApiResponseStatus } from "@/types/ApiResponse";
import createServerAxiosInstance from "@/utils/AxiosServer";


//Sign up for a new account with the role as citizen
export const userSignUp = async (name: string, email: string, password: string, collectibles: string[]) => {
    try {
        const signUpEndpoint = API_BASE_URL_USER_MANAGEMENT + SIGNUP_ENDPOINT
        await axios.post(signUpEndpoint, {
            "document": {
                "name": name,
                "email": email,
                "password": password,
                "collectibles": collectibles
            },
        })
        return SUCCESS
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 409) {
                return 'Email already exists.'
            } else {
                return ERROR_MESSAGE_API
            }
        }
    }
};

//Sign up for a new account with the role as admin
export const adminSignUp = async (name: string, email: string, password: string, collectibles: string[]) => {
    try {
        const axiosServerInstance = await createServerAxiosInstance()
        const createAdminAccountEndpoint = API_BASE_URL_USER_MANAGEMENT + CREATE_ADMIN_ACCOUNT_ENDPOINT
        await axiosServerInstance.post(createAdminAccountEndpoint, {
            "document": {
                "name": name,
                "email": email,
                "password": password,
                "collectibles": collectibles
            },
        })
        return SUCCESS
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 409) {
                return 'Email already exists.'
            } else {
                return ERROR_MESSAGE_API
            }
        }
    }
};

//Sign up for a new account
export const userLogin = async (email: string, password: string) => {
    try {
        const loginEndpoint = API_BASE_URL_USER_MANAGEMENT + LOGIN_ENDPOINT
        const loginResult = await axios.post(loginEndpoint, {
                "email": email,
                "password": password,
        })
        if (loginResult.data.message === NO_MATCHING_DOCUMENTS_API_ERROR_MESSAGE) {
            return {
                "message": "Invalid credentials. Please check your email and/or password.",
                "jwt": "",
                "oid": "",
                "role": ""
            }
        } else {
            return {
                "message": SUCCESS,
                "jwt": loginResult.data.jwt,
                "oid": loginResult.data.oid,
                "role": loginResult.data.role
            }
        }
    } catch (error) {
        console.log(error)
        return {
            "message": ERROR_MESSAGE_API,
            "jwt": "",
            "oid": "",
            "role": ""
        }
    }
};

//Determines the user's profile information
export const getUserProfile = async (): Promise<User> => {
    //Step 0: Prepare helpful constants
    const nonExistentUser = {
        id: '',
        email: '',
        name: '',
        role: UserRoleEnum.None,
        collectibles: []
    }

    try {
        //Step 1: Check for JWT cookie and user oid cookie
        const userCookies = await getUserAuthCookies()
        if (userCookies['jwtToken'] === '' || userCookies['userOid'] === '') {
            //User is not logged in
            return nonExistentUser
        }

        //Step 2: Fetch the actual user
        const fetchUserProfileApiEndpoint = API_BASE_URL_USER_MANAGEMENT  + GET_PROFILE_BY_OID_ENDPOINT
        const userData = await axios.post(fetchUserProfileApiEndpoint,
            {
                "oid": userCookies['userOid']
            }
        )
        return {
            id: userData.data.profile._id.$oid,
            email: userData.data.profile.email,
            name: userData.data.profile.name,
            role: userData.data.profile.role,
            collectibles: userData.data.profile.collectibles
        }
    } catch (error) {
        return nonExistentUser
    }
}

//Updates the user's profile information
export const userUpdateProfileByOid = async(oid: string, setDocument: object): Promise<string> => {
    try {
        const axiosServerInstance = await createServerAxiosInstance()
        const updateProfileApiEndpoint = API_BASE_URL_USER_MANAGEMENT  + UPDATE_PROFILE_BY_OID_ENDPOINT
        await axiosServerInstance.post(updateProfileApiEndpoint, {
            "oid": oid,
            "update_document": {
                "$set": setDocument
            }
        })
        return ApiResponseStatus.Success
    } catch (error) {
        return ApiResponseStatus.Failure
    }
}
