"use client"

import { Poll } from "@/types/Poll"
import PollCard from "./PollCard"
import { useState, useEffect } from "react"
import PollsSkeleton from "./PollsSkeleton"
import PageSubtitle from "../common/text/PageSubtitle"
import { Plus } from "lucide-react"


/**
Represents a section within the polls page that displays the heading and relevant poll cards
and 
*/
interface PollsSectionProps {
    //Method to fetch polls from API
    fetchPollsFromApi: () => Promise<Poll[]>,
    pageTitle: string,

}

export function PollsSection({ fetchPollsFromApi, pageTitle }: PollsSectionProps) {

    //States
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [allPolls, setAllPolls] = useState<Poll[]>([])
    const [isThereError, setIsThereError] = useState<boolean>(false)


    //Calls API to fetch ongoing polls
    const fetchAllPolls = async () => {
        setIsLoading(true)

        try {
            const pollsFromApi = await fetchPollsFromApi()
            setAllPolls(pollsFromApi)
        } catch (error) {
            setIsThereError(true)
        } finally {
            setIsLoading(false)
        }
    }

    //Calls the API on component mount
    useEffect(() => {
        fetchAllPolls()
    }, [])


    return (
        <div className='flex flex-col space-y-6'>
            <PageSubtitle pageSubtitle={ pageTitle } />
            {
                isLoading
                ? (<PollsSkeleton />)
                : isThereError
                ? <div className='text-yap-black-800'>Something went wrong. Please try again later.</div>
                : allPolls.length === 0
                ? <div className='text-yap-black-800'>There are no polls.</div>
                :  <div className='grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-rows-1 gap-x-4 gap-y-4'>
                        {allPolls.map((poll) => (
                            <PollCard key={poll.id} poll={poll} />
                        ))}
                        {
                            (pageTitle === "Unpublished Polls")
                            ? <button className='rounded-xl bg-transparent hover:bg-yap-brown-100 duration-200 p-4 h-full w-full shadow-none border-2 border-dashed border-yap-brown-900'>
                                <div className='text-yap-brown-900 flex flex-col space-y-2 justify-center items-center'>
                                    <Plus className='w-12 h-12'/>
                                    <h6 className='text-xl'>Create new poll</h6>
                                </div>
                            </button>
                            : <></>      
                        }
                   </div>
            }
        </div>
    )
}
