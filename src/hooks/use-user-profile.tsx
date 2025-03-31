import useSWR from "swr";
import { User } from "@/types/User";
import { USERS_GET_PROFILE_SWR_HOOK } from "@/constants/SwrHooks";
import { getUserProfile } from "@/controllers/UsersFunctions";


export function useUserProfile() {
    return useSWR<User>(USERS_GET_PROFILE_SWR_HOOK, getUserProfile);
}