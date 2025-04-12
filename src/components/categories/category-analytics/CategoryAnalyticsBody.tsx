"use client"

import PageTitle from "@/components/common/text/PageTitle"
import { Skeleton } from "@/components/ui/skeleton"
import CategoryAnalyticsSummary from "./overview/CategoryAnalyticsSummary"
import CategoryAnalyticsTrendingKeywords from "./overview/CategoryAnalyticsTrendingKeywords"
import CategoryAnalyticsAbsaResults from "./overview/CategoryAnalyticsAbsaResults"
import CategoryAnalyticsTwoColumnText from "./overview/CategoryAnalyticsTwoColumnText"
import CategoryAnalyticsComplaints from "./tables/CategoryAnalyticsComplaints"
import CategoryAnalyticsStatistics from "./statistics/CategoryAnalyticsStatistics"
import CategoryAnalyticsGraphsContainer from "./graphs/CategoryAnalyticsGraphsContainer"
import useSWR from "swr"
import { categoryAnalyticsGetByName } from "@/data-fetchers/CategoryAnalyticsFunctions"
import DownloadCategoryAnalyticsButton from "./DownloadCategoryAnalyticsButton"
import CategoryAnalyticsTimePeriod from "./overview/CategoryAnalyticsTimePeriod"


/**
This component represents the body for viewing the analytics of a particular category.
It houses the other components that showcase different analytics for the given category.
*/
interface CategoryAnalyticsBodyProps {
    categoryName: string
}


export default function CategoryAnalyticsBody({ categoryName }: CategoryAnalyticsBodyProps) {
    //States
    const { data: currentCategoryAnalytics, error, isLoading } = useSWR(`CATEGORY_ANALYTICS_GET_BY_NAME_SWR_HOOK/${ categoryName }`, () => categoryAnalyticsGetByName(categoryName))
   
  
    return (
        isLoading
        ? (<Skeleton className='w-full h-[100px]' />)
        : error || currentCategoryAnalytics === undefined
        ? <div>Something went wrong in fetching the category analytics. Check if the analytics exist for the given category.</div>
        : (
            <div className='flex flex-col space-y-12'>
                {/* Page title */}
                <div className='flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center'>
                    <PageTitle pageTitle={`Analytics on ${ currentCategoryAnalytics.name}`} />
                    <DownloadCategoryAnalyticsButton categoryAnalytics={ currentCategoryAnalytics }/>
                </div>

                {/* Time period */}
                <CategoryAnalyticsTimePeriod currentCategoryAnalytics={ currentCategoryAnalytics } />
                
                {/* Key summary */}
                <CategoryAnalyticsSummary summary={ currentCategoryAnalytics.summary } />

                {/* Trending keywords */}
                {/* <CategoryAnalyticsTrendingKeywords keywords={ currentCategoryAnalytics.keywords } /> */}

                {/* ABSA Result */}
                <CategoryAnalyticsAbsaResults absaResults={ currentCategoryAnalytics.absa_result } />

                {/* Concerns and suggestions */}
                <div className='grid grid-row-1 grid-cols-2 gap-12'>
                    <CategoryAnalyticsTwoColumnText
                        title="Concerns"
                        content={ currentCategoryAnalytics.concerns }
                        aiMessage="The concerns are AI-generated."
                        emptyMessage="No concerns can be generated."
                    />
                    <CategoryAnalyticsTwoColumnText
                        title="Suggestions"
                        content={ currentCategoryAnalytics.suggestions }
                        aiMessage="The suggestions are AI-generated."
                        emptyMessage="No suggestions can be generated."
                    />
                </div>

                {/* Statistics */}
                <CategoryAnalyticsStatistics currentCategoryAnalytics={ currentCategoryAnalytics } />

                {/* Graphs */}
                <CategoryAnalyticsGraphsContainer currentCategoryAnalytics={ currentCategoryAnalytics } />

                {/* List of complaints */}
                <CategoryAnalyticsComplaints currentCategoryAnalytics={ currentCategoryAnalytics } />

                
            </div>

        )
  )
}
