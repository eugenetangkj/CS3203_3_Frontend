"use client"

import PollCard from "../PollCard"
import PageSubtitle from "@/components/common/text/PageSubtitle"
import { Poll, PollStatusEnum } from "@/types/Poll"
import { API_BASE_URL_ADMIN_MANAGEMENT, POLLS_GET_MANY_ENDPOINT } from "@/constants/ApiRoutes"
import axios from "axios"
import { convertPollDocumentsToObjects } from "@/utils/DatabaseHelperFunctions"
import useSWR from 'swr'
import PollCardsSkeleton from "../PollCardsSkeleton"
import { ERROR_MESSAGE_API, VERY_LARGE_NUMBER } from "@/constants/Constants"
import { CLOSED_POLLS_SWR_HOOK } from "@/constants/SwrHooks"

/**
Represents a section within the all polls page that displays the closed polls.
*/

//Function to fetch all closed polls
const fetchAllClosedPolls = async() : Promise<Poll[]> => {
    const getPollsEndpoint = API_BASE_URL_ADMIN_MANAGEMENT  + POLLS_GET_MANY_ENDPOINT
    const closedPollsData = await axios.post(getPollsEndpoint, {
        "filter": {
            "status": PollStatusEnum.Closed
        },
        "page_size": VERY_LARGE_NUMBER, //Fetch all
        "page_number": 1
    })
    const closedPolls = convertPollDocumentsToObjects(closedPollsData.data.documents)
    return closedPolls
}



export default function ClosedPollsSection() {
    const { data, error, isLoading } = useSWR<Poll[]>(CLOSED_POLLS_SWR_HOOK, fetchAllClosedPolls);
   
    return (
        <div className='flex flex-col space-y-6'>
            <PageSubtitle pageSubtitle='Closed Polls' />
            {
                isLoading
                ? <PollCardsSkeleton />
                : error
                ? <div className='text-base text-yap-black-800'>{ ERROR_MESSAGE_API }</div>
                : (data?.length === 0)
                ? <div className='text-base text-yap-black-800'>There are no ongoing polls. Do check back later!</div>
                : <div className='grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-rows-1 gap-x-4 gap-y-4'>
                    {data?.map((poll) => (
                        <PollCard key={poll.id} pollToDisplay={poll} />
                    ))} 
                </div>
            }
        </div>
    )
}
