"use client"

import { BarChartCustomLabel } from "../charts/BarChartCustomLabel"
import { useEffect, useState } from "react"
import { makePostRequest, GET_POSTS_GROUPED_BY_FIELD_ENDPOINT} from "@/services/ApiHandler"
import { START_DATE } from "@/constants/constantValues"
import { getCurrentDateTime } from "@/utils/HelperFunctions"
import { BarChartCustomLabelPoint } from "@/types/ChartInterface"
import { barChartCustomLabelData } from "@/constants/analyticsData"
import { Skeleton } from "../ui/skeleton"



export function NumberOfPostsByCategoryVisualisation() {

    //States
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [dataPoints, setDataPoints] = useState<BarChartCustomLabelPoint[]>([])
    const [isThereError, setIsThereError] = useState<boolean>(false)


    //Helper function to convert the API object into an array of the format required for the bar chart custom label
    const convertToArray = (data: Record<string, { count: number; avg_sentiment: number }>) => {
        return Object.entries(data).map(([key, value]) => ({
          label: key,
          "No. of Posts": value.count,
          fill: "#92A062", //TODO: Change later depending on category
        }));
    };

    //Fetches the API to process the number of posts for each category
    const fetchPostsByCategory = async () => {
        setIsLoading(true)
        try {
            //TODO: Delete logic API here
            // const apiData = await makePostRequest(GET_POSTS_GROUPED_BY_FIELD_ENDPOINT,
            //     {
            //         start_date: START_DATE,
            //         end_date: getCurrentDateTime(),
            //         group_by_field: "category"
            //     }
            // )
            // const postsGroupedByCategories = convertToArray(apiData.result)
            // setDataPoints(postsGroupedByCategories)

            setDataPoints(barChartCustomLabelData)
        } catch (error) {
            setIsThereError(true)
        } finally {
            setIsLoading(false)
        }
    }

    //Call the API on component mount
    useEffect(() => {
        fetchPostsByCategory()
    }, [])


    return (
        isLoading
        ? (<Skeleton className="w-full h-[200px]" />)
        : isThereError
        ? <div>Something went wrong. Please try again later.</div>
        : dataPoints.length === 0
        ? <div></div>
        : (<BarChartCustomLabel chartData={ dataPoints } />)      
    )
}
