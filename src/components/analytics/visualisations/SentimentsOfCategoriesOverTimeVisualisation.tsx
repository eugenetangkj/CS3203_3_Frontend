"use client"

import { useState } from "react"
import { Skeleton } from "../../ui/skeleton"
import { LineChartMultiplePoint } from "@/types/ChartInterface"
import { getDateTimeOneYearAgoAndSetToStart, getDateTimeOneMonthAgoAndSetToEnd } from "@/utils/HelperFunctions"
import { GraphDateRangePicker } from "../../common/others/GraphDateRangePicker"
import { DateRange } from "react-day-picker"
import { format, addMonths } from "date-fns"
import { LineChartMultipleWithCategoryFilter } from "@/components/charts/LineChartMultipleWithCategoryFilter"
import useSWR from "swr"
import { COMPLAINTS_GET_STATISTICS_GROUPED_OVER_TIME_SWR_HOOK } from "@/constants/SwrHooks"
import { complaintsGetStatisticsGroupedOverTime } from "@/data-fetchers/ComplaintsFunctions"
import { ComplaintStatisticsByDate } from "@/types/Complaint"
import { Category } from "@/types/Category"
import { CATEGORIES_GET_ALL_SWR_HOOK } from "@/constants/SwrHooks"
import { categoriesGetAll } from "@/data-fetchers/CategoriesFunctions"
import { convertCategoryObjectsToColourMap } from "@/utils/DatabaseHelperFunctions"


/**
Represents the visualisation for the sentiments of categorises over time, used in analytics dashboard.
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
        sortedCategories.map((category) => [category, data[category].avg_sentiment])
      );
  
      return {
        date,
        ...sortedData
      };
    });
};


export function SentimentsOfCategoriesOverTimeVisualisation() {

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
        : complaintStatisticsError || categoriesError || complaintStatistics === undefined || categories === undefined || categories.length === 0
        ? <div>Something went wrong. Please try again later.</div>
        : (
            <div className='flex flex-col space-y-8'>
                <GraphDateRangePicker date={ date } setDate={ setDate } isPopoverOpen={ isDatePopoverOpen } setIsPopoverOpen={ setIsDatePopoverOpen }/>
                <LineChartMultipleWithCategoryFilter chartData={ processedComplaintsData } colourMap={ colourMapSorted } allLabels={ sortedCategoryNames } />  
            </div>
          )
    )
}
