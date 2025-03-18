import AiTooltip from "@/components/common/others/AiTooltip"
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
                <InfoTooltip message='ABSA shows the sentiments of themes that emerged within the category, based on the complaints.' />
                <AiTooltip message='The ABSA results are AI-generated.' />
            </div>

            {
                (absaResults.length === 0)
                ? <p>No ABSA results are found.</p>
                : <div className='flex flex-row gap-2 flex-wrap'>
                    {
                        absaResults.map((result: AbsaResult, index) => (

                            <div key={ index } className={`border-none rounded-xl px-4 py-2 flex flex-col justify-start items-center w-fit space-y-2
                                ${
                                    result.sentiment === positive_sentiment
                                    ? 'bg-yap-green-50'
                                    : result.sentiment === negative_sentiment
                                    ? 'bg-yap-orange-50'
                                    : 'bg-yap-yellow-50'
                                }
                            `}>
                                <p className={`text-sm font-bold ${ 
                                    result.sentiment === positive_sentiment
                                    ? 'text-yap-green-900'
                                    : result.sentiment === negative_sentiment
                                    ? 'text-yap-orange-900'
                                    : 'text-yap-brown-900'
                                }`}> { capitaliseFirstLetter(result.sentiment) }
                                </p>
                                <p className='text-base text-yap-black-800 text-center'>{ result.theme }</p>
                            </div>
                        ))
                    }
                </div> 
            }
        </div>
    )
}
