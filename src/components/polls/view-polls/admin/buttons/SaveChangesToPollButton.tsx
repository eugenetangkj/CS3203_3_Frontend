"use client"

import { Poll } from "@/types/Poll"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { PollQuestionTypeEnum } from "@/types/Poll"
import { validatePollBeforeUpdating } from "@/utils/HelperFunctions"
import { pollsUpdateByOid } from "@/data-fetchers/PollsFunctions"
import { ApiResponseStatus } from "@/types/ApiResponse"
import { POLLS_GET_BY_OID_SWR_HOOK } from "@/constants/SwrHooks"
import { mutate } from "swr"

/**
Represents a save changes to poll button that saves the latest information for the poll
*/
interface SaveChangesToPollButtonInterface {
    currentPoll: Poll,
}

export function SaveChangesToPollButton({ currentPoll }: SaveChangesToPollButtonInterface) {
    //State management
    const [isLoading, setIsLoading] = useState<boolean>(false)

    //Toast management
    const { toast } = useToast()


    //Updates the latest changes to the poll via API
    const handleSaveChangesToPoll = async () => {
        //Set is loading
        setIsLoading(true)

        //Check fields
        const errorMessage = validatePollBeforeUpdating(currentPoll)
        if (errorMessage.length !== 0) {
            toast({
                variant: "destructive",
                description: errorMessage,
                duration: 3000,
            })
            setIsLoading(false)
            return
        }

        //Fields all OK. Proceed to save changes to the poll via API call
        const result = await pollsUpdateByOid(currentPoll.id,
            {
                "question": currentPoll.question,
                "category": currentPoll.category,
                "question_type": currentPoll.question_type,
                "options": (currentPoll.question_type === PollQuestionTypeEnum.MCQ) ? currentPoll.options : [],
            }
        )

        //Show toast
        if (result === ApiResponseStatus.Success) {
            toast({
                variant: "success",
                description: "Changes are successfully saved.",
                duration: 3000,
            })
            mutate(`${POLLS_GET_BY_OID_SWR_HOOK}/${currentPoll.id}`)
        } else {
            toast({
                variant: "destructive",
                description: "There was a problem saving your changes.",
                duration: 3000,
              })
        }

        //Clean up
        setIsLoading(false)
    }

    
    return (
        <Button className='bg-yap-green-900 hover:bg-yap-green-800 duration-200 rounded-full' 
        onClick={ handleSaveChangesToPoll } disabled={ isLoading }>
            { isLoading ? 'Saving...' : 'Save Changes' }
        </Button>
    )
}
