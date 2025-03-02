import PageSubtitle from "@/components/common/text/PageSubtitle"
import AiTooltip from "@/components/common/others/AiTooltip"
import { Category } from "@/types/Category"
import { MostNegativePostsVisualisation } from "@/components/analytics/MostNegativeComplaintsVisualisation"

/**
This component is used to display the most negative complaints of a given category
in the category analytics page.
*/
interface CategoryAnalyticsMostNegativeComplaintsProps {
    category: Category
}


export default function CategoryAnalyticsMostNegativeComplaints({ category }: CategoryAnalyticsMostNegativeComplaintsProps) {
    return (
        <div className='paragraph-container'>
            <PageSubtitle pageSubtitle="Most Negative Complaints" />


            {/* TODO: Update this again */}
            <MostNegativePostsVisualisation />
        </div>
    )
}
