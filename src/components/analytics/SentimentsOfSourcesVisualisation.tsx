"use client"

import { useEffect, useState } from "react"
import { START_DATE } from "@/constants/constantValues"
import { getCurrentDateTime } from "@/utils/HelperFunctions"
import { Skeleton } from "../ui/skeleton"
import axios from "axios"
import { API_BASE_URL, GET_POSTS_GROUPED_BY_FIELD_ENDPOINT } from "@/constants/ApiRoutes"
import { ClassicTable } from "../charts/ClassicTable"
import { ClassicTableInput } from "@/types/ChartInterface"


/**
Represents the visualisation for the overall sentiment of each source shown in the analytics dashboard
*/
export function SentimentsOfSourcesVisualisation() {

    //States
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tableDataObject, setTableDataObject] = useState<ClassicTableInput>({headers:[], data:[]})
    const [isThereError, setIsThereError] = useState<boolean>(false)


    //Helper function to convert the API object into an array of the format required for the data field of the table
    const convertToArray = (original: { [key: string]: { count: number; avg_sentiment: number } }) => {
        return Object.entries(original).map(([source, { avg_sentiment }]) => ({
            source,
            sentiment: avg_sentiment
        }));
    };
    
   
    //Fetches the API to process the number of posts for each category
    const fetchSentimentsOfSources = async () => {
        setIsLoading(true)
        try {
            //Call API to fetch posts grouped according to categories
            const apiEndPoint = API_BASE_URL + '/' + GET_POSTS_GROUPED_BY_FIELD_ENDPOINT
            const apiData = await axios.post(apiEndPoint,
                {
                    "start_date": START_DATE,
                    "end_date": getCurrentDateTime(),
                    "group_by_field": "source"
                }
            )

            const tableData = convertToArray(apiData.data.result)
            const tableHeaders = ["Source", "Sentiment"]
            setTableDataObject({
                headers: tableHeaders,
                data: tableData
            })
        } catch (error) {
            setIsThereError(true)
        } finally {
            setIsLoading(false)
        }
    }

    //Call the API on component mount
    useEffect(() => {
        fetchSentimentsOfSources()
    }, [])


    return (
        isLoading
        ? (<Skeleton className="w-full h-[200px]" />)
        : isThereError
        ? <div>Something went wrong. Please try again later.</div>
        : tableDataObject['headers'].length === 0
        ? <div></div>
        : <ClassicTable headers={ tableDataObject['headers'] } data={ tableDataObject['data']} />
    )
}
