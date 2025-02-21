"use client"

import PageSubtitle from "../common/text/PageSubtitle"
import PollCard from "./PollCard"
import { ongoingPolls } from "@/constants/posts"


/**
Represents the cards that are used to render ongoing polls
*/
export function OngoingPolls() {
    
    return (
        <div className='flex flex-col space-y-8'>
            <PageSubtitle pageSubtitle="Ongoing Polls" />

                
            {/* Ongoing poll cards */}
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-rows-1 gap-x-4 gap-y-4'>
                {ongoingPolls.map((poll) => (
                    <PollCard key={poll.id} poll={poll} />
                ))}
            </div>
                
                
        

        </div>
    )
}
