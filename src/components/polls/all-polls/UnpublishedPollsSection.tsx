"use client"

import PollCard from "../PollCard"
import PageSubtitle from "@/components/common/text/PageSubtitle"
import { Poll, PollStatusEnum } from "@/types/Poll"
import Link from "next/link"
import { Plus } from "lucide-react"
import { UNPUBLISHED_POLLS_SWR_HOOK } from "@/constants/SwrHooks"
import PollCardsSkeleton from "../PollCardsSkeleton"
import { ERROR_MESSAGE_API } from "@/constants/Constants"
import useSWR from "swr"
import { pollsGetMany } from "@/controllers/PollsFunctions"

/**
Represents a section within the all polls page that displays the unpublished polls, along with a button
that allows the admin to create a new poll.
*/

//Component
export default function UnpublishedPollsSection() {
    const { data, error, isLoading } = useSWR<Poll[]>(UNPUBLISHED_POLLS_SWR_HOOK, () => pollsGetMany(PollStatusEnum.Published));

    return (
        <div className='flex flex-col space-y-6'>
            <PageSubtitle pageSubtitle='Unpublished Polls' />
            {
                isLoading
                ? <PollCardsSkeleton />
                : error
                ? <div className='text-base text-yap-black-800'>{ ERROR_MESSAGE_API }</div>
                : <div className='grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-rows-1 gap-x-4 gap-y-4'>
                    {data?.map((poll) => (
                            <PollCard key={poll.id} pollToDisplay={poll} />
                    ))}
                    <Link href="/polls/create-poll">
                        <button className='rounded-xl bg-transparent hover:bg-yap-brown-100 duration-200 p-4 h-full w-full shadow-none border-2 border-dashed border-yap-brown-900'>
                            <div className='text-yap-brown-900 flex flex-col space-y-2 justify-center items-center'>
                                <Plus className='w-12 h-12'/>
                                <h6 className='text-xl'>Create new poll</h6>
                            </div>
                        </button>
                    </Link>
                </div>
            }
        </div>
    )
}
