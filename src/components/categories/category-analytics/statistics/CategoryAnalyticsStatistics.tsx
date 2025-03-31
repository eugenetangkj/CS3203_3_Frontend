"use client"

import PageSubtitle from "@/components/common/text/PageSubtitle"
import { Skeleton } from "@/components/ui/skeleton"
import { COMPLAINTS_GET_STATISTICS_SWR_HOOK } from "@/constants/SwrHooks"
import InfoTooltip from "@/components/common/others/InfoTooltip"
import { complaintsGetStatistics } from "@/controllers/ComplaintsFunctions"
import useSWR from "swr"


/**
This component is used to display the numerical statistics of a given category
in the category analytics page.

It includes:
- Number of complaints
- Sentiment
- Predicted sentiment
- ABSA result
*/
interface CategoryAnalyticsStatisticsProps {
    categoryName: string,
    forecastedSentiment: number
}



export default function CategoryAnalyticsStatistics({ categoryName, forecastedSentiment}: CategoryAnalyticsStatisticsProps) {
    //States
    const { data: statistics, error: getComplaintStatisticsError, isLoading: getComplaintStatisticsIsLoading } = useSWR(
        [COMPLAINTS_GET_STATISTICS_SWR_HOOK, categoryName],
        () => complaintsGetStatistics(
            {
                "category": categoryName
            }
        )
    );

    return (
        getComplaintStatisticsIsLoading
        ? (
            <div className='paragraph-container'>
                <PageSubtitle pageSubtitle="Statistics" />
                <Skeleton className='w-full h-[100px]' />
            </div>
        )
        : getComplaintStatisticsError || statistics === undefined || statistics['count'] < 0
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
                        <p className='text-5xl font-bold text-yap-green-900'>{ statistics['count'] }</p>
                        <p className='text-lg text-yap-brown-900'>Total no. of complaints</p>
                    </div>


                    {/* Current sentiment */}
                    <div className='flex flex-col justify-center items-center space-y-2'>
                        <p className={`text-5xl font-bold ${ statistics['avg_sentiment'] < 0 ? 'text-yap-orange-900' : 'text-yap-green-900'}`}>{ statistics['avg_sentiment'] }</p>
                        <p className='text-lg text-yap-brown-900'>Current sentiment</p>
                    </div>

                    {/* Forecasted sentiment */}
                    <div className='flex flex-col justify-center items-center space-y-2'>
                        <p className={`text-5xl font-bold ${forecastedSentiment < 0 ? 'text-yap-orange-900' : 'text-yap-green-900'}`}>{ forecastedSentiment }</p>
                        <div className='flex flex-row items-center space-x-2'>
                            <p className='text-lg text-yap-brown-900'>Forecasted sentiment</p>
                            <InfoTooltip message="The forecasted sentiment score for 1 month later." />
                        </div>
                        
                    </div>
                </div>
            </div>
           )
    )
}
