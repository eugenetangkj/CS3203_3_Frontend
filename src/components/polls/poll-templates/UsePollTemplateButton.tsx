"use client"

import { PollStatusEnum, PollTemplate } from "@/types/Poll";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentDateTime } from "@/utils/HelperFunctions";
import { pollsInsertOne } from "@/controllers/PollsFunctions";
import { mutate } from "swr";
import { UNPUBLISHED_POLLS_SWR_HOOK } from "@/constants/SwrHooks";


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
        //Update loading state
        setIsLoading(true)

        //Insert poll
        const pollOid = await pollsInsertOne({
            "question": pollTemplate.question,
            "category": pollTemplate.category,
            "question_type": pollTemplate.question_type,
            "options": pollTemplate.options,
            "date_created": getCurrentDateTime(),
            "date_published": null,
            "date_closed": null,
            "status": PollStatusEnum.Unpublished
        })

        if (pollOid.length === 0) {
            //CASE 1: Unsuccessful in inserting poll
            toast({
                variant: "destructive",
                description: "There was a problem creating a poll from the poll template.",
                duration: 3000,
            })
        } else {
            //CASE 2: Successful in inserting poll
            toast({
                variant: "success",
                description: "Poll is successfully created from the poll template.",
                duration: 3000,
            })
            mutate(UNPUBLISHED_POLLS_SWR_HOOK)
            router.push(`/polls/${pollOid}`)
        }

    
        //Update loading state
        setIsLoading(false)
    }
    


    return (
        <Button className="rounded-full bg-yap-orange-900 hover:bg-yap-orange-800 duration-200 text-white text-base"
            onClick={ handleUseTemplate } disabled={ isLoading }>{isLoading ? 'Creating poll from template...' : 'Use Template'}</Button>
    );
}
