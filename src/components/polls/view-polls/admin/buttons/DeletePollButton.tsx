"use client"

import { Poll } from "@/types/Poll"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
    AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { useRouter } from "next/navigation";
import { pollsDeleteByOid } from "@/controllers/PollsFunctions";
import { ApiResponseStatus } from "@/types/ApiResponse";
import { CLOSED_POLLS_SWR_HOOK, ONGOING_POLLS_SWR_HOOK, POLLS_GET_BY_OID_SWR_HOOK, UNPUBLISHED_POLLS_SWR_HOOK } from "@/constants/SwrHooks";
import { mutate } from "swr";

/**
Represents a delete poll button that deletes a published poll by updating its status.
*/
interface DeletePollButtonProps {
    currentPoll: Poll,
}

export function DeletePollButton({ currentPoll }: DeletePollButtonProps) {
    //State management
    const [isLoading, setIsLoading] = useState<boolean>(false)

    //Toast management
    const { toast } = useToast()

    //Router
    const router = useRouter()


    //Deletes a poll
    const handleDeletePoll = async () => {
        setIsLoading(true)

        const result = await pollsDeleteByOid(currentPoll.id)
        if (result === ApiResponseStatus.Success) {
            toast({
                variant: "success",
                description: "Poll is successfully deleted.",
                duration: 3000,
            })
            mutate(ONGOING_POLLS_SWR_HOOK)
            mutate(CLOSED_POLLS_SWR_HOOK)
            mutate(UNPUBLISHED_POLLS_SWR_HOOK)
            router.push('/polls')
        } else {
            toast({
                variant: "destructive",
                description: "There was a problem deleting the poll.",
                duration: 3000,
                })
        }
        setIsLoading(false)
    }


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className='bg-red-500 hover:bg-red-400 duration-200 rounded-full' disabled={ isLoading }>
                    { isLoading ? 'Deleting...' : 'Delete Poll' }
                </Button>
            </AlertDialogTrigger>


            <AlertDialogContent className='font-afacad'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-xl text-yap-black-800'>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription className='text-yap-black-800 text-base'>
                        You cannot undo the deletion of a poll.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='text-yap-black-800 duration-200 rounded-full'>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='bg-yap-brown-900 hover:bg-yap-brown-800 duration-200 rounded-full' onClick={ handleDeletePoll }>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog> 
    )
}
