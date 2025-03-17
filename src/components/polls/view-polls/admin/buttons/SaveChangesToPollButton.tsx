"use client"

import { Poll } from "@/types/Poll"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { PollQuestionTypeEnum } from "@/types/Poll"

/**
Represents a save changes to poll button that saves the latest information for the poll
*/
interface SaveChangesToPollButtonInterface {
    currentPoll: Poll,
    setPoll: React.Dispatch<React.SetStateAction<Poll>>,
}

export function SaveChangesToPollButton({ currentPoll, setPoll }: SaveChangesToPollButtonInterface) {
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
            //For open-ended, reset all fields
            if (currentPoll.question_type === PollQuestionTypeEnum.OpenEnded) {
                setPoll((prevPoll) => ({
                    ...prevPoll,
                    options: []
                }));
            }

            //Call API to save changes

            //Show successful toast
            toast({
                variant: "success",
                description: "Changes successfully saved.",
                duration: 3000,
            })
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
