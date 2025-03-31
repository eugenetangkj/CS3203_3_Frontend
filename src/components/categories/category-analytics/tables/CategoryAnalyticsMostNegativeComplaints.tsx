import PageSubtitle from "@/components/common/text/PageSubtitle"
import { CategoryAnalyticsMostNegativePostsVisualisation } from "./CategoryAnalyticsMostNegativeComplaintsVisualisation"

/**
This component is used to display the most negative complaints of a given category
in the category analytics page.
*/
interface CategoryAnalyticsMostNegativeComplaintsProps {
    readonly categoryName: string
}


export default function CategoryAnalyticsMostNegativeComplaints({ categoryName }: CategoryAnalyticsMostNegativeComplaintsProps) {
    return (
        <div className='paragraph-container'>
            <PageSubtitle pageSubtitle="Most Negative Complaints" />

            <CategoryAnalyticsMostNegativePostsVisualisation categoryName={ categoryName } />
        </div>
    )
}
