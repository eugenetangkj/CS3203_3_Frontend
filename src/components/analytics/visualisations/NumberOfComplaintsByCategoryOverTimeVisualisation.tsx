"use client"

import { useEffect, useState } from "react"
import { Skeleton } from "../../ui/skeleton"
import { LineChartMultiplePoint } from "@/types/ChartInterface"
import axios from "axios"
import { API_BASE_URL_ANALYTICS, COMPLAINTS_GET_STATISTICS_GROUPED_OVER_TIME_ENDPOINT, API_BASE_URL_ADMIN_MANAGEMENT, CATEGORIES_GET_ALL_ENDPOINT } from "@/constants/ApiRoutes"
import { convertCategoryDocumentsToColourMap } from "@/utils/DatabaseHelperFunctions"
import { getDateTimeOneYearAgoAndSetToStart, getDateTimeOneMonthAgoAndSetToEnd, determineIsObjectEmpty } from "@/utils/HelperFunctions"
import { GraphDateRangePicker } from "../../common/others/GraphDateRangePicker"
import { DateRange } from "react-day-picker"
import { format, addMonths } from "date-fns"
import { COLOUR_MAP } from "@/constants/Constants"
import { LineChartMultipleWithCategoryFilter } from "@/components/charts/LineChartMultipleWithCategoryFilter"
import { convertCategoryDocumentsToObjects } from "@/utils/DatabaseHelperFunctions"


/**
Represents the visualisation for number of complaints by category over time visualisation used in analytics dashboard
*/
export function NumberOfComplaintsByCategoryOverTimeVisualisation() {

    //States
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [dataPoints, setDataPoints] = useState<LineChartMultiplePoint[]>([])
    const [colourMap, setColourMap] = useState<Record<string, string>>({})
    const [isThereError, setIsThereError] = useState<boolean>(false)
    const [date, setDate] = useState<DateRange | undefined>({
        from: addMonths(new Date(), -12), //12 months from today's date
        to: new Date(), //Default is today's date
    })
    const [isDatePopoverOpen, setIsDatePopoverOpen] = useState<boolean>(false)
    const [sortedCategoryNames, setSortedCategoryNames] = useState<string[]>([])


    //Helper function to convert the API object into an array of the format required for the bar chart custom label
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
      
    


    //Fetches the API to process the number of complaints for each category over the past 1 year
    const fetchPostsByCategoryOverTime = async () => {
        setIsLoading(true)
        try {
            //Process complaints data
            const complaintsApiEndPoint = API_BASE_URL_ANALYTICS  + COMPLAINTS_GET_STATISTICS_GROUPED_OVER_TIME_ENDPOINT
            const complaintsData = await axios.post(complaintsApiEndPoint,
                {
                    "group_by_field": "category",
                    "filter": {
                        "_from_date": date?.from ? format(date.from, 'dd-MM-yyyy HH:mm:ss') : getDateTimeOneYearAgoAndSetToStart(),
                        "_to_date": date?.to ? format(date.to, 'dd-MM-yyyy HH:mm:ss') : getDateTimeOneMonthAgoAndSetToEnd(),
                    }
                }
            )
            const processedComplaintsData = convertApiDataIntoLineChartMultipleData(complaintsData.data.statistics)


            //Process category colours
            const categoriesApiEndPoint = API_BASE_URL_ADMIN_MANAGEMENT  + CATEGORIES_GET_ALL_ENDPOINT
            const categoriesData = await axios.post(categoriesApiEndPoint)
            const categories = convertCategoryDocumentsToObjects(categoriesData.data.documents)
            
            const sortedCategoryNames: string[] = categories.map(category => category.name).sort();
            setSortedCategoryNames(sortedCategoryNames)
            const colourMapFromApi = convertCategoryDocumentsToColourMap(categoriesData.data.documents)
            const colourMapSorted = Object.fromEntries(
                Object.entries(colourMapFromApi).sort(([a], [b]) => a.localeCompare(b))
            );
            
            //Update states
            setDataPoints(processedComplaintsData)
            setColourMap(colourMapSorted)
        } catch (error) {
            setIsThereError(true)
        } finally {
            setIsLoading(false)
        }
    }

    //Call the API on component mount
    useEffect(() => {
        fetchPostsByCategoryOverTime()
    }, [])


    return (
        isLoading
        ? (<Skeleton className="w-full h-[200px]" />)
        : isThereError
        ? <div>Something went wrong. Please try again later.</div>
        : determineIsObjectEmpty(COLOUR_MAP)
        ? <div></div>
        : (
            <div className='flex flex-col space-y-8'>
                <GraphDateRangePicker date={ date } setDate={ setDate } isPopoverOpen={ isDatePopoverOpen } setIsPopoverOpen={ setIsDatePopoverOpen } fetchData={ fetchPostsByCategoryOverTime }/>
                <LineChartMultipleWithCategoryFilter chartData={ dataPoints } colourMap={ colourMap } allLabels={ sortedCategoryNames } />  
            </div>
          )  
    )
}
