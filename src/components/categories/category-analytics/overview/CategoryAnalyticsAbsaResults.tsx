import InfoTooltip from "@/components/common/others/InfoTooltip"
import PageSubtitle from "@/components/common/text/PageSubtitle"
import { AbsaResult } from "@/types/CategoryAnalytics"
import { capitaliseFirstLetter } from "@/utils/HelperFunctions"

/**
This component is used to display the ABSA results in the category analytics page.
*/
interface CategoryAnalyticsAbsaResultsProps {
    absaResults: AbsaResult[]
}


export default function CategoryAnalyticsAbsaResults({ absaResults }: CategoryAnalyticsAbsaResultsProps) {
    const positive_sentiment = "positive"
    const negative_sentiment = "negative"


    return (
        <div className='paragraph-container'>
            <div className='flex flex-row gap-2 items-center'>
                <PageSubtitle pageSubtitle="ABSA Results" />
                <InfoTooltip message='ABSA shows the sentiments of subtopics within the category, based on the complaints.' />
            </div>

            {
                (absaResults.length === 0)
                ? <p>No ABSA results are found.</p>
                : <div className='flex flex-row gap-8 flex-wrap'>
                    {
                        absaResults.map((result: AbsaResult) => (

                            <div key={ result.theme } className={`border-2 rounded-xl py-1 px-2 flex flex-col justify-start items-center h-[125px] w-[300px] space-y-4
                                ${
                                    result.sentiment === positive_sentiment
                                    ? 'border-yap-green-900'
                                    : result.sentiment === negative_sentiment
                                    ? 'border-yap-orange-900'
                                    : 'border-yap-brown-900'
                                }
                            `}>
                                <p className={`text-base font-bold ${ 
                                    result.sentiment === positive_sentiment
                                    ? 'text-yap-green-900'
                                    : result.sentiment === negative_sentiment
                                    ? 'text-yap-orange-900'
                                    : 'text-yap-brown-900'
                                }`}> { capitaliseFirstLetter(result.sentiment) }
                                </p>
                                <p className='text-xl text-yap-black-800 text-center'>{ result.theme }{ result.theme }</p>
                            </div>
                        ))
                    }
                </div> 
            }
        </div>
    )
}
