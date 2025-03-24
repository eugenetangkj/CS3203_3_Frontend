"use client"

import { useEffect, useState } from "react"
import { START_DATE } from "@/constants/Constants"
import { getCurrentDateTime } from "@/utils/HelperFunctions"
import { BarChartNegativePoint } from "@/types/ChartInterface"
import { Skeleton } from "../../ui/skeleton"
import axios from "axios"
import { API_BASE_URL_ANALYTICS, COMPLAINTS_GET_STATISTICS_GROUPED_ENDPOINT } from "@/constants/ApiRoutes"
import { BarChartNegative } from "../../charts/BarChartNegative"


/**
Represents the visualisation for sentiments of each category used in analytics dashboard
*/
export function SentimentsOfCategoriesVisualisation() {

    //States
    const [hasRanApi, setHasRanApi] = useState<boolean>(false)
    const [dataPoints, setDataPoints] = useState<BarChartNegativePoint[]>([])
    const [isThereError, setIsThereError] = useState<boolean>(false)


    //Helper function to convert the API object into an array of the format required for the bar chart negative chart
    const convertToArray = (data: any) => {
        return Object.keys(data).map((category) => {
            return {
                xLabel: category,
                Sentiment: data[category].avg_sentiment,
            };
        });
    };


    //Fetches the API to process the sentiment for each category
    const fetchComplaintsByCategory = async () => {
        try {
            //Call API to fetch complaints grouped according to categories
            const apiEndPoint = API_BASE_URL_ANALYTICS + COMPLAINTS_GET_STATISTICS_GROUPED_ENDPOINT
            const apiData = await axios.post(apiEndPoint,
                {
                    "group_by_field": "category",
                    "filter": {} //Empty filter as we want all the data
                }
            )
            const sentimentsForEachCategory = convertToArray(apiData.data.statistics)
            setDataPoints(sentimentsForEachCategory)
        } catch (error) {
            setIsThereError(true)
        } finally {
            setHasRanApi(true)
        }
    }

    //Call the API on component mount
    useEffect(() => {
        fetchComplaintsByCategory()
    }, [])


    return (
        !hasRanApi
        ? (<Skeleton className="w-full h-[200px]" />)
        : isThereError
        ? <div>Something went wrong. Please try again later.</div>
        : dataPoints.length === 0
        ? <div></div>
        : <BarChartNegative chartData={ dataPoints } footerText={"* Sentiment score of 1.00 and -1.00 are the most positive and negative respectively."} />
    )
}
