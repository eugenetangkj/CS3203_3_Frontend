"use client"

import { Poll } from "@/types/Poll"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
    AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { API_BASE_URL_ADMIN_MANAGEMENT, POLLS_DELETE_BY_OID_ENDPOINT } from "@/constants/ApiRoutes";
import axios from "axios";
import { useRouter } from "next/navigation";

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

        try {
            //Call API to delete poll
            const deletePollByOidEndpoint = API_BASE_URL_ADMIN_MANAGEMENT + '/' + POLLS_DELETE_BY_OID_ENDPOINT
            const response = await axios.post(deletePollByOidEndpoint, {
                "oid": currentPoll.id,
            })

            //Show successful toast
            toast({
                variant: "success",
                description: "Poll is successfully deleted.",
                duration: 3000,
            })
            router.push('/polls')
        } catch (error) {
            console.log(error)

            //Show error toast
            toast({
            variant: "destructive",
            description: "There was a problem deleting the poll.",
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
                <Button className='bg-red-500 hover:bg-red-400 duration-200 rounded-full'>
                    { isLoading ? 'Deleting...' : 'Delete Poll' }
                </Button>
            </AlertDialogTrigger>


            <AlertDialogContent className='font-afacad'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-xl text-yap-black-800'>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription className='text-yap-black-800 text-base'>
                        Once the poll is deleted, all the citizen responses associated with the poll will also be deleted.
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
