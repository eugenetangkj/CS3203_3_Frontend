"use client"

import { PollTemplate } from "@/types/Poll";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";


/** 
Button that allows the admin to create a poll from a given template.
*/
interface UsePollTemplateButtonProps {
    pollTemplate: PollTemplate
}


export function UsePollTemplateButton({ pollTemplate }: UsePollTemplateButtonProps) {
    //State managemenmt
    const [isLoading, setIsLoading] = useState<boolean>(false)

    //Toast management
    const { toast } = useToast()

    //Router management
    const router = useRouter();

    //Handle the logic where the admin decides to use this template
    const handleUseTemplate = async () => {
        setIsLoading(true)
        try {
            // const deleteCategoryApiEndpoint = API_BASE_URL_ADMIN_MANAGEMENT + '/' + CATEGORIES_DELETE_BY_OID_ENDPOINT
            // const response = await axios.post(deleteCategoryApiEndpoint, 
            //     {
            //         "oid": category.id
            //     } 
            // )
            // const wasCategoryDeletedSuccessfully = response.data.success
            // const messageFromApi = response.data.message

            // if (wasCategoryDeletedSuccessfully) {
            //     //Show successful toast
            //     toast({
            //         variant: "success",
            //         description: "Category is successfully deleted.",
            //         duration: 3000,
            //     })
            //     fetchCategories()
            // } else {
            //     //Show unsuccessful toast
            //     toast({
            //         variant: "destructive",
            //         description: messageFromApi,
            //         duration: 3000,
            //     })
            // }

            toast({
                variant: "success",
                description: "Poll is successfully created from the template.",
                duration: 3000,
            })
            router.push('/polls') //TODO: Update to path of the given poll, which is using the id of the newly created poll 

        } catch (error) {
            //Show error toast
            toast({
                variant: "destructive",
                description: "There was a problem deleting the category.",
                duration: 3000,
            })
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <Button className="rounded-full bg-yap-orange-900 hover:bg-yap-orange-800 duration-200 text-white text-base"
            onClick={ handleUseTemplate }>{isLoading ? 'Creating poll from template...' : 'Use Template'}</Button>
    );
  }