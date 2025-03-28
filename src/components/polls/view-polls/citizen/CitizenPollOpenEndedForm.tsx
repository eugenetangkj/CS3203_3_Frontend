"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Poll } from "@/types/Poll";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { PollStatusEnum } from "@/types/Poll";
import { getRandomCollectible } from "@/constants/Constants";
import { addStringToListIfAbsent, getCurrentDateTime } from "@/utils/HelperFunctions";
import { CitizenRewardPanel } from "./CitizenRewardPanel";
import { useUserProfile } from "@/hooks/use-user-profile";
import { pollResponsesInsertOne } from "@/controllers/PollResponsesFunctions";
import { ApiResponseStatus } from "@/types/ApiResponse";
import { userUpdateProfileByOid } from "@/controllers/UsersFunctions";
import { mutate } from "swr";
import { POLLS_GET_BY_OID_SWR_HOOK, POLL_RESPONSES_GET_ONE_SWR_HOOK } from "@/constants/SwrHooks";

/**
Represents the form for the citizen to submit his response to an open-ended question
*/
interface CitizenPollOpenEndedFormProps {
    currentPoll: Poll,
    shouldDisable: boolean,
    userResponse: string,
}

const OpenEndedFormSchema = z.object({
    response: z.string()
        .trim()
        .min(1, { message: "Your response must not be empty." })
});


export function CitizenPollOpenEndedForm({ currentPoll, shouldDisable, userResponse }: CitizenPollOpenEndedFormProps) {
    //States
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [isRewardPanelOpen, setIsRewardPanelOpen] = useState<boolean>(false)
    const [collectible, setCollectible] = useState<string>('')
    const { toast } = useToast()
    const { data: userProfile, error: useUserProfileError, isLoading: useUserProfileIsLoading  } = useUserProfile(); 


    const form = useForm<z.infer<typeof OpenEndedFormSchema>>({
        resolver: zodResolver(OpenEndedFormSchema),
        defaultValues: {
            response: userResponse
        }
    })


    async function handleError() {
        toast({
            variant: "destructive",
            description: "We could not process your submission. Please try again.",
            duration: 3000,
        })
        setIsSubmitting(false)
    }


    async function onSubmit(data: z.infer<typeof OpenEndedFormSchema>) {
        const userResponse = data.response
        setIsSubmitting(true)

        if (useUserProfileError || useUserProfileIsLoading || userProfile === undefined) {
            handleError()
            return
        }

        //STEP 1: Create poll response
        const resultOfInsertingPollResponse = await pollResponsesInsertOne({
            "poll_id": currentPoll.id,
            "user_id": userProfile?.id,
            "response": userResponse,
            "date_submitted": getCurrentDateTime()
        })
        if (resultOfInsertingPollResponse === ApiResponseStatus.Failure) {
            handleError()
            return
        }

        //STEP 2: Create updated collectibles list for the user
        const userCollectibles = userProfile.collectibles
        const collectibleGiven =  getRandomCollectible() //The collectible to give
        const newUserCollectibles = addStringToListIfAbsent(userCollectibles, collectibleGiven)

        //STEP 3: Update profile
        const resultOfUpdatingProfile = await userUpdateProfileByOid(userProfile.id, {
            "collectibles": newUserCollectibles
        })
        if (resultOfUpdatingProfile === ApiResponseStatus.Failure) {
            handleError()
            return
        }

        //STEP 4: Update component state
        setCollectible(collectibleGiven)

        //STEP 5: Create alert to inform the user
        setIsRewardPanelOpen(true)
        setIsSubmitting(false)

        //STEP 6: Update swr
        mutate(`${POLLS_GET_BY_OID_SWR_HOOK}/${currentPoll.id}`)
        mutate(`${POLL_RESPONSES_GET_ONE_SWR_HOOK}/${currentPoll.id}/${userProfile.id}`)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
                <FormField render={({ field }) => (
                    <FormItem className="space-y-8">
                        <FormLabel className='text-yap-brown-900 text-2xl sm:text-3xl 2xl:text-4xl font-normal'>
                            {currentPoll.question}
                        </FormLabel>
                        <FormControl>
                            <Textarea
                                {...field}
                                className="w-full h-32 p-4 border rounded-lg resize-none text-lg text-yap-black-800"
                                placeholder="Type your response here..."
                                disabled={ shouldDisable || isSubmitting || currentPoll.status == PollStatusEnum.Closed }
                            />
                        </FormControl>
                        <FormMessage className='text-lg md:text-xl font-normal' />
                    </FormItem>
                )}
                control={form.control}
                name="response"
                />
                <Button type="submit" className='self-center rounded-full w-1/2 text-white bg-yap-orange-900 hover:bg-yap-orange-800 duration-200 text-lg py-4 md:py-6 disabled:cursor-not-allowed'
                    disabled={ shouldDisable || isSubmitting || currentPoll.status == PollStatusEnum.Closed }>{isSubmitting ? 'Submitting...' : 'Submit'}</Button>
            </form>
            <CitizenRewardPanel isRewardPanelOpen={ isRewardPanelOpen } setIsRewardPanelOpen={ setIsRewardPanelOpen } collectiblePath={ collectible } />
        </Form>

  )
}
