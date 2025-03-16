"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Poll } from "@/types/Poll";

/**
Represents the form for the citizen to submit his response to a MCQ poll
*/
interface CitizenPollMcqFormInterface {
    currentPoll: Poll,
    isUserSignedIn: boolean,
}

const McqFormSchema = z.object({
    type: z.string().min(1, { message: "You must select at least one option." })
  });

export function CitizenPollMcqForm({ currentPoll, isUserSignedIn }: CitizenPollMcqFormInterface) {
    
    const form = useForm<z.infer<typeof McqFormSchema>>({
        resolver: zodResolver(McqFormSchema),
        defaultValues: {
            type: ""
        }
    })

  function onSubmit(data: z.infer<typeof McqFormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
            <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
                <FormItem className="space-y-8">
                <FormLabel className='text-yap-brown-900 text-2xl sm:text-3xl 2xl:text-4xl font-normal'>{ currentPoll.question }</FormLabel>
                <FormControl>
                    <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-4"
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
            <Button type="submit" className='self-center rounded-full w-1/2 text-white bg-yap-orange-900 hover:bg-yap-orange-800 duration-200 text-lg sm:text-xl py-4 md:py-6 disabled:cursor-not-allowed'
                disabled={ !isUserSignedIn }>Submit</Button>
        </form>
        </Form>
  )
}
