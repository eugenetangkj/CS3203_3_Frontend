"use client"

import { useState, useEffect } from "react"
import { useParams } from 'next/navigation'
import PageTitle from "@/components/common/text/PageTitle"
import { Category } from "@/types/Category"
import { Skeleton } from "@/components/ui/skeleton"
import CategoryAnalyticsSummary from "./CategoryAnalyticsSummary"
import CategoryAnalyticsTrendingKeywords from "./CategoryAnalyticsTrendingKeywords"

/**
This component represents the body for viewing the analytics of a particular category.
It houses the other components that showcase different analytics for the given category.
*/

export default function CategoryAnalyticsBody() {
    //States
    const [hasRanAPi, setHasRanApi] = useState<boolean>(false)
    const [isThereError, setIsThereError] = useState<boolean>(false)
    const [currentCategory, setCurrentCategory] = useState<Category>()

    // Parameter in URL string
    const params = useParams<{ id: string}>()
    const categoryName = decodeURIComponent(params['id'])


    const fetchCategory = async () => {
        try {
            //Call API to fetch category given its name
            
            //Process data

            //Update state
            setCurrentCategory({
                id: "1",
                name: "Financial",
                colour: "#000000",
                summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                keywords: ["Keyword 1", "Keyword 2", "Keyword 3", "Keyword 4", "Keyword 5", "Keyword 6"],
                concerns: ["Concern 1", "Concern 2"],
                suggestions: ["Suggestion 1", "Suggestion 2"]
            })
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
        : isThereError || currentCategory == null
        ? <div>Something went wrong in fetching the category.</div>
        : (
            <div className='flex flex-col space-y-8'>
                {/* Page title */}
                <PageTitle pageTitle={`Analytics on ${ currentCategory?.name}`} />

                {/* Key summary */}
                <CategoryAnalyticsSummary summary={ currentCategory.summary } />

                {/* Trending keywords */}
                <CategoryAnalyticsTrendingKeywords keywords={ currentCategory.keywords } />
                
            </div>

        )
  )
}
