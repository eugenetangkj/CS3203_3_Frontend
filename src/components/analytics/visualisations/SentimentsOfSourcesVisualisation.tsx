"use client"

import { Skeleton } from "../../ui/skeleton"
import { ClassicTable } from "../../charts/ClassicTable"
import useSWR from "swr"
import { ComplaintStatistics } from "@/types/Complaint"
import { COMPLAINTS_GET_STATISTICS_GROUPED_SWR_HOOK } from "@/constants/SwrHooks"
import { complaintsGetStatisticsGrouped } from "@/data-fetchers/ComplaintsFunctions"
import { determineIsObjectEmpty } from "@/utils/HelperFunctions"

/**
Represents the visualisation for the overall sentiment of each source shown in the analytics dashboard
*/

//Adapter function to convert the API object into an array of the format required for the data field of the table
const convertApiDataToTableDataFormat = (original: { [key: string]: { count: number; avg_sentiment: number } }) => {
    return Object.entries(original).map(([source, { avg_sentiment }]) => ({
        source,
        sentiment: avg_sentiment
    }));
};


export function SentimentsOfSourcesVisualisation() {

    //Constants
    const filter = {}
    const groupByField = "source"



    //SWR hooks to fetch data
     const { data: sentimentsOfSources, error: sentimentsOfSourcesError, isLoading: sentimentsOfSourcesIsLoading } = useSWR<Record<string, ComplaintStatistics>>(
        [COMPLAINTS_GET_STATISTICS_GROUPED_SWR_HOOK, filter, groupByField],
        () => complaintsGetStatisticsGrouped(filter, groupByField)
    )

    //Process data
    const tableDataObject = sentimentsOfSources
                            ? {
                                headers: ["Source", "Sentiment"],
                                data: convertApiDataToTableDataFormat(sentimentsOfSources)
                            }
                            : {}
  
    return (
        sentimentsOfSourcesIsLoading
        ? (<Skeleton className="w-full h-[200px]" />)
        : sentimentsOfSourcesError || sentimentsOfSources === undefined || determineIsObjectEmpty(tableDataObject)
        ? <div>Something went wrong. Please try again later.</div>
        : <ClassicTable headers={ tableDataObject['headers'] as string[] } data={ tableDataObject['data'] as { [key: string]: string | number }[]} />
    )
}
