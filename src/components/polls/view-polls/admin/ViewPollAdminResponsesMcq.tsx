"use client"

import { Poll } from "@/types/Poll"
import { BarChartLabel } from "@/components/charts/BarChartLabel"
import { useState, useEffect } from "react"
import { BarChartLabelPoint } from "@/types/ChartInterface"
import { API_BASE_URL_ADMIN_MANAGEMENT, POLL_RESPONSES_GET_STATISTICS_ENDPOINT } from "@/constants/ApiRoutes"
import axios from "axios"
import { Skeleton } from "@/components/ui/skeleton"


/**
Represents the MCQ responses for the polls that the admin views for each published or closed polls.
*/
interface ViewPollAdminResponsesMcqProps {
    currentPoll: Poll,
}

export function ViewPollAdminResponsesMcq({ currentPoll }: ViewPollAdminResponsesMcqProps) {
    //States
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [dataPoints, setDataPoints] = useState<BarChartLabelPoint[]>([])
    const [totalNumberOfResponses, setTotalNumberOfResponses] = useState<number>()
    const [isThereError, setIsThereError] = useState<boolean>(false)


    //Helper function to generate the datapoints in the format required by the visualisation
    const generateDataPoints = (dataFromApi: Record<string, number>) => {
        const dataPoints = currentPoll.options.map(option => ({
            "Option": option,
            "# Responses": dataFromApi[option] ?? 0 //Use count if it exists, else set to 0
        }));

        //Return output
        return dataPoints
    }


    //Helper function to fetch the data
    const fetchData = async () => {
        setIsLoading(true)

        try {
            //Process complaints data
            const getPollResponsesStatisticsEndpoint = API_BASE_URL_ADMIN_MANAGEMENT + '/' + POLL_RESPONSES_GET_STATISTICS_ENDPOINT
            const getPollResponsesStatisticsResponse = await axios.post(getPollResponsesStatisticsEndpoint,
                {
                    "filter": {
                        "poll_id": currentPoll.id
                    }
                }
            )
            let processedPollStatistics = []
            let totalNumberOfResponses = 0
            if (getPollResponsesStatisticsResponse.data.statistics) {
                const statistics = getPollResponsesStatisticsResponse.data.statistics as Record<string, number>;
                processedPollStatistics = generateDataPoints(statistics)
                totalNumberOfResponses = Object.values(statistics).reduce((sum, count) => sum + count, 0);
            } else {
                processedPollStatistics = generateDataPoints({})
            }
            setDataPoints(processedPollStatistics)
            setTotalNumberOfResponses(totalNumberOfResponses)
        } catch (error) {
            setIsThereError(true)
            setTotalNumberOfResponses(0)
        } finally {
            setIsLoading(false)
        }
    }


    //Call the API on component mount
    useEffect(() => {
        fetchData()
    }, [])

    return (
            isLoading || totalNumberOfResponses === undefined
            ? <Skeleton className="w-full h-[200px]" />
            : isThereError
            ? <div>Something went wrong. Please try again later.</div>
            : totalNumberOfResponses === 0
            ? <div>There is no response.</div>
            : <div className='flex flex-col items-start space-y-8'>
                <p>Total number of responses: { totalNumberOfResponses } </p>
                <BarChartLabel chartData={ dataPoints } />
            </div>  
    )
}
