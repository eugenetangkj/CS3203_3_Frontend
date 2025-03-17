import { Poll, PollQuestionTypeEnum, PollStatusEnum } from "@/types/Poll"
import BackToPreviousButton from "@/components/common/navigation/BackToPreviousButton"
import { CitizenPollMcqForm } from "./CitizenPollMcqForm"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CitizenPollOpenEndedForm } from "./CitizenPollOpenEndedForm"


/**
Represents a page where the citizen can view a poll. Possible actions by the citizen depends on the status of the poll and
also whether the citizen has already participated in the poll.
*/
interface ViewPollCitizenProps {
    currentPoll: Poll,
    isUserSignedIn: boolean

}

export async function ViewPollCitizen({ currentPoll, isUserSignedIn }: ViewPollCitizenProps) {

    return (
        <div className='flex flex-col space-y-6'>
            {/* Navigate back to all polls */}
            <BackToPreviousButton text='Back to all polls' route='/polls' />

            {/* Alert to inform user to sign in */}
            {
                !isUserSignedIn &&
                <Alert className='bg-yap-brown-100 border-0'>
                    <AlertTitle className='text-lg text-yap-brown-900'>We noticed you are not signed in. ⚠️</AlertTitle>
                    <AlertDescription className='text-base'><a href='/sign-in' className='underline'>Sign in</a> to participate in the polls.</AlertDescription>
                </Alert>
            }

            {/* TODO: Alert to see if the user is a citizen and if he has a response for the given poll */}


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
                ? <CitizenPollMcqForm currentPoll={ currentPoll } isUserSignedIn={ isUserSignedIn } />
                : <CitizenPollOpenEndedForm currentPoll={ currentPoll } isUserSignedIn={ isUserSignedIn } />
            }
            



        
        </div>
    )
}
