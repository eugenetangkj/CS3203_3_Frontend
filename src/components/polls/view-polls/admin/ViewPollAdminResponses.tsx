import { Poll, PollQuestionTypeEnum } from "@/types/Poll"
import PageSubtitle from "@/components/common/text/PageSubtitle"
import { ViewPollAdminResponsesMcq } from "./ViewPollAdminResponsesMcq"
import { ViewPollAdminResponsesOpenEnded } from "./ViewPollAdminResponsesOpenEnded"
import { DownloadPollResponsesButton } from "./buttons/DownloadPollResponsesButton"

/**
Represents the responses for the polls that the admin views for each published or closed polls.
*/
interface ViewPollAdminResponsesProps {
    currentPoll: Poll,
}

export function ViewPollAdminResponses({ currentPoll }: ViewPollAdminResponsesProps) {
    return (
        <div className='flex flex-col space-y-4'>
            <PageSubtitle pageSubtitle="Poll Responses" />
            {
                currentPoll.question_type === PollQuestionTypeEnum.MCQ
                ? <ViewPollAdminResponsesMcq currentPoll={ currentPoll }/>
                : <div className="flex flex-col space-y-2">
                    {/* Download poll responses button */}
                    <DownloadPollResponsesButton currentPoll={ currentPoll } />
                    <ViewPollAdminResponsesOpenEnded currentPoll={ currentPoll } />

                </div>
                
                
                
            }
        </div> 
    )
}
