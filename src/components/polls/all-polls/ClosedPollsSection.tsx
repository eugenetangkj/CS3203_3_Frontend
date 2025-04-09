"use client"

import PollCard from "../PollCard"
import PageSubtitle from "@/components/common/text/PageSubtitle"
import { Poll, PollStatusEnum } from "@/types/Poll"
import useSWR from 'swr'
import PollCardsSkeleton from "../PollCardsSkeleton"
import { ERROR_MESSAGE_API } from "@/constants/Constants"
import { CLOSED_POLLS_SWR_HOOK } from "@/constants/SwrHooks"
import { pollsGetMany } from "@/data-fetchers/PollsFunctions"

/**
Represents a section within the all polls page that displays the closed polls.
*/
export default function ClosedPollsSection() {
    const { data, error, isLoading } = useSWR<Poll[]>(CLOSED_POLLS_SWR_HOOK, () => pollsGetMany(PollStatusEnum.Closed));
   
    return (
        <div className='flex flex-col space-y-6'>
            <PageSubtitle pageSubtitle='Closed Polls' />
            {
                isLoading
                ? <PollCardsSkeleton />
                : error
                ? <div className='text-base text-yap-black-800'>{ ERROR_MESSAGE_API }</div>
                : (data?.length === 0)
                ? <div className='text-base text-yap-black-800'>There are no closed polls. Do check back later!</div>
                : <div className='grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-rows-1 gap-x-4 gap-y-4'>
                    {data?.map((poll) => (
                        <PollCard key={poll.id} pollToDisplay={poll} />
                    ))} 
                </div>
            }
        </div>
    )
}
