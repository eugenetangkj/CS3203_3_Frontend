"use client"

import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
    AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button";
import { Complaint } from "@/types/Complaint";
import { complaintsDeleteManyByOids } from "@/controllers/ComplaintsFunctions";
import { ApiResponseStatus } from "@/types/ApiResponse";
import { useRefreshComplaints } from "@/hooks/use-refresh-complaints";


/**
This component handles the functionality of deleting complaints
*/
interface DeleteComplaintsButtonProps {
    readonly complaintsToDelete: Complaint[],
    readonly setSelectedComplaints: React.Dispatch<React.SetStateAction<Complaint[]>>,
}

export default function DeleteComplaintsButton({ complaintsToDelete, setSelectedComplaints }: DeleteComplaintsButtonProps) {

    //States
    const [isDeleting, setIsDeleting] = useState(false)

    //Toast management
    const { toast } = useToast()

    //Hooks
    const refreshAllComplaints = useRefreshComplaints();


    //Handles what happens when user presses confirm on delete
    const handleDeleteComplaints = async () => {
        //Indicate that complaints are being deleted
        setIsDeleting(true)

        //Delete complaints
        const oidsOfComplaintsToDelete: string[] = complaintsToDelete.map((complaint) => complaint.oid)
        const apiResponse = await complaintsDeleteManyByOids(oidsOfComplaintsToDelete)
        if (apiResponse === ApiResponseStatus.Success) {
            toast({
                variant: "success",
                description: "Complaint(s) are successfully deleted.",
                duration: 3000,
            })
        } else {
            toast({
                variant: "destructive",
                description: "There was a problem deleting the complaint(s).",
                duration: 3000,
            })
        }

        //Reset button states
        setIsDeleting(false)   

        //Refresh states
        setSelectedComplaints([])
        refreshAllComplaints()
    }


    //Actual component
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className='w-fit rounded-full self-end bg-red-500 hover:bg-red-400 duration-200' disabled={ isDeleting }>{ isDeleting ? 'Deleting...' : 'Delete'}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='font-afacad'>
              <AlertDialogHeader>
                <AlertDialogTitle className='text-xl text-yap-black-800'>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription className='text-yap-black-800 text-base'>
                  This action cannot be undone. The selected complaint(s) will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className='text-yap-black-800 duration-200 rounded-full' disabled={ isDeleting }>Cancel</AlertDialogCancel>
                <AlertDialogAction className='bg-yap-brown-900 hover:bg-yap-brown-800 duration-200 rounded-full' onClick={() => handleDeleteComplaints()}>
                    Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
    );

};
