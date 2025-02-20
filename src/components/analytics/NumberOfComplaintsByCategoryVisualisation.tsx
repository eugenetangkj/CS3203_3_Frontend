"use client"

import { useEffect, useState } from "react"
import { START_DATE } from "@/constants/constantValues"
import { getCurrentDateTime } from "@/utils/HelperFunctions"
import {  BarChartMixedPoint } from "@/types/ChartInterface"
import { Skeleton } from "../ui/skeleton"
import axios from "axios"
import { API_BASE_URL, GET_COMPLAINTS_GROUPED_BY_FIELD_ENDPOINT } from "@/constants/ApiRoutes"
import { BarChartMixed } from "../charts/BarChartMixed"


/**
Represents the visualisation for number of complaints by category visualisation used in analytics dashboard
*/
export function NumberOfComplaintsByCategoryVisualisation() {

    //States
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [dataPoints, setDataPoints] = useState<BarChartMixedPoint[]>([])
    const [isThereError, setIsThereError] = useState<boolean>(false)


    //Helper function to convert the API object into an array of the format required for the bar chart custom label
    const convertToArray = (data: Record<string, { count: number; avg_sentiment: number }>) => {
        return Object.entries(data).map(([key, value]) => ({
          label: key,
          "# Complaints": value.count,
          fill: "#92A062", //TODO: Change later depending on category
        }));
    };

    //Fetches the API to process the number of complaints for each category
    const fetchPostsByCategory = async () => {
        setIsLoading(true)
        try {
            //Call API to fetch complaints grouped according to categories
            const apiEndPoint = API_BASE_URL + '/' + GET_COMPLAINTS_GROUPED_BY_FIELD_ENDPOINT
            const apiData = await axios.post(apiEndPoint,
                {
                    "start_date": START_DATE,
                    "end_date": getCurrentDateTime(),
                    "group_by_field": "category"
                }
            )
            const complaintsGroupedByCategories = convertToArray(apiData.data.result)
            setDataPoints(complaintsGroupedByCategories)
        } catch (error) {
            console.log(error)
            setIsThereError(true)
            // setDataPoints(barChartCustomLabelData)
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
        : (<BarChartMixed chartData={ dataPoints } />)      
    )
}
