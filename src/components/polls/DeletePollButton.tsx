"use client"

import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
    AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast"
import { Poll } from "@/types/Poll";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";


/**
Represents a delete poll button that deletes the poll
*/
interface DeletePollButtonProps {
  currentPoll: Poll,
}



export function DeletePollButton({ currentPoll }: DeletePollButtonProps) {

    //States
    const [open, setOpen] = useState(false)

    //Router
    const router = useRouter()

    //Toast management
    const { toast } = useToast()


    // Runs API to delete the poll
    const handleDeletePoll = async () => {
        try {
            //TODO: Delete poll API here
         
            //Route the user to all polls page
            router.push('/polls')
        } catch (error) {
            //Show error toast
            toast({
                variant: "destructive",
                description: "There was a problem deleting the poll.",
                duration: 3000,
            })

        } finally {
            setOpen(false); //Close dialog
        }
    }


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className='bg-red-500 hover:bg-red-400 duration-200 rounded-full'>
                    Delete Poll
                </Button>
            
            </AlertDialogTrigger>


            <AlertDialogContent className='font-afacad'>
              <AlertDialogHeader>
                <AlertDialogTitle className='text-xl text-yap-black-800'>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription className='text-yap-black-800 text-base'>
                    The poll will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpen(false)} className='text-yap-black-800 duration-200 rounded-full'>Cancel</AlertDialogCancel>
                <AlertDialogAction className='bg-yap-brown-900 hover:bg-yap-brown-800 duration-200 rounded-full' onClick={ handleDeletePoll }>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
    );
  
    
};

export default DeletePollButton;
