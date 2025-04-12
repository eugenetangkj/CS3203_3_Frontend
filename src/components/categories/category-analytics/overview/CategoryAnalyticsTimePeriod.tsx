import PageSubtitle from "@/components/common/text/PageSubtitle"
import { CategoryAnalytics } from "@/types/CategoryAnalytics"
import { getDateRangeForCategoryAnalytics } from "@/utils/HelperFunctions"
import InfoTooltip from "@/components/common/others/InfoTooltip"

/**
This component is used to display the time period of a given category
in the category analytics page.
*/
interface CategoryAnalyticsTimePeriodProps {
    readonly currentCategoryAnalytics: CategoryAnalytics
}


export default function CategoryAnalyticsTimePeriod({ currentCategoryAnalytics }: CategoryAnalyticsTimePeriodProps) {
    const datesForCategoryAnalytics = getDateRangeForCategoryAnalytics(currentCategoryAnalytics.date_created)


    return (
        <div className='paragraph-container'>
            <div className='flex flex-row space-x-4 items-center'>
                <PageSubtitle pageSubtitle="Time Period for Analytics" />
                <InfoTooltip message='This refers to the time period during which the complaint&apos;s posted date falls, in order to generate analytics for this category.' />
            </div>
            <p className='text-yap-black-800'>{ `${datesForCategoryAnalytics[0].slice(3, 10)} to ${datesForCategoryAnalytics[1].slice(3, 10)}` }</p>
        </div>
    )
}
