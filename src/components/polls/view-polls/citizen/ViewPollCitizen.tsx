import { Poll, PollStatusEnum } from "@/types/Poll"
import BackToPreviousButton from "@/components/common/navigation/BackToPreviousButton"
import { CitizenPollMcqForm } from "./CitizenPollMcqForm"
import { determineIfUserIsSignedIn } from "@/utils/AuthChecker"


/**
Represents a page where the citizen can view a poll. Possible actions by the citizen depends on the status of the poll and
also whether the citizen has already participated in the poll.
*/
interface ViewPollCitizenProps {
    currentPoll: Poll,

}

export async function ViewPollCitizen({ currentPoll }: ViewPollCitizenProps) {

    const isUserSignedIn = await determineIfUserIsSignedIn() 


    return (
        <div className='flex flex-col space-y-6'>
            {/* Navigate back to all polls */}
            <BackToPreviousButton text='Back to all polls' route='/polls' />

            {/* Date information */}
            <p className='text-base text-yap-brown-900'>
                {
                    currentPoll.status == PollStatusEnum.Published
                    ? "Date Published: " + currentPoll.date_published
                    : "Date Closed: " + currentPoll.date_closed
                }
            </p>


            {/* Question form */}
            <CitizenPollMcqForm currentPoll={ currentPoll } isUserSignedIn={ isUserSignedIn } />


        
        </div>
    )
}
