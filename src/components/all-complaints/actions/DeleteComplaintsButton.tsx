"use client"

import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
    AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button";
import { Complaint } from "@/types/Complaint";
import { API_BASE_URL_ADMIN_MANAGEMENT } from "@/constants/ApiRoutes";
import { COMPLAINTS_DELETE_MANY_BY_OIDS_ENDPOINT } from "@/constants/ApiRoutes";
import axios from "axios";


/**
This component handles the functionality of deleting complaints
*/
interface DeleteComplaintsButtonProps {
    complaintsToDelete: Complaint[]
    setSelectedComplaints: React.Dispatch<React.SetStateAction<Complaint[]>>,
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    fetchComplaints: () => void
}

const DELETE_COMPLAINT_API_ENDPOINT = API_BASE_URL_ADMIN_MANAGEMENT  + COMPLAINTS_DELETE_MANY_BY_OIDS_ENDPOINT

export default function DeleteComplaintsButton({ complaintsToDelete, setSelectedComplaints, currentPage, setCurrentPage, fetchComplaints }: DeleteComplaintsButtonProps) {

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
            //Make API call to delete selected categories
            const oidsOfComplaintsToDelete: string[] = complaintsToDelete.map((complaint) => complaint.oid)
            const response = await axios.post(DELETE_COMPLAINT_API_ENDPOINT, {
                "oids": oidsOfComplaintsToDelete
            });

            if (response.data.success) {
                toast({
                    variant: "success",
                    description: "Complaint(s) are successfully deleted.",
                    duration: 3000,
                })
            } else {
                toast({
                    variant: "destructive",
                    description: response.data.message,
                    duration: 3000,
                })
            }
        } catch (error) {
            //There is an error in deleting. Show unsuccessful toast.
            toast({
                variant: "destructive",
                description: "There was a problem deleting the complaint(s).",
                duration: 3000,
            })
        } finally {
            //Reset all the necessary parent states
            if (currentPage == 1) {
                setSelectedComplaints([])
                setCurrentPage(1)
                fetchComplaints()
            } else {
                setSelectedComplaints([])
                setCurrentPage(1)
            }

            //Reset button states
            setOpen(false)
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
