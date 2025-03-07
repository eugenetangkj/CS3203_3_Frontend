

import PageSubtitle from "@/components/common/text/PageSubtitle"
import { Category } from "@/types/Category"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { NumberOfComplaintsForCategoryOverTime } from "./NumberOfComplaintsForCategoryOverTime"
import { SentimentForCategoryOverTime } from "./SentimentForCategoryOverTime"
import PageSubsectionTitle from "@/components/common/text/PageSubsectionTitle"

/**
This component is used to house the graphs shown in the category analytics page.
*/
interface CategoryAnalyticsGraphsProps {
    category: Category
}



export default function CategoryAnalyticsGraphs({ category }: CategoryAnalyticsGraphsProps) {
    return (
       <div className='paragraph-container'>
            <PageSubtitle pageSubtitle="Graphs" />
            <div className='flex flex-col space-y-8'>
                <div className='flex flex-col justify-start items-start space-y-4'>
                    <PageSubsectionTitle subsectionTitle="Number of Complaints Over Time" />
                    <NumberOfComplaintsForCategoryOverTime />
                </div>
                
                <div className='flex flex-col justify-start items-start space-y-4'>
                    <PageSubsectionTitle subsectionTitle="Sentiment Over Time" />
                    <SentimentForCategoryOverTime />
                </div>
            </div>
           
        </div>
    )
}
