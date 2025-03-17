import { Poll } from "@/types/Poll"
import PageSubtitle from "@/components/common/text/PageSubtitle"


/**
Represents the responses for the polls that the admin views for each published or closed polls.
*/
interface ViewPollAdminResponsesProps {
    currentPoll: Poll,
}

export function ViewPollAdminResponses({ currentPoll }: ViewPollAdminResponsesProps) {
    return (
        <div className='flex flex-col space-y-4'>
            <PageSubtitle pageSubtitle="Poll Responses" />
            <div className='text-base text-yap-black-800 flex flex-col space-y-4'>
                <p>Currenltly a work in progress... 🚧</p>
            </div>
           
        </div> 
    )
}
