"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { ClassicTable } from "@/components/charts/ClassicTable"
import useSWR from "swr"
import { COMPLAINTS_GET_MANY_SWR_HOOK } from "@/constants/SwrHooks"
import { complaintsGetMany } from "@/data-fetchers/ComplaintsFunctions"
import { Complaint } from "@/types/Complaint"
import { CategoryAnalytics } from "@/types/CategoryAnalytics"
import { getDateRangeForCategoryAnalytics } from "@/utils/HelperFunctions"
import { getComplaintsWithinRange } from "@/utils/HelperFunctions"
import { VERY_LARGE_NUMBER } from "@/constants/Constants"


/**
Represents the visualisation for the most complaints found within the given duration of the category analytics that
matches the current category
*/

//Adapter function to convert the API object into an array of complaints that contain only the required field
const convertToTableArray = (data: Complaint[]) => {
    const output = data.map(complaint => ({
        title: complaint.title,
        description: complaint.description,
        posted: complaint.date,
        category: complaint.category,
        source: complaint.source,
        sentiment: complaint.sentiment,
        url: complaint.url
    }));
    return output
};


interface CategoryAnalyticsComplaintsVisualisationProps {
    currentCategoryAnalytics: CategoryAnalytics
}


export function CategoryAnalyticsComplaintsVisualisation({ currentCategoryAnalytics }: CategoryAnalyticsComplaintsVisualisationProps) {
    //Constants
    const numberOfComplaintsToFetch = VERY_LARGE_NUMBER
    const datesForCategoryAnalytics = getDateRangeForCategoryAnalytics(currentCategoryAnalytics.date_created)



    const { data: allComplaints, error: fetchAllComplaintsError, isLoading: fetchAllComplaintsIsLoading } = useSWR(
            [COMPLAINTS_GET_MANY_SWR_HOOK, currentCategoryAnalytics.name],
            () => complaintsGetMany(
                {
                    "$search": '',
                    "category": currentCategoryAnalytics.name
                },
                numberOfComplaintsToFetch, 1,
                {
                    "date": -1,
                    "sentiment": 1
                }
            ),
    );


    const complaintsWithinRange = (allComplaints)
                                ? getComplaintsWithinRange(datesForCategoryAnalytics[0], datesForCategoryAnalytics[1], allComplaints)
                                : []

    
    
    return (
        fetchAllComplaintsIsLoading
        ? (<Skeleton className="w-full h-[200px]" />)
        : fetchAllComplaintsError || allComplaints === undefined
        ? <div>Something went wrong. Please try again later.</div>
        : (
            (() => { 
                console.log(complaintsWithinRange)
                const tableData = convertToTableArray(complaintsWithinRange)
                const tableDataObject = {
                    headers: ["Title", "Description", "Posted", "Category", "Source", "Sentiment"],
                    data: tableData
                };
                return <ClassicTable headers={tableDataObject.headers} data={tableDataObject.data} />;
            })()
        )
    )
}
