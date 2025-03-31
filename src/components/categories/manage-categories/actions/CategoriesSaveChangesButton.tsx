"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

/**
This component represents the save changes button used in category management.
*/
export function CategoriesSaveChangesButton({ fetchCategories }: {
    readonly fetchCategories: () => void,
}) {


    //Toast management
    const { toast } = useToast()


    //Handles logic for adding a category
    const handleSaveChanges = async () => {
      
        try {
            //Show successful toast
            toast({
                variant: "success",
                description: "Changes successfully saved.",
                duration: 3000,
            })

            //Refetch categories
            fetchCategories()

        } catch (error) {
          console.log(error)

          //Show error toast
          toast({
            variant: "destructive",
            description: "There was a problem saving your changes.",
            duration: 3000,
          })

        } finally {
            //Clean up
        }
    }

  return (
    <Button className='rounded-full bg-yap-green-900 hover:bg-yap-green-800' onClick={ handleSaveChanges }>Save Changes</Button>
  )
}
