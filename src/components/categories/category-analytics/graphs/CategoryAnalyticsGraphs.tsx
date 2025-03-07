"use client"

import PageSubtitle from "@/components/common/text/PageSubtitle"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import PageSubsectionTitle from "@/components/common/text/PageSubsectionTitle"
import { LineChartMultiple } from "@/components/charts/LineChartMultiple"
import { LineChartMultiplePoint } from "@/types/ChartInterface"
import { API_BASE_URL_ANALYTICS, GET_COMPLAINTS_STATISTICS_OVER_TIME_ENDPOINT } from "@/constants/ApiRoutes"
import { getDateTimeOneYearAgoAndSetToStart, getDateTimeOneMonthAgoAndSetToEnd } from "@/utils/HelperFunctions"
import { COLOUR_MAP } from "@/constants/ColourMap"

import axios from "axios"

/**
This component is used to generate and visualise the graphs shown in the category analytics page.
It is found within the CategoryAnalyticsGraphsContainer component.
*/
interface CategoryAnalyticsGraphsProps {
    categoryName: string
}



export default function CategoryAnalyticsGraphs({ categoryName }: CategoryAnalyticsGraphsProps) {
    //States
    const [hasRanApi, setHasRanApi] = useState<boolean>(false)
    const [numberOfComplaintsDataPoints, setNumberOfComplaintsDataPoints] = useState<LineChartMultiplePoint[]>([])
    const [sentimentDataPoints, setSentimentDataPoints] = useState<LineChartMultiplePoint[]>([])
    const [isThereError, setIsThereError] = useState<boolean>(false)


    //Fixed colour map
    const colourMap = {[categoryName]: COLOUR_MAP['yap-green-900']}


    //Adapter function that converts the raw API data into line chart multiple data points
    const transformIntoLineChartDataPoints = (input: any[]) => {
        const countData = input.map(({ date, data }) => ({
            date,
            [categoryName]: data.count,
        }));

        const sentimentData = input.map(({ date, data }) => ({
            date,
            [categoryName]: data.avg_sentiment,
        }));
    
        return { countData, sentimentData };
    }


    //Fetch graph data
    const fetchGraphData = async () => {
        console.log(colourMap)
        try {
            //Process graph data
            const getComplaintStatisticsEndpoint = API_BASE_URL_ANALYTICS + '/' + GET_COMPLAINTS_STATISTICS_OVER_TIME_ENDPOINT
            const graphData = await axios.post(getComplaintStatisticsEndpoint,
                {
                    "start_date": getDateTimeOneYearAgoAndSetToStart(), //"01-01-2023 00:00:00"
                    "end_date":  getDateTimeOneMonthAgoAndSetToEnd(), //"31-12-2023 23:59:59"
                    "filter": {
                        "category": categoryName
                    } 
                }
            )
            const { countData, sentimentData } = transformIntoLineChartDataPoints(graphData.data.result)

            //Update states
            setNumberOfComplaintsDataPoints(countData)
            setSentimentDataPoints(sentimentData)

            console.log(countData)

        } catch (error) {
            setIsThereError(true)
        } finally {
            setHasRanApi(true)
        }
    }


    //Call the API on component mount
    useEffect(() => {
        fetchGraphData()
    }, [])


    return (
        !hasRanApi
        ? (<Skeleton className="w-full h-[200px]" />)
        : isThereError
        ? <div>Something went wrong. Please try again later.</div>
        : numberOfComplaintsDataPoints.length === 0 || sentimentDataPoints.length === 0
        ? <div></div>
        : <div className='flex flex-col space-y-8'>
            {/* Number of complaints over time for this category */}
            <div className='flex flex-col justify-start items-start space-y-4'>
                <PageSubsectionTitle subsectionTitle="Number of Complaints Over Time" />
                <LineChartMultiple chartData={ numberOfComplaintsDataPoints } colourMap={ colourMap } />     
            </div>
            
            {/* Sentiment over time for this category */}
            <div className='flex flex-col justify-start items-start space-y-4'>
                <PageSubsectionTitle subsectionTitle="Sentiment Over Time" />
                <LineChartMultiple chartData={ sentimentDataPoints } colourMap={ colourMap } />     
            </div>
          </div>

    )
}
