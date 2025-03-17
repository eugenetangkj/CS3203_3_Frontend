"use client"


import { Poll, PollStatusEnum } from "@/types/Poll"
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
interface PublishPollButton {
    currentPoll: Poll,
}

export function PublishPollButton({ currentPoll }: PublishPollButton) {
    //State management
    const [isLoading, setIsLoading] = useState<boolean>(false)

    //Toast management
    const { toast } = useToast()


    //Publishes a poll by updating its status to published via API
    const handlePublishPoll = async () => {
        setIsLoading(true)

        try {
            //Call API to update poll status to published and set date published
            const updatePollByOidEndpoint = API_BASE_URL_ADMIN_MANAGEMENT + '/' + POLLS_UPDATE_BY_OID_ENDPOINT
            const response = await axios.post(updatePollByOidEndpoint, {
                "oid": currentPoll.id,
                "update_document": {
                    "$set": {
                        "status": PollStatusEnum.Published,
                        "date_published": getCurrentDateTime()
                    }
                }
            })

            //Show successful toast
            toast({
                variant: "success",
                description: "Poll is successfully published..",
                duration: 3000,
            })
            window.location.reload()
        } catch (error) {
            console.log(error)

            //Show error toast
            toast({
            variant: "destructive",
            description: "There was a problem publishing the poll",
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
                        Once the poll is published, it will be made public. Also, please ensure that you have saved your changes before publishing.
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
