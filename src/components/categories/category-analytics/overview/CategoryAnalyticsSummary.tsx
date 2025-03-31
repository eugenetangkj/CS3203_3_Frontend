import PageSubtitle from "@/components/common/text/PageSubtitle"
import AiTooltip from "@/components/common/others/AiTooltip"

/**
This component is used to display the summary text of a given category
in the category analytics page.
*/
interface CategoryAnalyticsSummaryProps {
    readonly summary: string
}


export default function CategoryAnalyticsSummary({ summary }: CategoryAnalyticsSummaryProps) {
    return (
        <div className='paragraph-container'>
            <div className='flex flex-row space-x-4 items-center'>
                <PageSubtitle pageSubtitle="Summary" />
                <AiTooltip message='This summary is AI-generated.' />
            </div>
            <p className='text-yap-black-800'>{ summary }</p>
        </div>
    )
}
