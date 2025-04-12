import PageSubtitle from "@/components/common/text/PageSubtitle"
import { CategoryAnalyticsComplaintsVisualisation } from "./CategoryAnalyticsComplaintsVisualisation"
import { CategoryAnalytics } from "@/types/CategoryAnalytics"

/**
This component is used to display the complaints of a given category
in the category analytics page.
*/
interface CategoryAnalyticsComplaintsProps {
    readonly currentCategoryAnalytics: CategoryAnalytics
}


export default function CategoryAnalyticsComplaints({ currentCategoryAnalytics }: CategoryAnalyticsComplaintsProps) {
    return (
        <div className='paragraph-container'>
            <PageSubtitle pageSubtitle="List of Complaints" />

            <CategoryAnalyticsComplaintsVisualisation currentCategoryAnalytics={ currentCategoryAnalytics } />
        </div>
    )
}
