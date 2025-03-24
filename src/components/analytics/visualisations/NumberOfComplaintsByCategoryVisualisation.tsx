"use client"

import { useEffect, useState } from "react"
import { START_DATE } from "@/constants/Constants"
import { getCurrentDateTime } from "@/utils/HelperFunctions"
import {  BarChartMixedPoint } from "@/types/ChartInterface"
import { Skeleton } from "../../ui/skeleton"
import axios from "axios"
import { API_BASE_URL_ADMIN_MANAGEMENT, API_BASE_URL_ANALYTICS, CATEGORIES_GET_ALL_ENDPOINT, COMPLAINTS_GET_STATISTICS_GROUPED_ENDPOINT } from "@/constants/ApiRoutes"
import { BarChartMixed } from "../../charts/BarChartMixed"
import { convertCategoryDocumentsToObjects } from "@/utils/DatabaseHelperFunctions"
import { Category } from "@/types/Category"
import { COLOUR_MAP } from "@/constants/Constants"


/**
Represents the visualisation for number of complaints by category visualisation used in analytics dashboard
*/
export function NumberOfComplaintsByCategoryVisualisation() {

    //States
    const [hasRanApi, setHasRanApi] = useState<boolean>(false)
    const [dataPoints, setDataPoints] = useState<BarChartMixedPoint[]>([])
    const [isThereError, setIsThereError] = useState<boolean>(false)


    //Adapter function to convert the API object into an array of the format required for the bar chart custom label
    const convertToArray = (data: Record<string, { count: number; avg_sentiment: number }>, categories: Category[]) => {
        return Object.entries(data).map(([key, value]) => {
            const matchingCategory = categories.find(category => category.name === key);
            return {
                label: key,
                "# Complaints": value.count,
                fill: matchingCategory ? matchingCategory.colour : COLOUR_MAP["yap-green-900"]
            };
        });
    };


    //Fetches the API to process the number of complaints for each category
    const fetchPostsByCategory = async () => {
        try {
            //Call API
            const complaintsApiEndPoint = API_BASE_URL_ANALYTICS + COMPLAINTS_GET_STATISTICS_GROUPED_ENDPOINT
            const complaintsData = await axios.post(complaintsApiEndPoint,
                {
                    "group_by_field": "category",
                    "filter": {
                        "_from_date": START_DATE,
                        "_to_date": getCurrentDateTime()
                    }
                }
            )
            const categoriesApiEndPoint = API_BASE_URL_ADMIN_MANAGEMENT + CATEGORIES_GET_ALL_ENDPOINT
            const categoriesData = await axios.post(categoriesApiEndPoint)
            const categories = convertCategoryDocumentsToObjects(categoriesData.data.documents)

            //Process data
            const complaintsGroupedByCategories = convertToArray(complaintsData.data.statistics, categories)
            setDataPoints(complaintsGroupedByCategories)
        } catch (error) {
            setIsThereError(true)
        } finally {
            setHasRanApi(true)
        }
    }


    //Call the API on component mount
    useEffect(() => {
        fetchPostsByCategory()
    }, [])


    return (
        !hasRanApi
        ? (<Skeleton className="w-full h-[200px]" />)
        : isThereError
        ? <div>Something went wrong. Please try again later.</div>
        : dataPoints.length === 0
        ? <p className='text-base text-yap-black-800'>There is no category to be displayed.</p>
        : (<BarChartMixed chartData={ dataPoints } />)      
    )
}
