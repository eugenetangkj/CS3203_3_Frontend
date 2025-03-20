"use client"

import { Poll, PollStatusEnum, PollQuestionTypeEnum } from "@/types/Poll"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
    AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { API_BASE_URL_ADMIN_MANAGEMENT, POLLS_UPDATE_BY_OID_ENDPOINT } from "@/constants/ApiRoutes";
import axios from "axios";
import { getCurrentDateTime } from "@/utils/HelperFunctions";

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

        //Check if all fields are okay
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


        try {
            //Call API to save changes and update poll status to published and set date published
            const updatePollByOidEndpoint = API_BASE_URL_ADMIN_MANAGEMENT + '/' + POLLS_UPDATE_BY_OID_ENDPOINT
            const response = await axios.post(updatePollByOidEndpoint, {
                "oid": currentPoll.id,
                "update_document": {
                    "$set": {
                        "question": currentPoll.question,
                        "category": currentPoll.category,
                        "question_type": currentPoll.question_type,
                        "options": (currentPoll.question_type === PollQuestionTypeEnum.MCQ) ? currentPoll.options : [],
                        "status": PollStatusEnum.Published,
                        "date_published": getCurrentDateTime()
                    }
                }
            })

            //Show successful toast
            toast({
                variant: "success",
                description: "Poll is successfully published.",
                duration: 3000,
            })
            window.location.reload()
        } catch (error) {
            console.log(error)

            //Show error toast
            toast({
            variant: "destructive",
            description: "There was a problem publishing the poll.",
            duration: 3000,
            })
        } finally {
            //Clean up
            setIsLoading(false)
        }
    }

    
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className='bg-yap-orange-900 hover:bg-yap-orange-800 duration-200 rounded-full'>
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
