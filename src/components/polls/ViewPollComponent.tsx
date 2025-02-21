"use client"

import { ViewPollAdminDetails } from "@/components/polls/ViewPollAdminDetails";
import { Poll } from "@/types/Poll";
import { useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import { useParams } from 'next/navigation'

/** 
View a poll for admin and citizens. The specific
layout depends on:

1. For admin, depends on the status of the poll..
2. For citizen, depends on whether he has already completed the poll or not.
*/
interface ViewPollComponentProps {
    role: string,
    fetchPollWithId: (id: number) => Promise<Poll>,
}


export default function ViewPollComponent({ role, fetchPollWithId }: ViewPollComponentProps) {
    // Determine the id of the poll that the user is viewing
    const params = useParams<{ id: string}>()
    const id = params['id']
    const pollId = Number(id)

    //States
    const [hasRanApi, setHasRanApi] = useState<boolean>(false)
    const [poll, setPoll] = useState<Poll>()
    const [isThereError, setIsThereError] = useState<boolean>(false)


    //Calls API to fetch the given poll
    const fetchPoll = async () => {
        try {
            //Fetch the poll given the ID value
            const pollFromApi = await fetchPollWithId(pollId)
            setPoll(pollFromApi)
        } catch (error) {
            setIsThereError(true)
        } finally {
            setHasRanApi(true)
        }
    }
    
    //Calls the API on component mount
    useEffect(() => {
        fetchPoll()
    }, [])




    return (
        (!hasRanApi)
        ? <Skeleton className='w-[100px] h-[10px]' />
        : (isThereError)
        ? <div className='text-yap-black-800'>Something went wrong. Please try again later.</div>
        : (poll == null)
        ? <div>The poll does not exist</div>
        :(role == "admin")
        ? <ViewPollAdminDetails currentPoll={ poll } />
        : <div>TODO: For citizen, display interactive poll</div> //TODO: Component for citizen to view a poll
    );
}
