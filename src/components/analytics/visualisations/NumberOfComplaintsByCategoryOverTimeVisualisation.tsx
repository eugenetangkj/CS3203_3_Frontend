"use client"

import { useState } from "react"
import { Skeleton } from "../../ui/skeleton"
import { LineChartMultiplePoint } from "@/types/ChartInterface"
import { convertCategoryObjectsToColourMap } from "@/utils/DatabaseHelperFunctions"
import { getDateTimeOneYearAgoAndSetToStart, getDateTimeOneMonthAgoAndSetToEnd, determineIsObjectEmpty } from "@/utils/HelperFunctions"
import { GraphDateRangePicker } from "../../common/others/GraphDateRangePicker"
import { DateRange } from "react-day-picker"
import { format, addMonths } from "date-fns"
import { COLOUR_MAP } from "@/constants/Constants"
import { LineChartMultipleWithCategoryFilter } from "@/components/charts/LineChartMultipleWithCategoryFilter"
import useSWR from "swr"
import { Category } from "@/types/Category"
import { CATEGORIES_GET_ALL_SWR_HOOK, COMPLAINTS_GET_STATISTICS_GROUPED_OVER_TIME_SWR_HOOK } from "@/constants/SwrHooks"
import { categoriesGetAll } from "@/data-fetchers/CategoriesFunctions"
import { ComplaintStatisticsByDate } from "@/types/Complaint"
import { complaintsGetStatisticsGroupedOverTime } from "@/data-fetchers/ComplaintsFunctions"

/**
Represents the visualisation for number of complaints by category over time visualisation used in analytics dashboard
*/

//Adapter function to convert the API object into an array of the format required for the bar chart custom label
const convertApiDataIntoLineChartMultipleData = (
    apiData: { date: string; data: Record<string, { count: number; avg_sentiment: number }> }[]
    ): LineChartMultiplePoint[] => {
        return apiData.map(({ date, data }) => {
        // Sort the categories (keys) alphabetically
        const sortedCategories = Object.keys(data).sort();

        // Map the sorted categories to their count values
        const sortedData = Object.fromEntries(
            sortedCategories.map((category) => [category, data[category].count])
        );
    
        return {
            date,
            ...sortedData
        };
        });
};


export function NumberOfComplaintsByCategoryOverTimeVisualisation() {

    //States and constants
    const [date, setDate] = useState<DateRange | undefined>({
        from: addMonths(new Date(), -12), //12 months from today's date
        to: new Date(), //Default is today's date
    })
    const [isDatePopoverOpen, setIsDatePopoverOpen] = useState<boolean>(false)
    const groupByField = "category"


    //SWR hooks to fetch data
    const { data: complaintStatistics, error: complaintStatisticsError, isLoading: complaintStatisticsIsLoading } = useSWR<ComplaintStatisticsByDate[]>(
        [COMPLAINTS_GET_STATISTICS_GROUPED_OVER_TIME_SWR_HOOK, date, groupByField],
        () => {
            return complaintsGetStatisticsGroupedOverTime({
                "_from_date": date?.from ? format(date.from, 'dd-MM-yyyy HH:mm:ss') : getDateTimeOneYearAgoAndSetToStart(),
                "_to_date": date?.to ? format(date.to, 'dd-MM-yyyy HH:mm:ss') : getDateTimeOneMonthAgoAndSetToEnd(),
            }, groupByField)
        }
    )
    const { data: categories, error: categoriesError, isLoading: categoriesIsLoading } = useSWR<Category[]>(CATEGORIES_GET_ALL_SWR_HOOK, categoriesGetAll)



    //Process the data
    const processedComplaintsData = complaintStatistics
                                    ? convertApiDataIntoLineChartMultipleData(complaintStatistics)
                                    : []
    const colourMapSorted = categories
                            ? Object.fromEntries(
                                Object.entries(convertCategoryObjectsToColourMap(categories)).sort(([a], [b]) => a.localeCompare(b)))
                            : {};
           
    const sortedCategoryNames: string[] = categories
                                          ? categories.map(category => category.name).sort()
                                          : []
    

    return (
        complaintStatisticsIsLoading || categoriesIsLoading
        ? (<Skeleton className="w-full h-[200px]" />)
        : complaintStatisticsError || categoriesError || determineIsObjectEmpty(COLOUR_MAP) || categories?.length === 0 || complaintStatistics === undefined || categories === undefined
        ? <div>Something went wrong. Please try again later.</div>
        : (
            <div className='flex flex-col space-y-8'>
                <GraphDateRangePicker date={ date } setDate={ setDate } isPopoverOpen={ isDatePopoverOpen } setIsPopoverOpen={ setIsDatePopoverOpen } />
                <LineChartMultipleWithCategoryFilter chartData={ processedComplaintsData } colourMap={ colourMapSorted } allLabels={ sortedCategoryNames } />  
            </div>
          )  
    )
}
