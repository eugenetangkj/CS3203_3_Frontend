import axios from 'axios'
import { cookies } from 'next/headers'
import { COOKIE_JWT_TOKEN } from '@/constants/Constants'


//Create a axios instance that wraps the JWT token in the bearer authorisation header
const createServerAxiosInstance = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get(COOKIE_JWT_TOKEN)?.value

    return axios.create({
        headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
};

export default createServerAxiosInstance;
