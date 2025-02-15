"use client"

import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
    AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast"
import { Button } from "../ui/button";
import { Complaint } from "@/types/Complaint";


/**
This component handles the functionality of deleting complaints
*/
interface DeleteComplaintsButtonProps {
    complaintsToDelete: Complaint[]
    resetStates: () => void
}

export default function DeleteComplaintsButton({ complaintsToDelete, resetStates }: DeleteComplaintsButtonProps) {

    //States
    const [open, setOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    //Toast management
    const { toast } = useToast()


    //Handles what happens when user presses confirm on delete
    const handleDeleteCategory = async () => {
        //Indicate that complaints are being deleted
        setIsDeleting(true)

        //Delete complaints
        try {
            //TODO: Make API call to delete the selected complaints using variable complaintsToDelete
            console.log(complaintsToDelete)

            //Complaints were successfully deleted. Show successful toast.
            toast({
                variant: "success",
                description: "Complaint(s) are successfully deleted.",
                duration: 3000,
            })
        } catch (error) {
            //There is an error in deleting. Show unsuccessful toast.
            toast({
                variant: "destructive",
                description: "There was a problem deleting the complaint(s).",
                duration: 3000,
            })
            console.log(error)
        } finally {
            //Reset all the parent states
            resetStates()

            //Reset button states
            setOpen(false)
            console.log(open)
            setIsDeleting(false)   
        }
    }


    //Actual component
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className='w-fit rounded-full self-end bg-red-500 hover:bg-red-400 duration-200'>Delete</Button>
            </AlertDialogTrigger>


            <AlertDialogContent className='font-afacad'>
              <AlertDialogHeader>
                <AlertDialogTitle className='text-xl text-yap-black-800'>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription className='text-yap-black-800 text-base'>
                  This action cannot be undone. The selected complaint(s) will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpen(false)} className='text-yap-black-800 duration-200 rounded-full' disabled={ isDeleting }>Cancel</AlertDialogCancel>
                <AlertDialogAction className='bg-yap-brown-900 hover:bg-yap-brown-800 duration-200 rounded-full' onClick={() => handleDeleteCategory()} disabled={ isDeleting }>
                  { isDeleting ? 'Deleting...' : 'Confirm'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
    );
  
    
};
