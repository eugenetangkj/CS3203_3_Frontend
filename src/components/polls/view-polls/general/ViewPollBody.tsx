"use client"
import { ViewPollAdmin } from "@/components/polls/view-polls/admin/ViewPollAdmin";
import { UserRoleEnum } from "@/types/User";
import { useUserProfile } from "@/hooks/use-user-profile";
import useSWR from "swr";
import { POLLS_GET_BY_OID_SWR_HOOK } from "@/constants/SwrHooks";
import { pollsGetByOid } from "@/data-fetchers/PollsFunctions";
import { Skeleton } from "@/components/ui/skeleton";
import ViewPollCitizen from "../citizen/ViewPollCitizen";


/** 
Body to determine what is the view that the user sees for view poll, depending on his role.
*/

interface ViewPollBodyProps {
    id: string
}

export default function ViewPollBody({ id }: ViewPollBodyProps) {
    //Obtain user's role
    const { data: userProfile, error: useUserProfileError, isLoading: useUserProfileIsLoading } = useUserProfile();

    //Fetch the given poll
    const { data: poll, error: getPollError, isLoading: getPollIsLoading } = useSWR(`${POLLS_GET_BY_OID_SWR_HOOK}/${id}`, () => pollsGetByOid(id));
    
{/* <div className="px-6 md:px-12 font-afacad mt-32 mb-8"> */}
    return (
        useUserProfileIsLoading || getPollIsLoading
        ? <div className='flex flex-col space-y-4 px-6 md:px-12 mt-32 mb-8'> 
            <Skeleton className='h-[30px] w-[240px]' />
            <Skeleton className='h-[50px] w-full' />
          </div>
        : poll?.id.length === 0 || poll === undefined || useUserProfileError || getPollError
        ? <div className="px-6 md:px-12 font-afacad mt-32 mb-8">
                <div className='text-yap-black-800 text-base'>Something went wrong. We could not fetch the poll.</div>
          </div>
        : <div className="px-6 md:px-12 font-afacad mt-32 mb-8">
            {
                userProfile?.role === UserRoleEnum.Admin
                ? <ViewPollAdmin currentPoll={ poll } />
                : <ViewPollCitizen currentPoll={ poll } />
            }
          </div>
    );
}
