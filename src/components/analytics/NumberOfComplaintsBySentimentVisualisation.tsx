"use client"

import { useEffect, useState } from "react"
import { START_DATE } from "@/constants/constantValues"
import { getCurrentDateTime } from "@/utils/HelperFunctions"
import {  PieChartLegendPoint } from "@/types/ChartInterface"
import { Skeleton } from "../ui/skeleton"
import axios from "axios"
import { API_BASE_URL_ANALYTICS, GET_COMPLAINTS_GROUPED_BY_SENTIMENT_VALUE_ENDPOINT } from "@/constants/ApiRoutes"
import { COLOUR_MAP } from "@/constants/ColourMap"
import { PieChartLegend } from "../charts/PieChartLegend"


/**
Represents the visualisation for the breakdown of complaints according to the sentiment range in which they fall in
*/
export function NumberOfComplaintsBySentimentVisualisation() {

    //States
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [dataPoints, setDataPoints] = useState<PieChartLegendPoint[]>([])
    const [isThereError, setIsThereError] = useState<boolean>(false)


    //Helper function to convert the API object into an array of the format required for the pie chart
    const convertToArray = (data: any) => {
        const coloursToAssign: Record<string, string> = {
            "[-1.00, -0.50)": "yap-orange-900",
            "[-0.50, 0.00)": "yap-yellow-900",
            "[0.00, 0.50)": "yap-brown-900",
            "[0.50, 1.00)": "yap-green-900"
        };

        return data.map((item : any) => {
            //Fix to 2dp
            const label = `[${item.left_bound_inclusive.toFixed(2)}, ${item.right_bound_exclusive.toFixed(2)})`;
            const colour: string = coloursToAssign[label]
            return {
                label,
                value: item.count,
                fill: COLOUR_MAP[colour] ?? COLOUR_MAP['yap-green-900']
            };
        });
    };


    //Fetches the API to process the number of complaints within each sentiment range
    const fetchPostsBySentimentRange = async () => {
        setIsLoading(true)
        try {
            //Call API to fetch complaints grouped according to categories
            const apiEndPoint = API_BASE_URL_ANALYTICS + '/' + GET_COMPLAINTS_GROUPED_BY_SENTIMENT_VALUE_ENDPOINT
            const apiData = await axios.post(apiEndPoint,
                {
                    "start_date": START_DATE,
                    "end_date": getCurrentDateTime(),
                    "bucket_size": 0.5
                }
            )
            const sentimentsForEachCategory = convertToArray(apiData.data.result)
            console.log(sentimentsForEachCategory)
            setDataPoints(sentimentsForEachCategory)
        } catch (error) {
            console.log(error)
            setIsThereError(true)
        } finally {
            setIsLoading(false)
        }
    }

    //Call the API on component mount
    useEffect(() => {
        fetchPostsBySentimentRange()
    }, [])


    return (
        isLoading
        ? (<Skeleton className="w-full h-[200px]" />)
        : isThereError
        ? <div>Something went wrong. Please try again later.</div>
        : dataPoints.length === 0
        ? <div></div>
        : <PieChartLegend chartData={ dataPoints } />
    )
}
