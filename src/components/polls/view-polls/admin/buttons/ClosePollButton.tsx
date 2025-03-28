"use client"

import { Poll, PollStatusEnum } from "@/types/Poll"
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
import { CLOSED_POLLS_SWR_HOOK, POLLS_GET_BY_OID_SWR_HOOK } from "@/constants/SwrHooks";

/**
Represents a close poll button that closes a published poll by updating its status.
*/
interface ClosePollButtonProps {
    currentPoll: Poll,
}

export function ClosePollButton({ currentPoll }: ClosePollButtonProps) {
    //State management
    const [isLoading, setIsLoading] = useState<boolean>(false)

    //Toast management
    const { toast } = useToast()

    //Closes a poll by updating its status to closed via API
    const handleClosePoll = async () => {
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
               "status": PollStatusEnum.Closed,
                "date_closed": getCurrentDateTime()
            }
        )

        //Show toast
        if (result === ApiResponseStatus.Success) {
            // mutate(`${POLLS_GET_BY_OID_SWR_HOOK}/${currentPoll.id}`)
            mutate(CLOSED_POLLS_SWR_HOOK)
            toast({
                variant: "success",
                description: "Poll is successfully closed.",
                duration: 3000,
            })
            window.location.reload()
        } else {
            toast({
                variant: "destructive",
                description: "There was a problem closing the poll.",
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
                    { isLoading ? 'Closing...' : 'Close Poll' }
                </Button>
            </AlertDialogTrigger>


            <AlertDialogContent className='font-afacad'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-xl text-yap-black-800'>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription className='text-yap-black-800 text-base'>
                        Once the poll is closed, the public will no longer be able to provide responses.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='text-yap-black-800 duration-200 rounded-full'>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='bg-yap-brown-900 hover:bg-yap-brown-800 duration-200 rounded-full' onClick={ handleClosePoll }>
                        Close
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog> 
    )
}
