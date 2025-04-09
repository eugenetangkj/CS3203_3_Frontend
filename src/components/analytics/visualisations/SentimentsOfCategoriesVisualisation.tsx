"use client"

import { BarChartNegativePoint } from "@/types/ChartInterface"
import { Skeleton } from "../../ui/skeleton"
import { BarChartNegative } from "../../charts/BarChartNegative"
import useSWR from "swr"
import { ComplaintStatistics } from "@/types/Complaint"
import { complaintsGetStatisticsGrouped } from "@/data-fetchers/ComplaintsFunctions"
import { COMPLAINTS_GET_STATISTICS_GROUPED_SWR_HOOK } from "@/constants/SwrHooks"


/**
Represents the visualisation for sentiments of each category used in analytics dashboard
*/

//Adapter function to convert the API object into an array of the format required for the bar chart negative chart
const convertApiDataToBarChartNegativeDatapointArray = (data: any) => {
    return Object.keys(data).map((category) => {
        return {
            xLabel: category,
            Sentiment: data[category].avg_sentiment,
        }
    }).sort((a, b) => a.xLabel.localeCompare(b.xLabel)); //Sort by label alphabetically
};


export function SentimentsOfCategoriesVisualisation() {

    //Constants
    const filter = {}
    const groupByField = "category"



    //SWR hooks to fetch data
    const { data: complaintStatistics, error: complaintStatisticsError, isLoading: complaintStatisticsIsLoading } = useSWR<Record<string, ComplaintStatistics>>(
        [COMPLAINTS_GET_STATISTICS_GROUPED_SWR_HOOK, filter, groupByField],
        () => complaintsGetStatisticsGrouped(filter, groupByField)
    )


    //Process the API data
    const sentimentsForEachCategory: BarChartNegativePoint[] = complaintStatistics
                                                               ? convertApiDataToBarChartNegativeDatapointArray(complaintStatistics)
                                                               : []
    const sortedCategoryNames = (sentimentsForEachCategory.length !== 0)
                                ? sentimentsForEachCategory.map(item => item.xLabel)
                                : []


    return (
        complaintStatisticsIsLoading
        ? (<Skeleton className="w-full h-[200px]" />)
        : complaintStatisticsError || complaintStatistics === undefined || sentimentsForEachCategory.length === 0
        ? <div>Something went wrong. Please try again later.</div>
        : <BarChartNegative chartData={ sentimentsForEachCategory } allLabels={ sortedCategoryNames } footerText={"* Sentiment score of 1.00 and -1.00 are the most positive and negative respectively."} />
    )
}
