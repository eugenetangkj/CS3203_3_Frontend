"use client"

import { Poll } from "@/types/Poll"
import { useState, useEffect } from "react"
import { API_BASE_URL_ADMIN_MANAGEMENT, POLL_RESPONSES_GET_COUNT_ENDPOINT, POLL_RESPONSES_GET_MANY_ENDPOINT } from "@/constants/ApiRoutes"
import axios from "axios"
import { Skeleton } from "@/components/ui/skeleton"
import { PollResponse } from "@/types/Poll"
import { convertPollResponseDocumentsToObjects } from "@/utils/DatabaseHelperFunctions"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


/**
Represents the open-ended responses for the polls that the admin views for each published or closed polls.
*/
interface ViewPollAdminResponsesOpenEndedProps {
    currentPoll: Poll,
}

const NUMBER_OF_RESPONSES_PER_PAGE = 50

export function ViewPollAdminResponsesOpenEnded({ currentPoll }: ViewPollAdminResponsesOpenEndedProps) {
    //States
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [pollResponses, setPollResponses] = useState<PollResponse[]>()
    const [isThereError, setIsThereError] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalNumberOfResponses, setTotalNumberOfResponses] = useState<number>()
    const [totalNumberOfPages, setTotalNumberOfPages] = useState<number>(0)
    

    //Helper function to fetch the poll responses data
    const fetchPollResponses = async () => {
        setIsLoading(true)

        try {
            const getPollResponsesEndpoint = API_BASE_URL_ADMIN_MANAGEMENT  + POLL_RESPONSES_GET_MANY_ENDPOINT
            const apiResponse = await axios.post(getPollResponsesEndpoint,
                {
                    "filter": {
                       "poll_id": currentPoll.id
                    },
                    "page_size": NUMBER_OF_RESPONSES_PER_PAGE,
                    "page_number": currentPage,
                    "sort": {
                       "date_submitted": -1
                    }
                }
            )

            //Convert API response to poll response objects
            const pollResponses = convertPollResponseDocumentsToObjects(apiResponse.data.documents)
            setPollResponses(pollResponses)
        } catch (error) {
            setIsThereError(true)
        } finally {
            setIsLoading(false)
        }
    }


    //Helper function to fetch the total number of responses
    const fetchTotalNumberOfResponses = async () => {
        setIsLoading(true)
        try {
            const getPollResponsesCountEndpoint = API_BASE_URL_ADMIN_MANAGEMENT  + POLL_RESPONSES_GET_COUNT_ENDPOINT
            const apiResponse = await axios.post(getPollResponsesCountEndpoint,
                {
                    "filter": {
                       "poll_id": currentPoll.id
                    },
                }
            )
            setTotalNumberOfResponses(apiResponse.data.count)
            setTotalNumberOfPages(Math.ceil(apiResponse.data.count / NUMBER_OF_RESPONSES_PER_PAGE))
        } catch (error) {
            setIsThereError(true)
        } finally {
            setIsLoading(false)
        }
    }


    //Set effects
    useEffect(() => {
        fetchTotalNumberOfResponses()
    }, [])
    useEffect(() => {
        fetchPollResponses()
    }, [currentPage])


    return (
            isLoading || totalNumberOfResponses === undefined || pollResponses === undefined
            ? <Skeleton className="w-full h-[200px]" />
            : isThereError
            ? <div>Something went wrong. Please try again later.</div>
            : pollResponses.length === 0
            ? <div>There is no poll response.</div>
            : (
                <div className='flex flex-col items-start space-y-2'>
                    {/* Total number of responses */}
                    <p>Total number of responses: { totalNumberOfResponses }</p>

                    {/* Table of data */}
                    <Table>
                        <TableHeader>
                        <TableRow className='hover:bg-transparent font-bold'>
                            <TableHead className="table-header min-w-40">Response</TableHead>
                            <TableHead className="table-header min-w-40">Date Submitted</TableHead>
                        </TableRow>
                        </TableHeader>
            
                        <TableBody>
                            {pollResponses.map((pollResponse: PollResponse, index: number) => (
                                <TableRow key={pollResponse.id}>
                                    {/* Response */}
                                    <TableCell className="text-base text-yap-black-800 pl-0">
                                        <p className='line-clamp-1 sm:line-clamp-2 md:line-clamp-3 lg:line-clamp-none'>{ pollResponse.response }</p>
                                    </TableCell>
            
                                    {/* Date Submitted */}
                                    <TableCell className="text-base text-yap-black-800 pl-0">
                                        <p className='line-clamp-1'>{ pollResponse.date_submitted }</p>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>       
                    </Table>
                
                    {/* Pagination controls */}
                    <div className='flex flex-col space-y-4 w-full'>
                        {/* Previous and next buttons */}
                        <div className='flex flex-row space-x-8 self-center'>
                            <button onClick={() => setCurrentPage((prev) => prev - 1)} disabled={currentPage === 1} className='table-page-button'>
                                Previous
                            </button>
                            <button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={ currentPage >= totalNumberOfPages } className='table-page-button'>
                                Next
                            </button>
                        </div>

                            {/* Page number */}
                        <h6 className=' text-yap-brown-900 py-1'>Page { currentPage } of { totalNumberOfPages == 0 ? 1 : totalNumberOfPages  }</h6>
                    </div>  
                </div>
              )
    )
}
