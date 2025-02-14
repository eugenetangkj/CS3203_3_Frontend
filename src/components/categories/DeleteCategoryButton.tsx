"use client"

import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
    AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Trash2Icon } from 'lucide-react';
import { useState } from "react";
import { useToast } from "@/hooks/use-toast"


/**
This component handles the functionality of deleting a category 
*/



interface DeleteCategoryButtonProps {
  title: string;
  fetchCategories: () => void
}



export function DeleteCategoryButton({ title, fetchCategories }: DeleteCategoryButtonProps) {

    //States
    const [open, setOpen] = useState(false)


    //Toast management
    const { toast } = useToast()



    const handleDeleteCategory = async (categoryName: string) => {
        try {
            //TODO: Delete logic API here
            
            //Show successful toast
            toast({
              variant: "success",
              description: "Category is successfully deleted.",
              duration: 3000,
            })

            //Refetch categories
            fetchCategories()
            
        } catch (error) {

          //Show error toast
          toast({
            variant: "destructive",
            description: "There was a problem deleting the category.",
            duration: 3000,
          })

        } finally {
            setOpen(false); //Close dialog
        }
    }


    return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash2Icon
              className="w-5 h-5 mx-auto cursor-pointer text-red-500  hover:text-red-400  duration-200"
            />
          </AlertDialogTrigger>


            <AlertDialogContent className='font-afacad'>
              <AlertDialogHeader>
                <AlertDialogTitle className='text-xl text-yap-black-800'>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription className='text-yap-black-800 text-base'>
                  This action cannot be undone. The category will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpen(false)} className='text-yap-black-800 duration-200 rounded-full'>Cancel</AlertDialogCancel>
                <AlertDialogAction className='bg-yap-brown-900 hover:bg-yap-brown-800 duration-200 rounded-full' onClick={() => handleDeleteCategory(title)}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
    );
  
    
};

export default DeleteCategoryButton;
