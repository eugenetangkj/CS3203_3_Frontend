

import PageSubtitle from "@/components/common/text/PageSubtitle"
import CategoryAnalyticsGraphs from "./CategoryAnalyticsGraphs"

/**
This component is used to house the graphs shown in the category analytics page.
*/
interface CategoryAnalyticsGraphsContainerProps {
    categoryName: string
}


export default function CategoryAnalyticsGraphsContainer({ categoryName }: CategoryAnalyticsGraphsContainerProps) {
    return (
       <div className='paragraph-container'>
            <PageSubtitle pageSubtitle="Graphs" />
            <CategoryAnalyticsGraphs categoryName={ categoryName } />  
        </div>
    )
}
