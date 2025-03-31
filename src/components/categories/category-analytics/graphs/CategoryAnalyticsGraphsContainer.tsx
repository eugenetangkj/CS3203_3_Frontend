import PageSubtitle from "@/components/common/text/PageSubtitle"
import PageSubsectionTitle from "@/components/common/text/PageSubsectionTitle"
import CategoryAnalyticsNumberOfComplaintsOverTime from "./CategoryAnalyticsNumberOfComplaintsOverTime"
import CategoryAnalyticsSentimentOverTime from "./CategoryAnalyticsSentimentOverTime"

/**
This component is used to house the graphs shown in the category analytics page.
*/
interface CategoryAnalyticsGraphsContainerProps {
    readonly categoryName: string
}


export default function CategoryAnalyticsGraphsContainer({ categoryName }: CategoryAnalyticsGraphsContainerProps) {
    return (
       <div className='paragraph-container'>
            <PageSubtitle pageSubtitle="Graphs" />

            <div className='flex flex-col space-y-8'>
                {/* Number of complaints over time for this category */}
                <div className='flex flex-col justify-start items-start space-y-4 w-full'>
                    <PageSubsectionTitle subsectionTitle="Number of Complaints Over Time" />
                    <CategoryAnalyticsNumberOfComplaintsOverTime categoryName={ categoryName } />
                </div>
                        
                {/* Sentiment over time for this category */}
                <div className='flex flex-col justify-start items-start space-y-4'>
                    <PageSubsectionTitle subsectionTitle="Sentiment Over Time" />
                    <CategoryAnalyticsSentimentOverTime categoryName={ categoryName } /> 
                </div>
            </div>
        </div>
    )
}
