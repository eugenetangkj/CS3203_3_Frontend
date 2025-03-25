"use server"

import { API_BASE_URL_USER_MANAGEMENT, LOGIN_ENDPOINT, SIGNUP_ENDPOINT } from "@/constants/ApiRoutes";
import { ERROR_MESSAGE_API, SUCCESS, NO_MATCHING_DOCUMENTS_API_ERROR_MESSAGE } from "@/constants/Constants";
import axios from "axios";
import { COOKIE_JWT_TOKEN, COOKIE_USER_OID } from "@/constants/Constants";
import { cookies } from "next/headers";


//Sign up for a new account
export const userSignUp = async (name: string, email: string, password: string, role: string, collectibles: string[]) => {
    try {
        const signUpEndpoint = API_BASE_URL_USER_MANAGEMENT + SIGNUP_ENDPOINT
        await axios.post(signUpEndpoint, {
            "document": {
                "name": name,
                "email": email,
                "password": password,
                "role": role,
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
            }
        } else {
            return {
                "message": SUCCESS,
                "jwt": loginResult.data.jwt,
                "oid": loginResult.data.oid
            }
        }
    } catch (error) {
        return {
            "message": ERROR_MESSAGE_API,
            "jwt": "",
            "oid": "",
        }
    }
};

//Set cookies after signing in
export const setCookiesForSigningIn = async (jwtToken: string, userOid: string) => {
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
}