import PageSubtitle from "@/components/common/text/PageSubtitle"
import AiTooltip from "@/components/common/others/AiTooltip"
import InfoTooltip from "@/components/common/others/InfoTooltip"

/**
This component is used to display the trending keywords of a given category
in the category analytics page.
*/
interface CategoryAnalyticsTrendingKeywordsProps {
    readonly keywords: string[]
}


export default function CategoryAnalyticsTrendingKeywords({ keywords }: CategoryAnalyticsTrendingKeywordsProps) {
    return (
        <div className='paragraph-container'>
            <div className='flex flex-row gap-2 items-center'>
                <PageSubtitle pageSubtitle="Trending Keywords" />
                <InfoTooltip message='These are the top keywords that appear in the complaints.' />
                <AiTooltip message='The keywords are obtained using AI.' />
            </div>

            {
                (keywords.length === 0)
                ? <p>No keywords are found.</p>
                : <div className='flex flex-row gap-2 flex-wrap'>
                    {
                        keywords.map((keyword: string, index) => (
                            <div key={ index } className='rounded-full bg-yap-brown-100 px-4 py-1 w-fit text-yap-black-800'>
                                <p>{ keyword }</p>
                            </div>
                        ))
                    }
                </div>
                
                
                
              
            }
        </div>
    )
}
