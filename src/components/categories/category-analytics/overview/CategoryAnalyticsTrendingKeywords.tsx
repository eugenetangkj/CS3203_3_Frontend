import PageSubtitle from "@/components/common/text/PageSubtitle"
import AiTooltip from "@/components/common/others/AiTooltip"

/**
This component is used to display the trending keywords of a given category
in the category analytics page.
*/
interface CategoryAnalyticsTrendingKeywordsProps {
    keywords: string[]
}


export default function CategoryAnalyticsTrendingKeywords({ keywords }: CategoryAnalyticsTrendingKeywordsProps) {
    return (
        <div className='paragraph-container'>
            <PageSubtitle pageSubtitle="Trending Keywords" />
            
            {
                (keywords.length === 0)
                ? <p>No keywords are found.</p>
                : <div className='flex flex-row gap-2 flex-wrap'>
                    {
                        keywords.map((keyword: string) => (
                            <div key={keyword} className='rounded-full bg-yap-green-900 px-4 py-1 w-fit text-white'>
                                <p>{ keyword }</p>
                            </div>
                        ))
                    }
                </div>
                
                
                
              
            }
        </div>
    )
}
