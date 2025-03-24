"use client"

import { Poll } from "@/types/Poll"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { PollQuestionTypeEnum } from "@/types/Poll"
import { API_BASE_URL_ADMIN_MANAGEMENT, POLLS_UPDATE_BY_OID_ENDPOINT } from "@/constants/ApiRoutes"
import axios from "axios"

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
        setIsLoading(true)

        // Check fields
        let errorMessage = ''
        if (currentPoll.question.trim() === '') {
            errorMessage = "Please enter your poll question."
        }
        else if (currentPoll.category === '') {
            errorMessage = 'Please select a category.'
        } else if (currentPoll.question_type === PollQuestionTypeEnum.MCQ && currentPoll.options.length <= 1) {
            errorMessage = 'Please input at least 2 options for a MCQ question.'
        }
        if (errorMessage !== '') {
            toast({
                variant: "destructive",
                description: errorMessage,
                duration: 3000,
            })
            setIsLoading(false)
            return
        }

        //Fields all OK. Proceed to save changes to the poll via API call
        try {
            //Call API to save changes. Only 3 possible things that the admin can change.
            const updatePollByOidEndpoint = API_BASE_URL_ADMIN_MANAGEMENT  + POLLS_UPDATE_BY_OID_ENDPOINT
            const response = await axios.post(updatePollByOidEndpoint, {
                "oid": currentPoll.id,
                "update_document": {
                    "$set": {
                        "question": currentPoll.question,
                        "category": currentPoll.category,
                        "question_type": currentPoll.question_type,
                        "options": (currentPoll.question_type === PollQuestionTypeEnum.MCQ) ? currentPoll.options : [],
                    }
                }
            })

            //Show successful toast
            toast({
                variant: "success",
                description: "Changes are successfully saved.",
                duration: 3000,
            })
            window.location.reload()
        } catch (error) {
          console.log(error)

          //Show error toast
          toast({
            variant: "destructive",
            description: "There was a problem saving your changes.",
            duration: 3000,
          })
        } finally {
            //Clean up
            setIsLoading(false)
        }
    }

    
    return (
        <Button className='bg-yap-green-900 hover:bg-yap-green-800 duration-200 rounded-full'  onClick={ handleSaveChangesToPoll }>
            { isLoading ? 'Saving...' : 'Save Changes' }
        </Button>
    )
}
