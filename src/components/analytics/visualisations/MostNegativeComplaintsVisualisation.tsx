"use client"

import { Skeleton } from "../../ui/skeleton"
import { ClassicTable } from "../../charts/ClassicTable"
import useSWR from "swr"
import { COMPLAINTS_GET_MANY_SWR_HOOK } from "@/constants/SwrHooks"
import { complaintsGetMany } from "@/data-fetchers/ComplaintsFunctions"
import { Complaint } from "@/types/Complaint"
import { determineIsObjectEmpty } from "@/utils/HelperFunctions"


/**
Represents the visualisation for the most negative complaints shown in the analytics dashboard
*/


//Adapter function to convert the API object into an array of complaints that contain only the required field
const convertApiDataToTableFields = (data: Array<any>) => {
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


export function MostNegativePostsVisualisation() {
    //Constants
    const numberOfComplaintsToFetch = 10
    const sentimentOrder = 1


    //SWR hooks to fetch data
    const { data: complaints, error: complaintsError, isLoading: complaintsIsLoading } = useSWR<Complaint[]>(
        [COMPLAINTS_GET_MANY_SWR_HOOK, sentimentOrder],
        () => complaintsGetMany({}, numberOfComplaintsToFetch, 1, { "sentiment": sentimentOrder, "date": -1})
    )

    //Process data
    const tableData = (complaints && complaints.length > 0)
                      ? {
                        headers: ["Title", "Description", "Posted", "Category", "Source", "Sentiment"],
                        data: convertApiDataToTableFields(complaints)
                      }
                      : {}

    return (
        complaintsIsLoading
        ? (<Skeleton className="w-full h-[200px]" />)
        :  complaintsError || determineIsObjectEmpty(tableData)
        ? <div>Something went wrong. Please try again later.</div>
        : <ClassicTable headers={ tableData['headers'] as string[] } data={ tableData['data'] as { [key: string]: string | number }[]} />
    )
}
