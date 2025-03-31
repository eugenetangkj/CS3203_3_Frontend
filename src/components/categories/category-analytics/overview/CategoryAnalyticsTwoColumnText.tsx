import PageSubtitle from "@/components/common/text/PageSubtitle"
import AiTooltip from "@/components/common/others/AiTooltip"

/**
This component is used to display the text that can be shown in 2 columns
for the category analytics page. Namely, it is used for concerns and suggestions.
*/
interface CategoryAnalyticsTwoColumnTextProps {
    readonly title: string,
    readonly content: string[],
    readonly aiMessage: string,
    readonly emptyMessage: string
}


export default function CategoryAnalyticsTwoColumnText({ title, content, aiMessage, emptyMessage }: CategoryAnalyticsTwoColumnTextProps) {
    return (
        <div className='paragraph-container col-span-2 lg:col-span-1'>
            <div className='flex flex-row space-x-4 items-center'>
                <PageSubtitle pageSubtitle={ title } />
                <AiTooltip message={ aiMessage } />
            </div>
            {
                (content.length === 0)
                ? <p className='text-yap-black-800'>{ emptyMessage }</p>
                : <ul className='list-disc pl-5 space-y-4 text-yap-black-800'>
                    {
                        content.map((content) => (
                            <li key={ content }>{ content }</li>
                        ))
                    }
                </ul>
            }
        </div>
    )
}
