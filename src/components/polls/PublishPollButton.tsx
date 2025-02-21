"use client"

import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
    AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast"
import { Poll } from "@/types/Poll";
import { Button } from "../ui/button";


/**
Represents a publish poll button that publishes the poll
*/
interface PublishPollButtonProps {
  currentPoll: Poll,
}



export function PublishPollButton({ currentPoll }: PublishPollButtonProps) {

    //States
    const [open, setOpen] = useState(false)

    //Toast management
    const { toast } = useToast()


    const handlePublishPoll = async () => {
        try {
            //TODO: Publish poll API here
         
            
            //Show successful toast
            toast({
              variant: "success",
              description: "Poll is successfully published",
              duration: 3000,
            })

            //TODO: Update current poll to refresh the page
  
        } catch (error) {
            //Show error toast
            toast({
                variant: "destructive",
                description: "There was a problem publishing the poll.",
                duration: 3000,
            })

        } finally {
            setOpen(false); //Close dialog
        }
    }


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className='bg-yap-orange-900 hover:bg-yap-orange-800 duration-200 rounded-full'>
                    Publish Poll
                </Button>
            
            </AlertDialogTrigger>


            <AlertDialogContent className='font-afacad'>
              <AlertDialogHeader>
                <AlertDialogTitle className='text-xl text-yap-black-800'>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription className='text-yap-black-800 text-base'>
                    The poll will be open to citizen submissions.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpen(false)} className='text-yap-black-800 duration-200 rounded-full'>Cancel</AlertDialogCancel>
                <AlertDialogAction className='bg-yap-brown-900 hover:bg-yap-brown-800 duration-200 rounded-full' onClick={ handlePublishPoll }>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
    );
  
    
};

export default PublishPollButton;
