import PollCard from "../PollCard"
import PageSubtitle from "@/components/common/text/PageSubtitle"
import { PollTemplate } from "@/types/Poll"
import { pollTemplatesHardCodedData } from "@/constants/posts"
import InfoTooltip from "@/components/common/others/InfoTooltip"

/**
Represents a section within the all polls page that displays the existing poll templates
*/
export default async function PollTemplatesSection() {
    //Function to fetch all poll templates
    const fetchAllPollTemplates = async() : Promise<PollTemplate[]> => {
        try {
            //TODO: Call the actual API
            return pollTemplatesHardCodedData
        } catch (error) {
            return []
        }
    }

    //TODO: Fetch all poll templates
    let pollTemplates : PollTemplate[] = await fetchAllPollTemplates()

    return (
        <div className='flex flex-col space-y-6'>
            <div className='flex flex-row gap-2 items-center'>
                <PageSubtitle pageSubtitle='Poll Templates' />
                <InfoTooltip message='We analyse past complaints and leverage AI to generate poll templates.' />
            </div>
  
            
            {
                pollTemplates.length === 0
                ? <div className='text-yap-black-800'>There is no poll template.</div>
                :  <div className='grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-rows-1 gap-x-4 gap-y-4'>
                        {pollTemplates.map((pollTemplate) => (
                            <PollCard key={pollTemplate.id} pollToDisplay={pollTemplate} />
                        ))}
                   </div>
            }
        </div>
    )
}
