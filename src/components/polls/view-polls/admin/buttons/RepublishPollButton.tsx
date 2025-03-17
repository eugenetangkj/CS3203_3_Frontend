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
Represents a republish poll button that republishes a closed poll by updating its status
*/
interface RepublishPollButtonProps {
    currentPoll: Poll,
}

export function RepublishPollButton({ currentPoll }: RepublishPollButtonProps) {
    //State management
    const [isLoading, setIsLoading] = useState<boolean>(false)

    //Toast management
    const { toast } = useToast()


    //Republishes a poll by updating its status to published via API
    const handleRepublishPoll = async () => {
        setIsLoading(true)

        try {
            //Call API to update poll status to published and set date published and date closed
            const updatePollByOidEndpoint = API_BASE_URL_ADMIN_MANAGEMENT + '/' + POLLS_UPDATE_BY_OID_ENDPOINT
            const response = await axios.post(updatePollByOidEndpoint, {
                "oid": currentPoll.id,
                "update_document": {
                    "$set": {
                        "status": PollStatusEnum.Published,
                        "date_published": getCurrentDateTime(),
                        "date_closed": ""
                    }
                }
            })

            //Show successful toast
            toast({
                variant: "success",
                description: "Poll is successfully republished.",
                duration: 3000,
            })
            window.location.reload()
        } catch (error) {
            console.log(error)

            //Show error toast
            toast({
            variant: "destructive",
            description: "There was a problem republishing the poll.",
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
                    { isLoading ? 'Republishing...' : 'Republish Poll' }
                </Button>
            </AlertDialogTrigger>


            <AlertDialogContent className='font-afacad'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-xl text-yap-black-800'>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription className='text-yap-black-800 text-base'>
                        If you republish the poll, the poll will be open to responses again.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='text-yap-black-800 duration-200 rounded-full'>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='bg-yap-brown-900 hover:bg-yap-brown-800 duration-200 rounded-full' onClick={ handleRepublishPoll }>
                        Republish
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog> 
    )
}
