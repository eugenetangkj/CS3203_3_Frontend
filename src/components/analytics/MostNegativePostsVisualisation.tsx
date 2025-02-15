"use client"

import { useEffect, useState } from "react"
import { Skeleton } from "../ui/skeleton"
import axios from "axios"
import { API_BASE_URL, GET_POSTS_SORTED_BY_FIELDS } from "@/constants/ApiRoutes"
import { ClassicTable } from "../charts/ClassicTable"
import { ClassicTableInput } from "@/types/ChartInterface"


/**
Represents the visualisation for the most negative posts shown in the analytics dashboard
*/
export function MostNegativePostsVisualisation() {
    //Constant
    const numberOfPostsToFetch = 5

    //States
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tableDataObject, setTableDataObject] = useState<ClassicTableInput>({headers:[], data:[]})
    const [isThereError, setIsThereError] = useState<boolean>(false)


    //Helper function to convert the API object into an array of posts that contain only the required field
    const convertToArray = (data: Array<any>) => {
        //Map into desired format
        const output = data.map(item => ({
            title: item.title,
            description: item.description,
            posted: item.date,
            category: item.category,
            source: item.source,
            sentiment: item.sentiment,
        }));

        //Sort in asecending order based on sentiment value
        output.sort((a, b) => a.sentiment - b.sentiment);

        return output
    };
    
   
    //Fetches the API to obtain the top 5 most negative posts, which are the posts with the lowest sentiment scores
    const fetchMostNegativePosts = async () => {
        setIsLoading(true)
        try {
            //Call API to fetch top 5 most negative posts
            const apiEndPoint = API_BASE_URL + '/' + GET_POSTS_SORTED_BY_FIELDS
            const apiData = await axios.post(apiEndPoint,
                {
                    "keys": ["sentiment"],
                    "ascending_orders": [true],
                    "limit": numberOfPostsToFetch
                }
            )
            const tableData = convertToArray(apiData.data.posts)
            const tableHeaders = ["Title", "Description", "Posted", "Category", "Source", "Sentiment"]
            setTableDataObject({
                headers: tableHeaders,
                data: tableData
            })
        } catch (error) {
            console.log(error)
            setIsThereError(true)
        } finally {
            setIsLoading(false)
        }
    }

    //Call the API on component mount
    useEffect(() => {
        fetchMostNegativePosts()
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
