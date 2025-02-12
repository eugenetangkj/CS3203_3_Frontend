"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { CategoryInterface } from "@/types/Category";



/**
This component represents the save changes button used in category management.
*/
export function CategoriesSaveChangesButton({ fetchCategories }: {
  fetchCategories: () => void;
  categories: CategoryInterface[]
}) {


    //Toast management
    const { toast } = useToast()


    //Handles logic for adding a category
    const handleSaveChanges = async (e: React.FormEvent) => {
      
        try {
            //TODO: Make API call

            //Show successful toast
            toast({
              description: "Changes successfully saved.",
            })

            //Refetch categories
            fetchCategories()
            



        } catch (error) {

          //Show error toast
          toast({
            variant: "destructive",
            description: "There was a problem saving your changes.",
          })

        } finally {
            //Clean up
        }
    }

  

  return (
    <Button className='rounded-full bg-yap-green-900 hover:bg-yap-green-800' onClick={ handleSaveChanges }>Save Changes</Button>
    
  )
}
