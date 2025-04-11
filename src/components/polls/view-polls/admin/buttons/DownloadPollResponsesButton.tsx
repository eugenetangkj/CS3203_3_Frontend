"use client"

import { Poll } from "@/types/Poll"
import { API_BASE_URL_ADMIN_MANAGEMENT, POLL_RESPONSES_GET_MANY_ENDPOINT } from "@/constants/ApiRoutes"
import axios from "axios"
import { PollResponse } from "@/types/Poll"
import { convertPollResponseDocumentsToObjects } from "@/utils/DatabaseHelperFunctions"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { pollResponsesGetMany } from "@/data-fetchers/PollResponsesFunctions"

/**
Represents a button that allows the admin to download all poll responses for an open-ended poll question.
*/
interface DownloadPollResponsesButtonProps {
    currentPoll: Poll,
}



export function DownloadPollResponsesButton({ currentPoll }: DownloadPollResponsesButtonProps) {
    //Constants
    const NUMBER_OF_RESPONSES_TO_FETCH_PER_CALL = 200
    const allPollResponses: PollResponse[] = []
    const [isLoading, setIsLoading] = useState<boolean>(false)


    //Toast management
    const { toast } = useToast()


    //Converts poll responses to a CSV.
    //Adapted from https://stackoverflow.com/questions/71349819/how-to-create-downloadable-csv-file-from-a-javascript-object-consisting-of-array and with help from ChatGPT
    const convertToCsv = (pollResponses: any[]) => {
        if (!pollResponses || !pollResponses.length) {
            // No items to download
            return
        }

        //Extract headers from the first item and add the headers as the first row
        const headers = Object.keys(pollResponses[0]);
        let csvContent = headers.join(',') + '\n'; // Add headers as the first row

        //Function to escape values (wrap in quotes and escape inner quotes)
        const escapeValue = (value: string) => {
            if (value && value.includes(',')) {
                // Wrap value in quotes if it contains commas
                value = `"${value.replace(/"/g, '""')}"`; // Escape double quotes by replacing with two quotes
            }
            return value;
        };

        // Add rows of values
        pollResponses.forEach((item) => {
            const row = headers.map((header) => escapeValue(item[header])).join(',');
            csvContent += row + '\n';
        });

        // Create a download link and trigger the download
        const anchorEle = document.createElement('a');
        anchorEle.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
        anchorEle.target = '_blank';
        anchorEle.download = `poll_responses_${ currentPoll.id }.csv`;
        anchorEle.click();
    };


    //Calls API to get poll responses and then convert it into a csv file
    const downloadResponses = async () => {
        setIsLoading(true)
        //Show loading toast
        toast({
            variant: "download",
            description: "Download is in progress. Please do not leave this page.",
            duration: Infinity, // Keep it open until download completes
        });

        //Process
        try {
            //STEP 1: Fetch poll responses
            let currentPage = 1
            while (true) {
                const pollResponses = await pollResponsesGetMany(
                    { "poll_id": currentPoll.id },
                    NUMBER_OF_RESPONSES_TO_FETCH_PER_CALL,
                    currentPage, //TODO: Fetch by date
                    {}
                )
                if (pollResponses.length === 0) {
                    break
                } else {
                    allPollResponses.push(...pollResponses)
                    currentPage += 1
                }
            }

            //STEP 2: Convert poll responses to CSV
            if (allPollResponses.length === 0) {
                toast({
                    variant: "destructive",
                    description: "There is no poll response.",
                    duration: 3000,
                });
                return
            }
            convertToCsv(allPollResponses)

            //STEP 3: Show success toast
            toast({
                variant: "success",
                description: "Download completed!",
                duration: 3000,
            });
        } catch (error) {
            //Show error toast
            toast({
                variant: "destructive",
                description: "Something went wrong with your download. Please try again.",
                duration: 3000,
            })
        } finally {
            //Clean up
            setIsLoading(false)
        } 
    }


    return (
        <Button className='bg-yap-green-900 hover:bg-yap-green-800 duration-200 rounded-full self-end'
            onClick={() => downloadResponses()} disabled={ isLoading }>{isLoading ? 'Downloading' : 'Download CSV'}</Button>
    )
}
