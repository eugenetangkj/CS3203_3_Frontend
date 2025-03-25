"use server"

import { API_BASE_URL_USER_MANAGEMENT, SIGNUP_ENDPOINT } from "@/constants/ApiRoutes";
import { ERROR_MESSAGE_API, SUCCESS } from "@/constants/Constants";
import axios from "axios";


//Fetch count
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
            headers: {
            'Content-Type': 'application/json', 
            }
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
