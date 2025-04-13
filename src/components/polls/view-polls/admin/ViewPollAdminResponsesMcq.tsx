"use client"

import { Poll } from "@/types/Poll"
import { BarChartLabel } from "@/components/charts/BarChartLabel"
import { useState, useEffect } from "react"
import { BarChartLabelPoint } from "@/types/ChartInterface"
import { Skeleton } from "@/components/ui/skeleton"
import { pollResponsesGetStatistics } from "@/data-fetchers/PollResponsesFunctions"


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
            const statistics = await pollResponsesGetStatistics({ "poll_id": currentPoll.id })
            const processedPollStatistics = generateDataPoints(statistics)
            const totalNumberOfResponses = Object.values(statistics).reduce((sum, count) => sum + count, 0);
            setDataPoints(processedPollStatistics)
            setTotalNumberOfResponses(totalNumberOfResponses)
        } catch (error) {
            setIsThereError(true)
            setTotalNumberOfResponses(0)
        }

        setIsLoading(false)
    }


    //Call the API on component mount
    useEffect(() => {
        fetchData()
    }, [])

    return (
            isLoading || totalNumberOfResponses === undefined
            ? <Skeleton className="w-full h-[200px]" />
            : isThereError
            ? <div className='text-yap-black-800'>Something went wrong. Please try again later.</div>
            : totalNumberOfResponses === 0
            ? <div className='text-yap-black-800'>There is no response.</div>
            : <div className='flex flex-col items-start space-y-8'>
                <p>Total number of responses: { totalNumberOfResponses } </p>
                <BarChartLabel chartData={ dataPoints } />
            </div>  
    )
}
