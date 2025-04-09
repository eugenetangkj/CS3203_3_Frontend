"use client"

import { START_DATE, COLOUR_MAP } from "@/constants/Constants"
import { getCurrentDateTime } from "@/utils/HelperFunctions"
import { Skeleton } from "../../ui/skeleton"
import { PieChartLegend } from "../../charts/PieChartLegend"
import useSWR from "swr"
import { ComplaintStatisticsBucket } from "@/types/Complaint"
import { COMPLAINTS_GET_STATISTICS_GROUPED_BY_SENTIMENT_VALUE_SWR_HOOK } from "@/constants/SwrHooks"
import { complaintsGetStatisticsGroupedBySentimentValue } from "@/data-fetchers/ComplaintsFunctions"


/**
Represents the visualisation for the breakdown of complaints according to the sentiment range in which they fall in
*/

//Adapter function to convert the API object into an array of the format required for the pie chart
const convertApiDataToPieChartLegendDataPoints = (data: any) => {
    const coloursToAssign: Record<string, string> = {
        "[-1.00, -0.50)": "yap-orange-900",
        "[-0.50, 0.00)": "yap-yellow-900",
        "[0.00, 0.50)": "yap-brown-900",
        "[0.50, 1.00)": "yap-green-900",
        "[1.00, 1.50)": "yap-blue-900"
    };

    const output = data.map((item : any) => {
        //Fix to 2dp
        const label = `[${item.left_bound_inclusive.toFixed(2)}, ${item.right_bound_exclusive.toFixed(2)})`;
        const colour: string = coloursToAssign[label]
        return {
            label,
            value: item.count,
            fill: COLOUR_MAP[colour] ?? COLOUR_MAP['yap-green-900']
        };
    });

    //Special processing as requested by team
    const updatedOutput = output
        .filter((item: any) => item.label !== "[1.00, 1.50)") // Remove the unwanted range
        .map((item: any) => ({
            ...item,
            label: item.label === "[0.50, 1.00)" ? "[0.50, 1.00]" : item.label
        }));
 
    return updatedOutput
};


export function NumberOfComplaintsBySentimentVisualisation() {

    //Constants
    const bucketSize = 0.5
    const filter = {
        "_from_date": START_DATE,
        "_to_date": getCurrentDateTime(),
    }


    //SWR hooks to fetch data
    const { data: complaintStatistics, error: complaintStatisticsError, isLoading: complaintStatisticsIsLoading } = useSWR<ComplaintStatisticsBucket[]>(
        [COMPLAINTS_GET_STATISTICS_GROUPED_BY_SENTIMENT_VALUE_SWR_HOOK],
        () => complaintsGetStatisticsGroupedBySentimentValue(bucketSize, filter)
    )


    //Process data
    const sentimentsForEachCategory = complaintStatistics
                                      ? convertApiDataToPieChartLegendDataPoints(complaintStatistics)
                                      : []


    return (
        complaintStatisticsIsLoading
        ? (<Skeleton className="w-full h-[200px]" />)
        : complaintStatisticsError || complaintStatistics === undefined || complaintStatistics.length === 0
        ? <div>Something went wrong. Please try again later.</div>
        : <PieChartLegend chartData={ sentimentsForEachCategory } />
    )
}
