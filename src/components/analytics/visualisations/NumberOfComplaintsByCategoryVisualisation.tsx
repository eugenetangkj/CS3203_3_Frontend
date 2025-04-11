"use client"

import {  BarChartMixedPoint } from "@/types/ChartInterface"
import { Skeleton } from "../../ui/skeleton"
import { BarChartMixed } from "../../charts/BarChartMixed"
import { Category } from "@/types/Category"
import { COLOUR_MAP } from "@/constants/Constants"
import useSWR from "swr"
import { ComplaintStatistics } from "@/types/Complaint"
import { COMPLAINTS_GET_STATISTICS_GROUPED_SWR_HOOK, CATEGORIES_GET_ALL_SWR_HOOK } from "@/constants/SwrHooks"
import { complaintsGetStatisticsGrouped } from "@/data-fetchers/ComplaintsFunctions"
import { categoriesGetAll } from "@/data-fetchers/CategoriesFunctions"


/**
Represents the visualisation for number of complaints by category visualisation used in analytics dashboard
*/

//Adapter function to convert the API object into an array of the format required for the bar chart custom label
const convertToBarChartCustomLabelPoints = (data: Record<string, { count: number; avg_sentiment: number }>, categories: Category[]) => {
    // Convert data to array of objects and sort by 'label' (which is the key of data)
    return Object.entries(data)
        .map(([key, value]) => {
            const matchingCategory = categories.find(category => category.name === key);
            return {
                label: key,
                "# Complaints": value.count,
                fill: matchingCategory ? matchingCategory.colour : COLOUR_MAP["yap-green-900"]
            };
        })
        .sort((a, b) => a.label.localeCompare(b.label)); //Sort by label alphabetically
};


export function NumberOfComplaintsByCategoryVisualisation() {
    const filter = {}
    const groupByField = "category"

    //SWR hooks to fetch data
    const { data: complaintStatistics, error: complaintStatisticsError, isLoading: complaintStatisticsIsLoading } = useSWR<Record<string, ComplaintStatistics>>(
        [COMPLAINTS_GET_STATISTICS_GROUPED_SWR_HOOK, filter, groupByField],
        () => complaintsGetStatisticsGrouped(filter, groupByField)
    )
    const { data: categories, error: categoriesError, isLoading: categoriesIsLoading } = useSWR<Category[]>(CATEGORIES_GET_ALL_SWR_HOOK, categoriesGetAll)


    //Process categories
    const sortedCategoryNames: string[] = categories
                                          ? categories.map(category => category.name).sort()
                                          : []


    //Process the bar chart mixed points
    const dataPoints: BarChartMixedPoint[] = complaintStatistics && categories
                                           ? convertToBarChartCustomLabelPoints(complaintStatistics, categories)
                                           : []

    return (
        complaintStatisticsIsLoading || categoriesIsLoading
        ? (<Skeleton className="w-full h-[200px]" />)
        : complaintStatisticsError || categoriesError || complaintStatistics === undefined || categories === undefined || categories.length === 0
        ? <div>Something went wrong. Please try again later.</div>
        : (<BarChartMixed chartData={ dataPoints } allPossibleLabels={ sortedCategoryNames }/>)      
    )
}
