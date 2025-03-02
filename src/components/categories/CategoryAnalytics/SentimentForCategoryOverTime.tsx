"use client"

import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { LineChartMultiple } from "@/components/charts/LineChartMultiple"
import { LineChartMultiplePoint } from "@/types/ChartInterface"
import axios from "axios"
import { API_BASE_URL_ANALYTICS, GET_COMPLAINTS_GROUPED_BY_FIELD_OVER_TIME_ENDPOINT, API_BASE_URL_ADMIN_MANAGEMENT, CATEGORIES_GET_ALL_ENDPOINT } from "@/constants/ApiRoutes"
import { convertCategoryDocumentsToColourMap } from "@/utils/DatabaseHelperFunctions"


/**
Represents the visualisation for the sentiments of a given category over time, used in the category analytics page.
*/
export function SentimentForCategoryOverTime() {

    //States
    const [hasRanApi, setHasRanApi] = useState<boolean>(false)
    const [dataPoints, setDataPoints] = useState<LineChartMultiplePoint[]>([])
    const [colourMap, setColourMap] = useState<Record<string, string>>({})
    const [isThereError, setIsThereError] = useState<boolean>(false)


    //Helper function to convert the API object into an array of the format required for the bar chart custom label
    // const convertApiDataIntoLineChartMultipleData = (monthlyData: { date: string; data: Record<string, { avg_sentiment: number }> }[]): LineChartMultiplePoint[] => {
    //     return monthlyData.map(({ date, data }) => ({
    //         date: date,
    //         ...Object.fromEntries(Object.entries(data).map(([category, values]) => [category, values.avg_sentiment]))
    //     }));
    // };


    //Fetches the API to process the number of complaints for each category over the past 1 year
    const fetchPostsByCategoryOverTime = async () => {
        try {
            //Process complaints data
            // const complaintsApiEndPoint = API_BASE_URL_ANALYTICS + '/' + GET_COMPLAINTS_GROUPED_BY_FIELD_OVER_TIME_ENDPOINT
            // const complaintsData = await axios.post(complaintsApiEndPoint,
            //     {
            //         "start_date": "01-01-2023 00:00:00", //getDateTimeOneYearAgoAndSetToStart(),
            //         "end_date":  "31-12-2023 23:59:59", //getDateTimeOneMonthAgoAndSetToEnd()
            //         "group_by_field": "category"
            //     }
            // )
            // const processedComplaintsData = convertApiDataIntoLineChartMultipleData(complaintsData.data.result)

            // //Process category colours
            // const categoriesApiEndPoint = API_BASE_URL_ADMIN_MANAGEMENT + '/' + CATEGORIES_GET_ALL_ENDPOINT
            // const categoriesData = await axios.post(categoriesApiEndPoint)
            // const colourMapFromApi = convertCategoryDocumentsToColourMap(categoriesData.data.documents)
            
            //Update states
            // setDataPoints(processedComplaintsData)
            // setColourMap(colourMapFromApi)

            setDataPoints([
                { date: "Jan 24", Financial: 100 },
                { date: "Feb 24", Financial: 200 },
                { date: "Mar 24", Financial: 180 },
                { date: "Apr 24", Financial: 120 },
                { date: "May 24", Financial: 220 },
                { date: "Jun 24", Financial: 210 },
                { date: "Jul 24", Financial: 250 },
                { date: "Aug 24", Financial: 270 },
                { date: "Sep 24", Financial: 300 },
                { date: "Oct 24", Financial: 310 },
                { date: "Nov 24", Financial: 330 },
                { date: "Dec 24", Financial: 350 },
              ])
            setColourMap({ "Financial": "#92A062" })
        } catch (error) {
            setIsThereError(true)
        } finally {
            setHasRanApi(true)
        }
    }

    //Call the API on component mount
    useEffect(() => {
        fetchPostsByCategoryOverTime()
    }, [])


    return (
        !hasRanApi
        ? (<Skeleton className="w-full h-[200px]" />)
        : isThereError
        ? <div>Something went wrong. Please try again later.</div>
        : dataPoints.length === 0 || Object.keys(colourMap).length === 0
        ? <div></div>
        : (<LineChartMultiple chartData={ dataPoints } colourMap={ colourMap } />)      
    )
}
