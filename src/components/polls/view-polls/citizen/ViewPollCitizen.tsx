import { Poll, PollQuestionTypeEnum, PollStatusEnum } from "@/types/Poll"
import BackToPreviousButton from "@/components/common/navigation/BackToPreviousButton"
import { CitizenPollMcqForm } from "./CitizenPollMcqForm"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CitizenPollOpenEndedForm } from "./CitizenPollOpenEndedForm"
import { getUserOidValue } from "@/utils/AuthChecker"
import { API_BASE_URL_ADMIN_MANAGEMENT, POLL_RESPONSES_GET_ONE_ENDPOINT } from "@/constants/ApiRoutes"
import axios from "axios"
import { NO_MATCHING_DOCUMENTS_API_ERROR_MESSAGE } from "@/constants/Constants"
import http from 'http';


/**
Represents a page where the citizen can view a poll. Possible actions by the citizen depends on the status of the poll and
also whether the citizen has already participated in the poll.
*/
interface ViewPollCitizenProps {
    currentPoll: Poll,
    isUserSignedIn: boolean
}

const agent = new http.Agent({ keepAlive: true });

export async function ViewPollCitizen({ currentPoll, isUserSignedIn }: ViewPollCitizenProps) {
    const isPollClosed = currentPoll.status == PollStatusEnum.Closed

    //Helper function to get the user's response
    const getUserResponse = async () => {
        try {
            //Step 1: Get user oid
            const userOid = await getUserOidValue()
            if (userOid.length === 0) {
                //Something went wrong. Avoid multiple responses.
                return ''
            }

            //Step 2: Fetch response by oid
            const fetchOnePollApiEndpoint = API_BASE_URL_ADMIN_MANAGEMENT  + POLL_RESPONSES_GET_ONE_ENDPOINT
            const response = await axios.post(fetchOnePollApiEndpoint,
                {
                    "filter": {
                        "poll_id": currentPoll.id,
                        "user_id": userOid
                    }, 
                },
                {
                    timeout: 10 * 60 * 1000,
                    httpAgent: agent,
                }
            )


            //Step 3: Check response
            if (response.data.message === NO_MATCHING_DOCUMENTS_API_ERROR_MESSAGE) {
                //Cannot find a response
                return ''
            } else {
                return response.data.document.response
            }
        } catch (error) {
            console.log(error)
            return ''
        }
    }

    const userResponse = await getUserResponse()


    return (
        <div className='flex flex-col space-y-6'>
            {/* Navigate back to all polls */}
            <BackToPreviousButton text='Back to all polls' route='/polls' />

            {/* Alert that the poll is closed */}
            {
                isPollClosed &&
                <Alert className='bg-yap-brown-100 border-0'>
                    <AlertTitle className='text-lg text-yap-brown-900'>The poll is closed. 🔒</AlertTitle>
                    <AlertDescription className='text-base'>We thank you for participating.</AlertDescription>
                </Alert>
            }



            {/* Alert to inform user to sign in */}
            {
                (!isUserSignedIn && !isPollClosed) &&
                <Alert className='bg-yap-brown-100 border-0'>
                    <AlertTitle className='text-lg text-yap-brown-900'>We noticed you are not signed in. ⚠️</AlertTitle>
                    <AlertDescription className='text-base'><a href='/sign-in' className='underline'>Sign in</a> to participate in the polls.</AlertDescription>
                </Alert>
            }

            {/* TODO: Alert to see if the user is a citizen and if he has a response for the given poll */}
            {
                (userResponse.length !== 0) &&
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
                ? <CitizenPollMcqForm currentPoll={ currentPoll } shouldDisable={ !isUserSignedIn || userResponse.length !== 0 } userResponse={ userResponse }  />
                : <CitizenPollOpenEndedForm currentPoll={ currentPoll } shouldDisable={ !isUserSignedIn || userResponse.length !== 0 } userResponse={ userResponse } />
            }
            



        
        </div>
    )
}
