"use client"


import { useEffect, useState } from "react"
import { categoriesOverTimeData } from "@/constants/analyticsData"
import { Skeleton } from "../ui/skeleton"
import { LineChartMultiple } from "../charts/LineChartMultiple"
import { LineChartMultiplePoint } from "@/types/ChartInterface"


/**
Represents the visualisation for number of posts by category over time visualisation used in analytics dashboard
*/
export function NumberOfPostsByCategoryOverTimeVisualisation() {

    //States
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [dataPoints, setDataPoints] = useState<LineChartMultiplePoint[]>([])
    const [isThereError, setIsThereError] = useState<boolean>(false)


    //Helper function to convert the API object into an array of the format required for the bar chart custom label
    // const convertToArray = (data: Record<string, { count: number; avg_sentiment: number }>) => {
    //     return Object.entries(data).map(([key, value]) => ({
    //       label: key,
    //       "# Complaints": value.count,
    //       fill: "#92A062", //TODO: Change later depending on category
    //     }));
    // };

    //Fetches the API to process the number of posts for each category over the past 1 year
    const fetchPostsByCategoryOverTime = async () => {
        setIsLoading(true)
        try {
            // const apiEndPoint = API_BASE_URL + '/' + GET_POSTS_GROUPED_BY_FIELD_OVER_TIME_ENDPOINT
            // const apiData = await axios.post(apiEndPoint,
            //     {
            //         "start_date": START_DATE, //TODO: Should be 1 year from now
            //         "end_date": getDateTimeOneYearAgo(),
            //         "time_bucket_regex": "%m-%Y",
            //         "group_by_field": "category"
            //     }
            // )
            //TODO:Update this
            // const postsGroupedByCategoriesOverTime = convertToArray(apiData.data.result)
            // setDataPoints(postsGroupedByCategoriesOverTime)
            setDataPoints(categoriesOverTimeData)
           
        } catch (error) {
            console.log(error)
            setIsThereError(true)
        } finally {
            setIsLoading(false)
        }
    }

    //Call the API on component mount
    useEffect(() => {
        fetchPostsByCategoryOverTime()
    }, [])


    return (
        isLoading
        ? (<Skeleton className="w-full h-[200px]" />)
        : isThereError
        ? <div>Something went wrong. Please try again later.</div>
        : dataPoints.length === 0
        ? <div></div>
        : (<LineChartMultiple chartData={ dataPoints } />)      
    )
}
