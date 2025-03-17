"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Poll } from "@/types/Poll";
import { useState } from "react";
import axios from "axios";
import { CHECK_USER_AUTH_SERVER_ENDPOINT } from "@/constants/ApiRoutes";
import { CitizenRewardPanel } from "./CitizenRewardPanel";
import { getRandomCollectible } from "@/constants/Constants";
import { Textarea } from "@/components/ui/textarea";


/**
Represents the form for the citizen to submit his response to an open-ended question
*/
interface CitizenPollOpenEndedFormProps {
    currentPoll: Poll,
    isUserSignedIn: boolean,
}

const OpenEndedFormSchema = z.object({
    response: z.string()
        .trim()
        .min(1, { message: "Your response must not be empty." })
});


export function CitizenPollOpenEndedForm({ currentPoll, isUserSignedIn }: CitizenPollOpenEndedFormProps) {
    //States
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [isRewardPanelOpen, setIsRewardPanelOpen] = useState<boolean>(false)
    const [collectible, setCollectible] = useState<string>('')
    const { toast } = useToast()
    

    const form = useForm<z.infer<typeof OpenEndedFormSchema>>({
        resolver: zodResolver(OpenEndedFormSchema),
        defaultValues: {
            response: ""
        }
    })

    async function onSubmit(data: z.infer<typeof OpenEndedFormSchema>) {
        const userResponse = data.response
        setIsSubmitting(true)
        console.log(userResponse)
        try {
            //Retrieve user name
            const response = await axios.post(CHECK_USER_AUTH_SERVER_ENDPOINT);
            const userOid = response.data.userOid

            //TODO: Make API call to create a poll response


            //Give collectible to the user
            //TODO: Create the API to update the user's collectible
            const collectibleGiven =  getRandomCollectible()
            setCollectible(collectibleGiven)


            //Create alert to inform the user
            setIsRewardPanelOpen(true)
        } catch (error) {
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
                            />
                        </FormControl>
                        <FormMessage className='text-lg md:text-xl font-normal' />
                    </FormItem>
                )}
                control={form.control}
                name="response"
                />
                <Button type="submit" className='self-center rounded-full w-1/2 text-white bg-yap-orange-900 hover:bg-yap-orange-800 duration-200 text-lg sm:text-xl py-4 md:py-6 disabled:cursor-not-allowed'
                    disabled={ !isUserSignedIn || isSubmitting }>{isSubmitting ? 'Submitting...' : 'Submit'}</Button>
            </form>
            <CitizenRewardPanel isRewardPanelOpen={ isRewardPanelOpen } setIsRewardPanelOpen={ setIsRewardPanelOpen } collectiblePath={ collectible } />
        </Form>

  )
}
