"use client"

import { Poll } from "@/types/Poll"
import { Button } from "../ui/button"

/**
Represents a create poll button that creates a poll given a Poll object
*/
interface CreatePollButtonInterface {
    currentPoll: Poll,
}

export function CreatePollButton({ currentPoll }: CreatePollButtonInterface) {
    //Creates the poll via API and redirects the user to the poll page
    const handleCreatePoll = async () => {
        //TODO: Input validation
        //TODO: Fill in API call and redirect the user to the poll page
        console.log(currentPoll)
    }

    return (
        <Button className='bg-yap-orange-900 hover:bg-yap-orange-800 duration-200 rounded-full'  onClick={handleCreatePoll}>
            Create Poll
        </Button>
    )
}
