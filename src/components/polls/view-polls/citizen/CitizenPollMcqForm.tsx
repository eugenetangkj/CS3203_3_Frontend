"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Poll, PollStatusEnum } from "@/types/Poll";
import { useState } from "react";
import { CitizenRewardPanel } from "./CitizenRewardPanel";
import { getRandomCollectible } from "@/utils/HelperFunctions";
import { getCurrentDateTime } from "@/utils/HelperFunctions";
import { pollResponsesInsertOne } from "@/data-fetchers/PollResponsesFunctions";
import { ApiResponseStatus } from "@/types/ApiResponse";
import { useUserProfile } from "@/hooks/use-user-profile";
import { userUpdateProfileByOid } from "@/data-fetchers/UsersFunctions";
import { mutate } from "swr";
import { POLLS_GET_BY_OID_SWR_HOOK, POLL_RESPONSES_GET_ONE_SWR_HOOK } from "@/constants/SwrHooks";


/**
Represents the form for the citizen to submit his response to a MCQ poll
*/
interface CitizenPollMcqFormProps {
    currentPoll: Poll,
    shouldDisable: boolean,
    userResponse: string,
}

const McqFormSchema = z.object({
    response: z.string().min(1, { message: "You must select at least one option." })
  });

export function CitizenPollMcqForm({ currentPoll, shouldDisable, userResponse }: CitizenPollMcqFormProps) {
    //States
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [isRewardPanelOpen, setIsRewardPanelOpen] = useState<boolean>(false)
    const [collectible, setCollectible] = useState<string>('')
    const { toast } = useToast()
    const { data: userProfile, error: useUserProfileError, isLoading: useUserProfileIsLoading  } = useUserProfile(); 



    const form = useForm<z.infer<typeof McqFormSchema>>({
        resolver: zodResolver(McqFormSchema),
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

    async function onSubmit(data: z.infer<typeof McqFormSchema>) {
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
        const newUserCollectibles = userCollectibles.includes(collectibleGiven)
                                    ? userCollectibles
                                    : [...userCollectibles, collectibleGiven];

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
                <FormField
                control={form.control}
                name="response"
                render={({ field }) => (
                    <FormItem className="space-y-8">
                    <FormLabel className='text-yap-brown-900 text-2xl sm:text-3xl 2xl:text-4xl font-normal'>{ currentPoll.question }</FormLabel>
                    <FormControl>
                        <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-4"
                        disabled={ shouldDisable || isSubmitting || currentPoll.status == PollStatusEnum.Closed }
                        >
                            {
                                currentPoll.options.map((option) => (
                                    <FormItem className="flex flex-row items-center space-x-2 space-y-0" key={ option }>
                                        <FormControl>
                                            <RadioGroupItem value={ option } />
                                        </FormControl>
                                        <FormLabel className="font-normal text-lg md:text-xl text-yap-black-800 break-all">
                                        { option }
                                        </FormLabel>
                                    </FormItem>
                                ))
                            }
                        </RadioGroup>
                    </FormControl>
                    <FormMessage className='text-lg md:text-xl font-normal' />
                    </FormItem>
                )}
                />
                <Button type="submit" className='self-center rounded-full w-1/2 text-white bg-yap-orange-900 hover:bg-yap-orange-800 duration-200 text-lg py-4 md:py-6 disabled:cursor-not-allowed'
                    disabled={ shouldDisable || isSubmitting || currentPoll.status == PollStatusEnum.Closed}>{isSubmitting ? 'Submitting...' : 'Submit'}</Button>
            </form>
            <CitizenRewardPanel isRewardPanelOpen={ isRewardPanelOpen } setIsRewardPanelOpen={ setIsRewardPanelOpen } collectiblePath={ collectible } />
        </Form>

  )
}
