import PageSubtitle from "@/components/common/text/PageSubtitle"
import PageSubsectionTitle from "@/components/common/text/PageSubsectionTitle"
import CategoryAnalyticsNumberOfComplaintsOverTime from "./CategoryAnalyticsNumberOfComplaintsOverTime"
import CategoryAnalyticsSentimentOverTime from "./CategoryAnalyticsSentimentOverTime"
import { CategoryAnalytics } from "@/types/CategoryAnalytics"

/**
This component is used to house the graphs shown in the category analytics page.
*/
interface CategoryAnalyticsGraphsContainerProps {
    readonly currentCategoryAnalytics: CategoryAnalytics
}


export default function CategoryAnalyticsGraphsContainer({ currentCategoryAnalytics }: CategoryAnalyticsGraphsContainerProps) {
    return (
       <div className='paragraph-container'>
            <PageSubtitle pageSubtitle="Graphs" />

            <div className='flex flex-col space-y-8'>
                {/* Number of complaints over time for this category */}
                <div className='flex flex-col justify-start items-start space-y-4 w-full'>
                    <PageSubsectionTitle subsectionTitle="Number of Complaints Over Time" />
                    <CategoryAnalyticsNumberOfComplaintsOverTime currentCategoryAnalytics={ currentCategoryAnalytics } />
                </div>
                        
                {/* Sentiment over time for this category */}
                <div className='flex flex-col justify-start items-start space-y-4'>
                    <PageSubsectionTitle subsectionTitle="Sentiment Over Time" />
                    <CategoryAnalyticsSentimentOverTime currentCategoryAnalytics={ currentCategoryAnalytics } /> 
                </div>
            </div>
        </div>
    )
}
