"use client"

import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios"
import { API_BASE_URL_ANALYTICS, GET_COMPLAINTS_SORTED_BY_FIELDS_ENDPOINT as GET_COMPLAINTS_SORTED_BY_FIELDS_ENDPOINT } from "@/constants/ApiRoutes"
import { ClassicTable } from "@/components/charts/ClassicTable"
import { ClassicTableInput } from "@/types/ChartInterface"


/**
Represents the visualisation for the most negative complaints for a given category, displayed in the category analytics page
*/
interface CategoryAnalyticsMostNegativePostsVisualisationProps {
    categoryName: string
}


export function CategoryAnalyticsMostNegativePostsVisualisation({ categoryName }: CategoryAnalyticsMostNegativePostsVisualisationProps) {
    //Constant
    const numberOfComplaintsToFetch = 5

    //States
    const [hasRanApi, setHasRanApi] = useState<boolean>(false)
    const [tableDataObject, setTableDataObject] = useState<ClassicTableInput>({headers:[], data:[]})
    const [isThereError, setIsThereError] = useState<boolean>(false)


    //Helper function to convert the API object into an array of complaints that contain only the required field
    const convertToArray = (data: Array<any>) => {
        //Map into desired format
        const output = data.map(item => ({
            title: item.title,
            description: item.description,
            posted: item.date,
            category: item.category,
            source: item.source,
            sentiment: item.sentiment,
            url: item.url
        }));

        //Sort in asecending order based on sentiment value
        output.sort((a, b) => a.sentiment - b.sentiment);

        return output
    };
    
   
    //Fetches the API to obtain the top 5 most negative complaints, which are the complaints with the lowest sentiment scores
    const fetchMostNegativeComplaints = async () => {
        try {
            //Call API to fetch top 5 most negative complaints
            const apiEndPoint = API_BASE_URL_ANALYTICS + '/' + GET_COMPLAINTS_SORTED_BY_FIELDS_ENDPOINT
            const apiData = await axios.post(apiEndPoint,
                {
                    "keys": ["sentiment"],
                    "ascending_orders": [true],
                    "limit": numberOfComplaintsToFetch,
                    "filter": {
                        "category": categoryName
                    }
                }
            )
            const tableData = convertToArray(apiData.data.complaints)
            const tableHeaders = ["Title", "Description", "Posted", "Category", "Source", "Sentiment"]
            setTableDataObject({
                headers: tableHeaders,
                data: tableData
            })
        } catch (error) {
            console.log(error)
            setIsThereError(true)
        } finally {
            setHasRanApi(true)
        }
    }

    //Call the API on component mount
    useEffect(() => {
        fetchMostNegativeComplaints()
    }, [])


    return (
        !hasRanApi
        ? (<Skeleton className="w-full h-[200px]" />)
        : isThereError
        ? <div>Something went wrong. Please try again later.</div>
        : tableDataObject['headers'].length === 0
        ? <div></div>
        : <ClassicTable headers={ tableDataObject['headers'] } data={ tableDataObject['data']} />
    )
}
