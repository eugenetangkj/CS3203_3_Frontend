import { ViewPollAdmin } from "@/components/polls/view-polls/admin/ViewPollAdmin";
import { ViewPollCitizen } from "@/components/polls/view-polls/citizen/ViewPollCitizen";
import { Poll, PollStatusEnum } from "@/types/Poll";
import { determineUserRole } from "@/utils/AuthChecker";
import { redirect } from 'next/navigation'
import { UserRoleEnum } from "@/types/User";
import { API_BASE_URL_ADMIN_MANAGEMENT, POLLS_GET_BY_OID_ENDPOINT } from "@/constants/ApiRoutes";
import axios from "axios";
import { convertPollDocumentToObject } from "@/utils/DatabaseHelperFunctions";


/** 
Layout for the dynamic page which allows admin and citizens to view a given poll. The specific
layout depends on:

1. For admin, depends on the status of the poll..
2. For citizen, depends on whether he has already completed the poll or not.
*/

export const metadata = {
    title: "Polls - Just Yap!",
    description: "View a poll",
};


export default async function ViewPoll({ params }: any) {
    // Determine which poll is the user trying to view
    const { id } = await params

    //Determine if the user is an admin
    const userRole = await determineUserRole()
    const isUserAdmin = userRole === UserRoleEnum.Admin


    //Fetch the given poll
    const fetchPoll = async() => {
        try {
            const fetchPollByOidEndpoint = API_BASE_URL_ADMIN_MANAGEMENT + '/' + POLLS_GET_BY_OID_ENDPOINT
            const response = await axios.post(fetchPollByOidEndpoint, {
                "oid": id
                },
                { timeout: 10000 }
            )
            const pollData = response.data.document
            if (pollData === null) {
                return null
            } else {
                return convertPollDocumentToObject(pollData)
            }
        } catch (error) {
            return null
        }
    }

    const poll = await fetchPoll()

    //Prevent unauthorised access to unpublished polls
    if (!isUserAdmin && poll !== null && poll.status == PollStatusEnum.Unpublished) {
        redirect('/polls')
    }

    return (
        <div className="px-6 md:px-12 font-afacad mt-32 mb-8">
            {
                poll == null
                ? <div className='text-yap-black-800 text-base'>Something went wrong. We could not fetch the poll.</div>
                : !isUserAdmin
                ? <ViewPollCitizen currentPoll={ poll } isUserSignedIn={ userRole !== UserRoleEnum.None} />
                : <ViewPollAdmin currentPoll={ poll } />
            }
         
        </div>
    );
}
