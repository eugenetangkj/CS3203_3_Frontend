import { useSWRConfig } from "swr";
import { COMPLAINTS_GET_MANY_SWR_HOOK, COMPLAINTS_GET_COUNT_SWR_HOOK, COMPLAINTS_GET_STATISTICS_SWR_HOOK, COMPLAINTS_GET_STATISTICS_GROUPED_SWR_HOOK } from "@/constants/SwrHooks";

// Custom hook to refresh all complaints
export const useRefreshComplaints = () => {
    const { mutate } = useSWRConfig();

    const refreshAllComplaints = () => {
        mutate((key) => {
            // Check if the key is an array and matches COMPLAINTS_GET_MANY_SWR_HOOK
            if (Array.isArray(key) && key[0] === COMPLAINTS_GET_MANY_SWR_HOOK) {
                return true; // If it matches, revalidate
            }

            // Check if the key is an array and matches COMPLAINTS_GET_COUNT_SWR_HOOK
            if (Array.isArray(key) && key[0] === COMPLAINTS_GET_COUNT_SWR_HOOK) {
                return true; // If it matches, revalidate
            }

            // Check if the key matches COMPLAINTS_GET_COUNT_SWR_HOOK (without being in an array)
            if (key === COMPLAINTS_GET_COUNT_SWR_HOOK) {
                return true; // If it matches, revalidate
            }

            // Check if the key is an array and matches COMPLAINTS_GET_STATISTICS_SWR_HOOK
            if (Array.isArray(key) && key[0] === COMPLAINTS_GET_STATISTICS_SWR_HOOK) {
                return true; // If it matches, revalidate
            }

            // Check if the key is an array and matches COMPLAINTS_GET_STATISTICS_GROUPED_SWR_HOOK
            if (Array.isArray(key) && key[0] === COMPLAINTS_GET_STATISTICS_GROUPED_SWR_HOOK) {
                return true; // If it matches, revalidate
            }

            return false; // If none of the conditions match, we skip the mutation
        });
    };

    return refreshAllComplaints;
};
