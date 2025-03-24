"use client"

import { Poll, PollQuestionTypeEnum, PollStatusEnum } from "@/types/Poll"
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { API_BASE_URL_ADMIN_MANAGEMENT, POLLS_INSERT_ONE_ENDPOINT } from "@/constants/ApiRoutes";
import axios from "axios";
import { getCurrentDateTime } from "@/utils/HelperFunctions";
import { useRouter } from "next/navigation";


/**
Represents a create poll button that creates a poll given a Poll object
*/
interface CreatePollButtonInterface {
    currentPoll: Poll,
}

export function CreatePollButton({ currentPoll }: CreatePollButtonInterface) {
    //State managemenmt
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    //Toast management
    const { toast } = useToast()

    //Router management
    const router = useRouter();
    

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
            const createPollEndpoint = API_BASE_URL_ADMIN_MANAGEMENT  + POLLS_INSERT_ONE_ENDPOINT
            const response = await axios.post(createPollEndpoint, {
                "document": {
                    "question": currentPoll.question,
                    "category": currentPoll.category,
                    "question_type": currentPoll.question_type,
                    "options": (currentPoll.question_type === PollQuestionTypeEnum.MCQ) ? currentPoll.options : [],
                    "date_created": getCurrentDateTime(),
                    "date_published": null,
                    "date_closed": null,
                    "status": PollStatusEnum.Unpublished
                }
            })
            const pollOid = response.data.oid


            //Show successful toast
            toast({
                variant: "success",
                description: "Poll is successfully created.",
                duration: 3000,
            })

            //Navigate to the newly created poll
            router.push(`/polls/${pollOid}`)
        } catch (error) {
            //Show error toast
            toast({
                variant: "destructive",
                description: "There was a problem creating the poll.",
                duration: 3000,
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button className='bg-yap-orange-900 hover:bg-yap-orange-800 duration-200 rounded-full'  onClick={handleCreatePoll} disabled={ isLoading }>
            { isLoading ? 'Creating...' : 'Create Poll' }
        </Button>
    )
}
