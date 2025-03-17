"use client"

import { PollStatusEnum, PollTemplate } from "@/types/Poll";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL_ADMIN_MANAGEMENT, POLLS_INSERT_ONE_ENDPOINT } from "@/constants/ApiRoutes";
import { getCurrentDateTime } from "@/utils/HelperFunctions";
import axios from "axios";


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
            //Create a poll using this template
            const createPollEndpoint = API_BASE_URL_ADMIN_MANAGEMENT + '/' + POLLS_INSERT_ONE_ENDPOINT
            const response = await axios.post(createPollEndpoint, {
                "document": {
                    "question": pollTemplate.question,
                    "category": pollTemplate.category,
                    "question_type": pollTemplate.question_type,
                    "options": pollTemplate.options,
                    "date_created": getCurrentDateTime(),
                    "date_published": "",
                    "date_closed": "",
                    "status": PollStatusEnum.Unpublished
                }
            })
            const pollOid = response.data.oid
            
            //Show successful toast
            toast({
                variant: "success",
                description: "Poll is successfully created from the poll template.",
                duration: 3000,
            })

            //Navigate to the newly created poll
            router.push(`/polls/${pollOid}`)

        } catch (error) {
            //Show error toast
            console.log(error)
            toast({
                variant: "destructive",
                description: "There was a problem creating a poll from the poll template.",
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
