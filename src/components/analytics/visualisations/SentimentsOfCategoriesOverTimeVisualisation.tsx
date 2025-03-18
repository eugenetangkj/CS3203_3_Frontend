"use client"

import { useEffect, useState } from "react"
import { Skeleton } from "../../ui/skeleton"
import { LineChartMultiple } from "../../charts/LineChartMultiple"
import { LineChartMultiplePoint } from "@/types/ChartInterface"
import axios from "axios"
import { API_BASE_URL_ANALYTICS, GET_COMPLAINTS_GROUPED_BY_FIELD_OVER_TIME_ENDPOINT, API_BASE_URL_ADMIN_MANAGEMENT, CATEGORIES_GET_ALL_ENDPOINT } from "@/constants/ApiRoutes"
import { convertCategoryDocumentsToColourMap } from "@/utils/DatabaseHelperFunctions"
import { getDateTimeOneYearAgoAndSetToStart, getDateTimeOneMonthAgoAndSetToEnd } from "@/utils/HelperFunctions"
import { GraphDateRangePicker } from "../../common/others/GraphDateRangePicker"
import { DateRange } from "react-day-picker"
import { format, addMonths } from "date-fns"

/**
Represents the visualisation for the sentiments of categorises over time, used in analytics dashboard.
*/
export function SentimentsOfCategoriesOverTimeVisualisation() {

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



    //Helper function to convert the API object into an array of the format required for the bar chart custom label
    const convertApiDataIntoLineChartMultipleData = (monthlyData: { date: string; data: Record<string, { avg_sentiment: number }> }[]): LineChartMultiplePoint[] => {
        return monthlyData.map(({ date, data }) => ({
            date: date,
            ...Object.fromEntries(Object.entries(data).map(([category, values]) => [category, values.avg_sentiment]))
        }));
    };


    //Fetches the API to process the number of complaints for each category over the past 1 year
    const fetchPostsByCategoryOverTime = async () => {
        setIsLoading(true)
        try {
            //Process complaints data
            const complaintsApiEndPoint = API_BASE_URL_ANALYTICS + '/' + GET_COMPLAINTS_GROUPED_BY_FIELD_OVER_TIME_ENDPOINT
            const complaintsData = await axios.post(complaintsApiEndPoint,
                {
                    "start_date": date?.from ? format(date.from, 'dd-MM-yyyy HH:mm:ss') : getDateTimeOneYearAgoAndSetToStart(),
                    "end_date": date?.to ? format(date.to, 'dd-MM-yyyy HH:mm:ss') : getDateTimeOneMonthAgoAndSetToEnd(),
                    "group_by_field": "category"
                }
            )
            const processedComplaintsData = convertApiDataIntoLineChartMultipleData(complaintsData.data.result)

            //Process category colours
            const categoriesApiEndPoint = API_BASE_URL_ADMIN_MANAGEMENT + '/' + CATEGORIES_GET_ALL_ENDPOINT
            const categoriesData = await axios.post(categoriesApiEndPoint)
            const colourMapFromApi = convertCategoryDocumentsToColourMap(categoriesData.data.documents)
            
            //Update states
            setDataPoints(processedComplaintsData)
            setColourMap(colourMapFromApi)
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
        : Object.keys(colourMap).length === 0
        ? <div></div>
        : (
            <div className='flex flex-col space-y-8'>
                <GraphDateRangePicker date={ date } setDate={ setDate } isPopoverOpen={ isDatePopoverOpen } setIsPopoverOpen={ setIsDatePopoverOpen } fetchData={ fetchPostsByCategoryOverTime }/>
                <LineChartMultiple chartData={ dataPoints } colourMap={ colourMap } />  
            </div>
          )
    )
}
