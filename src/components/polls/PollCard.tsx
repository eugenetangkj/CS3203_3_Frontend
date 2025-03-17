import { Poll, PollTemplate, PollQuestionTypeEnum } from "@/types/Poll";
import { COLOUR_MAP } from "@/constants/Constants";
import AiTooltip from "../common/others/AiTooltip";
import { determineIsPollOrPollTemplate } from "@/utils/HelperFunctions";
import { PollStatusEnum } from "@/types/Poll";


/**
This component represents a card that displays a poll or a poll template in the polls page. It contains the post's question, category
question type, date and whether it is AI-generated.
*/
interface PollCardProps {
    pollToDisplay: Poll | PollTemplate
}
 
export default function PollCard({ pollToDisplay }: PollCardProps) {
    //Determine if it is a poll or poll template
    const isPoll = determineIsPollOrPollTemplate(pollToDisplay)

 
    // Determine date string to display
    const dateStringToDisplay = (!isPoll)
                                ? "Date created: " + pollToDisplay.date_created
                                : (isPoll && pollToDisplay.status == PollStatusEnum.Published)
                                ? "Date published: " + pollToDisplay.date_published 
                                : (isPoll && pollToDisplay.status == PollStatusEnum.Closed)
                                ? "Date closed: " + pollToDisplay.date_closed
                                : "Date created: " + pollToDisplay.date_created


    // Return component
    return (
        <a href={isPoll ? `/polls/${pollToDisplay.id}` : `/polls/poll-template/${pollToDisplay.id}`}>
            <div className='flex flex-col space-y-8 justify-between rounded-xl bg-yap-gray-100 hover:bg-yap-brown-100 duration-200 p-4 h-full'>
                <div className='flex flex-col space-y-4'>
                    <div className='space-y-2'>
                        {/* Question */}
                        <h6 className='text-yap-brown-900 text-xl  line-clamp-3 overflow-hidden'>{ pollToDisplay.question }</h6>

                        {/* Question Type */}
                        <div className='rounded-full  text-white w-fit px-4 py-0.25 text-sm' style={{
                            backgroundColor: pollToDisplay.question_type === PollQuestionTypeEnum.MCQ
                                             ? COLOUR_MAP["yap-green-900"]
                                             : pollToDisplay.question_type == PollQuestionTypeEnum.OpenEnded
                                             ? COLOUR_MAP["yap-orange-900"]
                                             : COLOUR_MAP["yap-brown-900"]
                        }}>{ pollToDisplay.question_type }</div>
                    </div>
                </div>

                <div className='flex flex-col space-y-2'>
                    {/* Category */}
                    <p className='text-yap-black-800'>Category: { pollToDisplay.category }</p>

                    <div className='flex flex-row items-center justify-between'>
                        {/* Date */}
                        <p className='text-yap-black-800'>{ dateStringToDisplay }</p>

                        {/* AI-generated status */}
                        {
                            (!isPoll)
                            ? <AiTooltip message='This poll template is AI-generated.' />
                            : <></>
                        } 
                    </div>
                </div>
            </div>
        </a>

    );
}