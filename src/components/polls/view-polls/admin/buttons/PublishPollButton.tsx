"use client"

import { Poll, PollStatusEnum, PollQuestionTypeEnum } from "@/types/Poll"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
    AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { getCurrentDateTime } from "@/utils/HelperFunctions";
import { validatePollBeforeUpdating } from "@/utils/HelperFunctions";
import { pollsUpdateByOid } from "@/controllers/PollsFunctions";
import { ApiResponseStatus } from "@/types/ApiResponse";
import { mutate } from "swr";
import { ONGOING_POLLS_SWR_HOOK, POLLS_GET_BY_OID_SWR_HOOK } from "@/constants/SwrHooks";

/**
Represents a publish poll button that publishes a poll by updating its status.
*/
interface PublishPollButtonProps {
    currentPoll: Poll,
}

export function PublishPollButton({ currentPoll }: PublishPollButtonProps) {
    //State management
    const [isLoading, setIsLoading] = useState<boolean>(false)

    //Toast management
    const { toast } = useToast()


    //Publishes a poll by updating its status to published via API
    const handlePublishPoll = async () => {
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
                "status": PollStatusEnum.Published,
                "date_published": getCurrentDateTime()
            }
        )

        //Show toast
        if (result === ApiResponseStatus.Success) {
            toast({
                variant: "success",
                description: "Poll is successfully published.",
                duration: 3000,
            })
            mutate(ONGOING_POLLS_SWR_HOOK)
            window.location.reload()
        } else {
            toast({
                variant: "destructive",
                description: "There was a problem publishing the poll.",
                duration: 3000,
            })
        }

        //Clean up
        setIsLoading(false)
    }

    
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className='bg-yap-orange-900 hover:bg-yap-orange-800 duration-200 rounded-full' disabled={ isLoading }>
                    { isLoading ? 'Publishing...' : 'Publish Poll' }
                </Button>
            </AlertDialogTrigger>


            <AlertDialogContent className='font-afacad'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-xl text-yap-black-800'>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription className='text-yap-black-800 text-base'>
                        Once the poll is published, it will be made public.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='text-yap-black-800 duration-200 rounded-full'>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='bg-yap-brown-900 hover:bg-yap-brown-800 duration-200 rounded-full' onClick={ handlePublishPoll }>
                        Publish
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog> 
    )
}
