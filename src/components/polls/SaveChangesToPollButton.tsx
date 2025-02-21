"use client"

import { Poll } from "@/types/Poll"
import { Button } from "../ui/button"
import { useToast } from "@/hooks/use-toast"

/**
Represents a save changes to poll button that saves the latest information for the poll
*/
interface SaveChangesToPollButtonInterface {
    currentPoll: Poll,
}

export function SaveChangesToPollButton({ currentPoll }: SaveChangesToPollButtonInterface) {
    //Toast management
    const { toast } = useToast()


    //Updates the latest changes to the poll via API
    const handleSaveChangesToPoll = async () => {
        try {
            //TODO: Make API call
            //TODO: Input validation
            //TODO: Fill in API call and inform user
            console.log(currentPoll)

            //Show successful toast
            toast({
                variant: "success",
                description: "Changes successfully saved.",
                duration: 3000,
            })
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
        <Button className='bg-yap-green-900 hover:bg-yap-green-800 duration-200 rounded-full'  onClick={ handleSaveChangesToPoll }>
            Create Poll
        </Button>
    )
}
