"use client"

import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios"
import { API_BASE_URL_ADMIN_MANAGEMENT, COMPLAINTS_GET_MANY_ENDPOINT } from "@/constants/ApiRoutes"
import { ClassicTable } from "@/components/charts/ClassicTable"
import { ClassicTableInput } from "@/types/ChartInterface"
import useSWR from "swr"
import { COMPLAINTS_GET_MANY_SWR_HOOK } from "@/constants/SwrHooks"
import { complaintsGetMany } from "@/controllers/ComplaintsFunctions"
import { Complaint } from "@/types/Complaint"


/**
Represents the visualisation for the most negative complaints for a given category, displayed in the category analytics page
*/
interface CategoryAnalyticsMostNegativePostsVisualisationProps {
    categoryName: string
}


export function CategoryAnalyticsMostNegativePostsVisualisation({ categoryName }: CategoryAnalyticsMostNegativePostsVisualisationProps) {
    const numberOfComplaintsToFetch = 5

    const { data: allComplaints, error: fetchAllComplaintsError, isLoading: fetchAllComplaintsIsLoading } = useSWR(
            [COMPLAINTS_GET_MANY_SWR_HOOK, categoryName],
            () => complaintsGetMany(
                {
                    "$search": '',
                    "category": categoryName
                },
                numberOfComplaintsToFetch, 1,
                { "sentiment": 1 }
            ),
    );

    //Helper function to convert the API object into an array of complaints that contain only the required field
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
    
    return (
        fetchAllComplaintsIsLoading
        ? (<Skeleton className="w-full h-[200px]" />)
        : fetchAllComplaintsError || allComplaints === undefined
        ? <div>Something went wrong. Please try again later.</div>
        : (
            (() => { 
                const tableData = convertToTableArray(allComplaints);
                const tableDataObject = {
                    headers: ["Title", "Description", "Posted", "Category", "Source", "Sentiment"],
                    data: tableData
                };
                return <ClassicTable headers={tableDataObject.headers} data={tableDataObject.data} />;
            })()
        )
    )
}
