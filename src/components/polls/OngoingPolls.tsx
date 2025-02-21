"use client"

import { Poll } from "@/types/Poll"
import PageSubtitle from "../common/text/PageSubtitle"
import PollCard from "./PollCard"
import { ongoingPolls } from "@/constants/posts"
import { useState, useEffect } from "react"
import PollsSkeleton from "./PollsSkeleton"


/**
Represents the cards that are used to render ongoing polls
*/
export function OngoingPolls() {

    //States
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [allOngoingPolls, setAllOngoingPolls] = useState<Poll[]>([])
    const [isThereError, setIsThereError] = useState<boolean>(false)


    //Calls API to fetch ongoing polls
    const fetchOngoingPolls = async () => {
        setIsLoading(true)

        try {
            //Call API to fetch ongoing polls
            //TODO: Need to differentiate among admin and citizen as ongoing polls differ for them


            setAllOngoingPolls(ongoingPolls)
        } catch (error) {
            setIsThereError(true)
        } finally {
            setIsLoading(false)
        }
    }

    //Calls the API on component mount
    useEffect(() => {
        fetchOngoingPolls()
    }, [])


    return (
        <div className='flex flex-col space-y-8'>
            <PageSubtitle pageSubtitle="Ongoing Polls" />
            {
                isLoading
                ? (<PollsSkeleton />)
                : isThereError
                ? <div className='text-yap-black-800'>Something went wrong. Please try again later.</div>
                : allOngoingPolls.length === 0
                ? <div className='text-yap-black-800'>There are no ongoing polls.</div>
                :  <div className='grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-rows-1 gap-x-4 gap-y-4'>
                        {ongoingPolls.map((poll) => (
                            <PollCard key={poll.id} poll={poll} />
                        ))}
                   </div>
            }
        </div>
    )
}
