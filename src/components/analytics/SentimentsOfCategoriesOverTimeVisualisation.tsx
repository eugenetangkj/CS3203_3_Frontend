"use client"

import { useEffect, useState } from "react"
import { Skeleton } from "../ui/skeleton"
import { LineChartMultiple } from "../charts/LineChartMultiple"
import { LineChartMultiplePoint } from "@/types/ChartInterface"
import axios from "axios"
import { API_BASE_URL_ANALYTICS, GET_COMPLAINTS_GROUPED_BY_FIELD_OVER_TIME_ENDPOINT, API_BASE_URL_ADMIN_MANAGEMENT, CATEGORIES_GET_ALL_ENDPOINT } from "@/constants/ApiRoutes"
import { convertCategoryDocumentsToColourMap } from "@/utils/DatabaseHelperFunctions"
import { getDateTimeOneYearAgoAndSetToStart, getDateTimeOneMonthAgoAndSetToEnd } from "@/utils/HelperFunctions"

/**
Represents the visualisation for the sentiments of categorises over time, used in analytics dashboard.
*/
export function SentimentsOfCategoriesOverTimeVisualisation() {

    //States
    const [hasRanApi, setHasRanApi] = useState<boolean>(false)
    const [dataPoints, setDataPoints] = useState<LineChartMultiplePoint[]>([])
    const [colourMap, setColourMap] = useState<Record<string, string>>({})
    const [isThereError, setIsThereError] = useState<boolean>(false)


    //Helper function to convert the API object into an array of the format required for the bar chart custom label
    const convertApiDataIntoLineChartMultipleData = (monthlyData: { date: string; data: Record<string, { avg_sentiment: number }> }[]): LineChartMultiplePoint[] => {
        return monthlyData.map(({ date, data }) => ({
            date: date,
            ...Object.fromEntries(Object.entries(data).map(([category, values]) => [category, values.avg_sentiment]))
        }));
    };


    //Fetches the API to process the number of complaints for each category over the past 1 year
    const fetchPostsByCategoryOverTime = async () => {
        try {
            //Process complaints data
            const complaintsApiEndPoint = API_BASE_URL_ANALYTICS + '/' + GET_COMPLAINTS_GROUPED_BY_FIELD_OVER_TIME_ENDPOINT
            const complaintsData = await axios.post(complaintsApiEndPoint,
                {
                    "start_date": getDateTimeOneYearAgoAndSetToStart(), //"01-01-2023 00:00:00",
                    "end_date":  getDateTimeOneMonthAgoAndSetToEnd(), //"31-12-2023 23:59:59"
                    "group_by_field": "category"
                }
            )
            const processedComplaintsData = convertApiDataIntoLineChartMultipleData(complaintsData.data.result)

            //Process category colours
            const categoriesApiEndPoint = API_BASE_URL_ADMIN_MANAGEMENT + '/' + CATEGORIES_GET_ALL_ENDPOINT
            const categoriesData = await axios.post(categoriesApiEndPoint)
            const colourMapFromApi = convertCategoryDocumentsToColourMap(categoriesData.data.documents)
            
            //Update states
            setDataPoints(processedComplaintsData)
            setColourMap(colourMapFromApi)
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
