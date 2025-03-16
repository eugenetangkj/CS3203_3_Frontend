"use client"

import { Poll } from "@/types/Poll"
import PageSubtitle from "@/components/common/text/PageSubtitle"
import { Input } from "@/components/ui/input"
import { PollStatusEnum } from "@/types/Poll"

/**
Represents the question input field that the admin views for each poll. It is only editable
if the poll is unpublished.
*/
interface ViewPollAdminQuestionProps {
    currentPoll: Poll,
    setPoll: React.Dispatch<React.SetStateAction<Poll>>,
}

export function ViewPollAdminQuestion({ currentPoll, setPoll }: ViewPollAdminQuestionProps) {
    return (
        <div className='flex flex-col space-y-4'>
            <PageSubtitle pageSubtitle="Question" />
            <Input
                type="text"
                value={currentPoll.question}
                onChange={(event : any) => 
                    setPoll((prevPoll) => ({
                        ...prevPoll, 
                        question: event.target.value, //Only update the question field
                    }))
    
                }
                disabled={ currentPoll.status !== PollStatusEnum.Unpublished }
                placeholder="Enter the poll question..."
                className="!text-base border border-yap-gray-200 rounded-lg text-yap-black-800 focus:border-yap-brown-900 focus:border-2 focus-visible:ring-0 w-full pr-12 h-12"
            />
        </div> 
    )
}
