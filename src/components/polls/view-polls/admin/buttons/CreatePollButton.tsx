"use client"

import { Poll, PollQuestionTypeEnum, PollStatusEnum } from "@/types/Poll"
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { API_BASE_URL_ADMIN_MANAGEMENT, POLLS_INSERT_ONE_ENDPOINT } from "@/constants/ApiRoutes";
import axios from "axios";
import { getCurrentDateTime, validatePollBeforeUpdating } from "@/utils/HelperFunctions";
import { useRouter } from "next/navigation";
import { pollsInsertOne } from "@/data-fetchers/PollsFunctions";
import { mutate } from "swr";
import { UNPUBLISHED_POLLS_SWR_HOOK } from "@/constants/SwrHooks";


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
        //Set loading state
        setIsLoading(true)

        //Check if there is anything wrong with the user's input
        const errorMessage = validatePollBeforeUpdating(currentPoll)
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
        const pollDocument = {
            "question": currentPoll.question,
            "category": currentPoll.category,
            "question_type": currentPoll.question_type,
            "options": (currentPoll.question_type === PollQuestionTypeEnum.MCQ) ? currentPoll.options : [],
            "date_created": getCurrentDateTime(),
            "date_published": null,
            "date_closed": null,
            "status": PollStatusEnum.Unpublished
        }

        const pollOid = await pollsInsertOne(pollDocument)

        if (pollOid.length === 0) {
            //Show error toast
            toast({
                variant: "destructive",
                description: "There was a problem creating the poll.",
                duration: 3000,
            })
        } else {
            //Show successful toast
            toast({
                variant: "success",
                description: "Poll is successfully created.",
                duration: 3000,
            })

            //Mutate state
            mutate(UNPUBLISHED_POLLS_SWR_HOOK)

            //Navigate to the newly created poll
            router.push(`/polls/${pollOid}`)
        }
        setIsLoading(false)
    }
        

    return (
        <Button className='bg-yap-orange-900 hover:bg-yap-orange-800 duration-200 rounded-full'  onClick={handleCreatePoll} disabled={ isLoading }>
            { isLoading ? 'Creating...' : 'Create Poll' }
        </Button>
    )
}
