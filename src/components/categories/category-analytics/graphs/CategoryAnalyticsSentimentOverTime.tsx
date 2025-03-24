"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { LineChartMultiple } from "@/components/charts/LineChartMultiple"
import { LineChartMultiplePoint } from "@/types/ChartInterface"
import { API_BASE_URL_ANALYTICS, COMPLAINTS_GET_STATISTICS_OVER_TIME_ENDPOINT } from "@/constants/ApiRoutes"
import { getDateTimeOneYearAgoAndSetToStart, getDateTimeOneMonthAgoAndSetToEnd } from "@/utils/HelperFunctions"
import { COLOUR_MAP } from "@/constants/Constants"
import axios from "axios"
import { GraphDateRangePicker } from "@/components/common/others/GraphDateRangePicker"
import { DateRange } from "react-day-picker"
import { format, addMonths } from "date-fns"

/**
This component is used to generate and visualise the sentiment over time graph shown in the category analytics page.
It is for per category.
*/
interface CategoryAnalyticsGraphsProps {
    categoryName: string
}


export default function CategoryAnalyticsSentimentOverTime({ categoryName }: CategoryAnalyticsGraphsProps) {
    //States
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [sentimentDataPoints, setSentimentDataPoints] = useState<LineChartMultiplePoint[]>([])
    const [isThereError, setIsThereError] = useState<boolean>(false)
    const [date, setDate] = useState<DateRange | undefined>({
        from: addMonths(new Date(), -12), //12 months from today's date
        to: new Date(), //Default is today's date
    })
    const [isDatePopoverOpen, setIsDatePopoverOpen] = useState<boolean>(false)


    //Fixed colour map
    const colourMap = {[categoryName]: COLOUR_MAP['yap-green-900']}


    //Adapter function that converts the raw API data into line chart multiple data points
    const transformIntoLineChartDataPoints = (input: any[]) => {
        const sentimentData = input.map(({ date, data }) => ({
            date,
            [categoryName]: data.avg_sentiment,
        }))
    
        return sentimentData
    }


    //Fetch graph data
    const fetchGraphData = async () => {
        setIsLoading(true)
        try {
            //Process graph data
            const getComplaintStatisticsEndpoint = API_BASE_URL_ANALYTICS  + COMPLAINTS_GET_STATISTICS_OVER_TIME_ENDPOINT
            const graphData = await axios.post(getComplaintStatisticsEndpoint,
                {
                    "filter": {
                        "category": categoryName,
                        "_from_date": date?.from ? format(date.from, 'dd-MM-yyyy HH:mm:ss') : getDateTimeOneYearAgoAndSetToStart(),
                        "_to_date": date?.to ? format(date.to, 'dd-MM-yyyy HH:mm:ss') : getDateTimeOneMonthAgoAndSetToEnd(),
                    } 
                }
            )
            const sentimentData = transformIntoLineChartDataPoints(graphData.data.statistics)

            //Update states
            setSentimentDataPoints(sentimentData)
        } catch (error) {
            setIsThereError(true)
        } finally {
            setIsLoading(false)
        }
    }


    //Call the API on component mount
    useEffect(() => {
        fetchGraphData()
    }, [])


    return (
        isLoading
        ? (<Skeleton className="w-full h-[200px]" />)
        : isThereError
        ? <div>Something went wrong. Please try again later.</div>
        : (
            <div className='flex flex-col space-y-8 w-full'>
                <GraphDateRangePicker date={ date } setDate={ setDate } isPopoverOpen={ isDatePopoverOpen } setIsPopoverOpen={ setIsDatePopoverOpen } fetchData={ fetchGraphData} />
                <LineChartMultiple chartData={ sentimentDataPoints } colourMap={ colourMap } />  
            </div>
          )
    )
}
