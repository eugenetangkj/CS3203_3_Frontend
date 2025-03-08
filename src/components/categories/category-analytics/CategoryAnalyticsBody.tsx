"use client"

import { useState, useEffect } from "react"
import { useParams } from 'next/navigation'
import PageTitle from "@/components/common/text/PageTitle"
import { Skeleton } from "@/components/ui/skeleton"
import CategoryAnalyticsSummary from "./overview/CategoryAnalyticsSummary"
import CategoryAnalyticsTrendingKeywords from "./overview/CategoryAnalyticsTrendingKeywords"
import CategoryAnalyticsAbsaResults from "./overview/CategoryAnalyticsAbsaResults"
import CategoryAnalyticsTwoColumnText from "./overview/CategoryAnalyticsTwoColumnText"
import CategoryAnalyticsMostNegativeComplaints from "./tables/CategoryAnalyticsMostNegativeComplaints"
import CategoryAnalyticsStatistics from "./statistics/CategoryAnalyticsStatistics"
import CategoryAnalyticsGraphsContainer from "./graphs/CategoryAnalyticsGraphsContainer"
import { CategoryAnalytics } from "@/types/CategoryAnalytics"
import { API_BASE_URL_ANALYTICS, GET_CATEGORY_ANALYTICS_BY_NAME_ENDPOINT, } from "@/constants/ApiRoutes"
import axios from "axios"


/**
This component represents the body for viewing the analytics of a particular category.
It houses the other components that showcase different analytics for the given category.
*/

export default function CategoryAnalyticsBody() {
    //States
    const [hasRanAPi, setHasRanApi] = useState<boolean>(false)
    const [isThereError, setIsThereError] = useState<boolean>(false)
    const [currentCategoryAnalytics, setCurrentCategoryAnalytics] = useState<CategoryAnalytics>()

    // Parameter in URL string
    const params = useParams<{ id: string}>()
    const categoryName = decodeURIComponent(params['id'])


    //Convert category analytics data into category analytics object helper function
    const convertToCategoryAnalyticsObject = (rawData : any): CategoryAnalytics => {
        return {
            id: rawData._id.$oid,
            name: rawData.name,
            suggestions: rawData.suggestions,
            keywords_per_category: rawData.keywords_per_category,
            summary: rawData.summary,
            forecasted_score: parseFloat(rawData.forecasted_score),
            current_score: parseFloat(rawData.current_score),
            key_concerns: rawData.key_concerns,
            forecasted_label: rawData.forecasted_label,
            absa_result: rawData.absa_result
        };
    };


    const fetchCategory = async () => {
        try {
            //Call API to fetch category analytics given the category name
            const getCategoryAnalyticsEndpoint = API_BASE_URL_ANALYTICS + '/' + GET_CATEGORY_ANALYTICS_BY_NAME_ENDPOINT

            const categoryAnalyticsData = await axios.post(getCategoryAnalyticsEndpoint,
                {
                    "name": categoryName,
                }
            )


            //Convert category analytics data into category analytics object
            const categoryAnalyticsObject = convertToCategoryAnalyticsObject(categoryAnalyticsData.data.document)

            //Update state
            setCurrentCategoryAnalytics(categoryAnalyticsObject)
        } catch (error) {
            setIsThereError(true)

        } finally {
            setHasRanApi(true)

        }
    }


    //Fetch category on component mount
    useEffect(() => {
        fetchCategory()
    }, [])


    return (
        !hasRanAPi
        ? (<Skeleton className='w-full h-[100px]' />)
        : isThereError || currentCategoryAnalytics == null
        ? <div>Something went wrong in fetching the category analytics. Check if the analytics exist for the given category.</div>
        : (
            <div className='flex flex-col space-y-12'>
                {/* Page title */}
                <PageTitle pageTitle={`Analytics on ${ currentCategoryAnalytics?.name}`} />

                {/* Key summary */}
                <CategoryAnalyticsSummary summary={ currentCategoryAnalytics.summary } />

                {/* Trending keywords */}
                <CategoryAnalyticsTrendingKeywords keywords={ currentCategoryAnalytics.keywords_per_category } />

                {/* ABSA Result */}
                <CategoryAnalyticsAbsaResults absaResults={ currentCategoryAnalytics.absa_result } />

                {/* Concerns and suggestions */}
                <div className='grid grid-row-1 grid-cols-2 gap-12'>
                    <CategoryAnalyticsTwoColumnText
                        title="Concerns"
                        content={ currentCategoryAnalytics.key_concerns }
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

                {/* Most negative complaints */}
                <CategoryAnalyticsMostNegativeComplaints categoryName={ currentCategoryAnalytics.name } />


                {/* Statistics */}
                <CategoryAnalyticsStatistics categoryName={ currentCategoryAnalytics.name } forecastedSentiment={ currentCategoryAnalytics.forecasted_score }/>

                {/* Graphs */}
                <CategoryAnalyticsGraphsContainer categoryName={currentCategoryAnalytics.name } />
                
            </div>

        )
  )
}
