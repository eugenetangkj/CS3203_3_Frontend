"use client"


import { Poll } from "@/types/Poll"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

/**
Represents a publish poll button that publishes a poll by updating its status.
*/
interface PublishPollButton {
    currentPoll: Poll,
}

export function PublishPollButton({ currentPoll }: PublishPollButton) {
    //State management
    const [isLoading, setIsLoading] = useState<boolean>(false)

    //Toast management
    const { toast } = useToast()


    //Publishes a poll by updating its status to published via API
    const handlePublishPoll = async () => {
        setIsLoading(true)


        try {
            //Call API to update the poll'status to Published using the poll's ID value. Unsaved changes will not be published.

            //Show successful toast
            toast({
                variant: "success",
                description: "Poll has been successfully published.",
                duration: 3000,
            })
            window.location.reload();
        } catch (error) {
          console.log(error)

          //Show error toast
          toast({
            variant: "destructive",
            description: "There was a problem publishing your poll",
            duration: 3000,
          })
        } finally {
            setIsLoading(false)
        }
    }

    
    return (
        <Button className='bg-yap-orange-900 hover:bg-yap-orange-800 duration-200 rounded-full'  onClick={ handlePublishPoll }>
            { isLoading ? 'Publishing...' : 'Publish Poll' }
        </Button>
    )
}
