"use client"

import PageSubtitle from "@/components/common/text/PageSubtitle"
import { Category } from "@/types/Category"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { API_BASE_URL_ANALYTICS, GET_COMPLAINTS_STATISTICS_ENDPOINT } from "@/constants/ApiRoutes"
import axios from "axios"

/**
This component is used to display the numerical statistics of a given category
in the category analytics page.

It includes:
- Number of complaints
- Sentiment
- ABSA result
*/
interface CategoryAnalyticsStatisticsProps {
    categoryName: string
}



export default function CategoryAnalyticsStatistics({ categoryName }: CategoryAnalyticsStatisticsProps) {
    //States
    const [hasRanAPi, setHasRanApi] = useState<boolean>(false)
    const [isThereError, setIsThereError] = useState<boolean>(false)
    const [totalNumberOfComplaints, setTotalNumberOfcomplaints] = useState<number>(-1)
    const [currentSentiment, setCurrentSentiment] = useState<number>(-1)


    const fetchCategoryStatistics = async () => {
        try {
            //Call API to fetch category statistics given its name
            const apiEndPoint = API_BASE_URL_ANALYTICS + '/' + GET_COMPLAINTS_STATISTICS_ENDPOINT
            const apiData = await axios.post(apiEndPoint,
                {
                    "filter": {
                        "category": categoryName
                    }
                }
            )

            //Update states
            setTotalNumberOfcomplaints(apiData.data.result['count'])
            setCurrentSentiment(apiData.data.result['avg_sentiment'])
        } catch (error) {
            setIsThereError(true)
        } finally {
            setHasRanApi(true)

        }
    }


    //Fetch category statistics on component mount
    useEffect(() => {
        fetchCategoryStatistics()
    }, [])



    return (
        !hasRanAPi
        ? (<Skeleton className='w-full h-[100px]' />)
        : isThereError
        ? <div className='paragraph-container'>
            <PageSubtitle pageSubtitle="Statistics" />
            <p className='text-yap-black-800'>Something went wrong with fetching the statistics.</p>
            </div>
        : (
            <div className='paragraph-container'>
                <PageSubtitle pageSubtitle="Statistics" />


                <div className='flex flex-col justify-start items-center space-y-8 sm:space-y-0 sm:flex-row sm:justify-start sm:flex-wrap sm:space-x-16'>
                    {/* Total number of complaints */}
                    <div className='flex flex-col justify-center items-center space-y-2'>
                        <p className='text-5xl font-bold text-yap-green-900'>{ totalNumberOfComplaints }</p>
                        <p className='text-lg text-yap-brown-900'>Total no. of complaints</p>
                    </div>


                    {/* Current sentiment */}
                    <div className='flex flex-col justify-center items-center space-y-2'>
                        <p className={`text-5xl font-bold ${currentSentiment < 0 ? 'text-yap-orange-900' : 'text-yap-green-900'}`}>{ currentSentiment }</p>
                        <p className='text-lg text-yap-brown-900'>Current sentiment</p>
                    </div>
                </div>
            </div>
           )
    )
}
