"use client"

import { Poll, PollQuestionTypeEnum, PollStatusEnum } from "@/types/Poll"
import BackToPreviousButton from "@/components/common/navigation/BackToPreviousButton"
import { CitizenPollMcqForm } from "./CitizenPollMcqForm"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CitizenPollOpenEndedForm } from "./CitizenPollOpenEndedForm"
import { useUserProfile } from "@/hooks/use-user-profile";
import useSWR from "swr"
import { POLL_RESPONSES_GET_ONE_SWR_HOOK } from "@/constants/SwrHooks"
import { pollResponsesGetOne } from "@/controllers/PollResponsesFunctions"
import { Skeleton } from "@/components/ui/skeleton"
import { UserRoleEnum } from "@/types/User"
import Link from "next/link"


/**
Represents a page where the citizen can view a poll. Possible actions by the citizen depends on the status of the poll and
also whether the citizen has already participated in the poll.
*/
interface ViewPollCitizenProps {
    currentPoll: Poll,
}


export default function ViewPollCitizen({ currentPoll }: ViewPollCitizenProps) {
    //Fetch user data
    const { data: userProfile, error: useUserProfileError, isLoading: useUserProfileIsLoading  } = useUserProfile(); 

    //Fetch user response
    const { data: userResponse, error: getUserResponseError, isLoading: getUserResponseIsLoading } = useSWR(
        () => userProfile?.id ? `${POLL_RESPONSES_GET_ONE_SWR_HOOK}/${currentPoll.id}/${userProfile.id}` : `${POLL_RESPONSES_GET_ONE_SWR_HOOK}/${currentPoll.id}`,
        () => pollResponsesGetOne({
            poll_id: currentPoll.id,
            user_id: userProfile?.id
        })
    );


    return (
        useUserProfileIsLoading || getUserResponseIsLoading
        ? <div className='flex flex-col space-y-4'> 
            <Skeleton className='h-[30px] w-[240px]' />
            <Skeleton className='h-[50px] w-full' />
          </div>
        : (useUserProfileError || getUserResponseError || userProfile === undefined || userResponse === undefined)
        ? <div className='text-yap-black-800'>{userProfile?.id}</div>
        : <div className='flex flex-col space-y-6'>
            {/* Navigate back to all polls */}
            <BackToPreviousButton text='Back to all polls' route='/polls' />

            {/* Alert that the poll is closed */}
            {
                currentPoll.status === PollStatusEnum.Closed &&
                <Alert className='bg-yap-brown-100 border-0'>
                    <AlertTitle className='text-lg text-yap-brown-900'>The poll is closed. 🔒</AlertTitle>
                    <AlertDescription className='text-base'>We thank you for participating.</AlertDescription>
                </Alert>
            }

            {/* Alert to inform user to sign in */}
            {
                (userProfile.role === UserRoleEnum.None && currentPoll.status !== PollStatusEnum.Closed) &&
                <Alert className='bg-yap-brown-100 border-0'>
                    <AlertTitle className='text-lg text-yap-brown-900'>We noticed you are not signed in. ⚠️</AlertTitle>
                    <AlertDescription className='text-base'><Link href='/sign-in' className='underline'>Sign in</Link> to participate in the polls.</AlertDescription>
                </Alert>
            }

            {/* Alert to see if the user is a citizen and if he has a response for the given poll */}
            {
                (userResponse?.response.length !== 0) &&
                <Alert className='bg-yap-brown-100 border-0'>
                    <AlertTitle className='text-lg text-yap-brown-900'>You have already submitted a response. 🫡</AlertTitle>
                    <AlertDescription className='text-base'>Thank you for participating.</AlertDescription>
                </Alert>

            }

            {/* Date information */}
            <p className='text-base text-yap-brown-900'>
                {
                    currentPoll.status == PollStatusEnum.Published
                    ? "Date Published: " + currentPoll.date_published
                    : "Date Closed: " + currentPoll.date_closed
                }
            </p>

            {/* Question form */}
            {
                currentPoll.question_type === PollQuestionTypeEnum.MCQ
                ? <CitizenPollMcqForm currentPoll={ currentPoll } shouldDisable={ userProfile.role === UserRoleEnum.None  || userResponse.response.length !== 0 } userResponse={ userResponse.response }  />
                : <CitizenPollOpenEndedForm currentPoll={ currentPoll } shouldDisable={ userProfile.role === UserRoleEnum.None || userResponse.response.length !== 0 } userResponse={ userResponse.response } />
            }
        </div>
    )
}
