"use client"

import { Poll, PollQuestionTypeEnum } from "@/types/Poll"
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";


/**
Represents a create poll button that creates a poll given a Poll object
*/
interface CreatePollButtonInterface {
    currentPoll: Poll,
    setPoll: React.Dispatch<React.SetStateAction<Poll>>,
}

export function CreatePollButton({ currentPoll, setPoll }: CreatePollButtonInterface) {
    //State managemenmt
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    //Toast management
    const { toast } = useToast()
    

    //Creates the poll via API and redirects the user to the poll page
    const handleCreatePoll = async () => {
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


        // Fields all OK. Proceed to call API to create the poll.
        try {
            //For open-ended, reset all fields
            if (currentPoll.question_type === PollQuestionTypeEnum.OpenEnded) {
                setPoll((prevPoll) => ({
                    ...prevPoll,
                    options: []
                }));
            }

            //Call the API to create poll
            // const deleteCategoryApiEndpoint = API_BASE_URL_ADMIN_MANAGEMENT + '/' + CATEGORIES_DELETE_BY_OID_ENDPOINT
            // const response = await axios.post(deleteCategoryApiEndpoint, 
            //     {
            //         "oid": category.id
            //     } 
            // )
            // const wasCategoryDeletedSuccessfully = response.data.success
            // const messageFromApi = response.data.message

            // if (wasCategoryDeletedSuccessfully) {
            //     //Show successful toast
            //     toast({
            //         variant: "success",
            //         description: "Category is successfully deleted.",
            //         duration: 3000,
            //     })
            //     fetchCategories()
            // } else {
            //     //Show unsuccessful toast
            //     toast({
            //         variant: "destructive",
            //         description: messageFromApi,
            //         duration: 3000,
            //     })
            // }

            toast({
                variant: "success",
                description: "Poll is successfully created.",
                duration: 3000,
            })
            window.location.reload();

        } catch (error) {
            //Show error toast
            toast({
                variant: "destructive",
                description: "There was a problem deleting the category.",
                duration: 3000,
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button className='bg-yap-orange-900 hover:bg-yap-orange-800 duration-200 rounded-full'  onClick={handleCreatePoll}>
            { isLoading ? 'Creating...' : 'Create Poll' }
        </Button>
    )
}
