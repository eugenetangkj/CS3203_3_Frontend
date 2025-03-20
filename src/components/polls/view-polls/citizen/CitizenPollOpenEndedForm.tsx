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
import axios from "axios";
import { API_BASE_URL_ADMIN_MANAGEMENT, CHECK_USER_AUTH_SERVER_ENDPOINT, POLL_RESPONSES_INSERT_ONE_ENDPOINT,
    API_BASE_URL_USER_MANAGEMENT, GET_PROFILE_BY_OID_ENDPOINT, 
    UPDATE_PROFILE_BY_OID_ENDPOINT} from "@/constants/ApiRoutes";
import { getRandomCollectible } from "@/constants/Constants";
import { addStringToListIfAbsent, getCurrentDateTime } from "@/utils/HelperFunctions";
import { CitizenRewardPanel } from "./CitizenRewardPanel";

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


    const form = useForm<z.infer<typeof OpenEndedFormSchema>>({
        resolver: zodResolver(OpenEndedFormSchema),
        defaultValues: {
            response: userResponse
        }
    })

    async function onSubmit(data: z.infer<typeof OpenEndedFormSchema>) {
        const userResponse = data.response
        setIsSubmitting(true)
        try {
            //STEP 1: Retrieve user oid
            const response = await axios.post(CHECK_USER_AUTH_SERVER_ENDPOINT);
            const userOid = response.data.userOid

            //STEP 2: Create poll response
            const insertPollResponseEndpoint = API_BASE_URL_ADMIN_MANAGEMENT + '/' + POLL_RESPONSES_INSERT_ONE_ENDPOINT
            await axios.post(insertPollResponseEndpoint,
                {
                    "document": {
                        "poll_id": currentPoll.id,
                        "user_id": userOid,
                        "response": userResponse,
                        "date_submitted": getCurrentDateTime()
                    }
                }
            )

            //STEP 3: Create updated collectibles list for the user
            const fetchUserProfileApiEndpoint = API_BASE_URL_USER_MANAGEMENT + '/' + GET_PROFILE_BY_OID_ENDPOINT
            const userData = await axios.post(fetchUserProfileApiEndpoint,
                {
                    "oid": userOid
                }
            )
            const userCollectibles = userData.data.collectibles
            const collectibleGiven =  getRandomCollectible() //The collectible to give
            const newUserCollectibles = addStringToListIfAbsent(userCollectibles, collectibleGiven)

            //STEP 4: Update profile
            const updateProfileApiEndpoint = API_BASE_URL_USER_MANAGEMENT + '/' + UPDATE_PROFILE_BY_OID_ENDPOINT
            await axios.post(updateProfileApiEndpoint, {
                "oid": userOid,
                "update_document": {
                    "$set": {
                        "collectibles": newUserCollectibles
                    }
                }
            })

            //STEP 5: Update component state
            setCollectible(collectibleGiven)

            //STEP 6:Create alert to inform the user
            setIsRewardPanelOpen(true)
        } catch (error) {
            console.log(error)
            toast({
                variant: "destructive",
                description: "We could not process your submission. Please try again.",
                duration: 3000,
            })
        } finally {
            setIsSubmitting(false)
        }
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
