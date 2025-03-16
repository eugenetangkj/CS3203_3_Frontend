"use client"

import { Poll } from "@/types/Poll"
import PageSubtitle from "@/components/common/text/PageSubtitle"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PollStatusEnum } from "@/types/Poll"
import { POSSIBLE_POLL_QUESTION_TYPES } from "@/constants/Constants"

/**
Represents the question type dropdown field that the admin views for each poll. It is only editable
if the poll is unpublished.
*/
interface ViewPollAdminQuestionTypeProps {
    currentPoll: Poll,
    setPoll: React.Dispatch<React.SetStateAction<Poll>>,
}

export function ViewPollAdminQuestionType({ currentPoll, setPoll }: ViewPollAdminQuestionTypeProps) {
    return (
        <div className='flex flex-col space-y-4'>
            <PageSubtitle pageSubtitle="Question Type" />
            <Select value={ currentPoll.question_type } onValueChange={(value) => {
                setPoll((prevPoll) => ({
                    ...prevPoll,
                    question_type: value,
                }));
            }} disabled= { currentPoll.status !== PollStatusEnum.Unpublished }>
                    <SelectTrigger className="w-[180px] text-yap-black-800 rounded-xl">
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                        {POSSIBLE_POLL_QUESTION_TYPES.map((pollType: string) => (
                            <SelectItem value={pollType} key={pollType} className='font-afacad text-yap-black-800'>{ pollType }</SelectItem>
                        ))}
                    </SelectContent>
            </Select>  
        </div> 
    )
}
