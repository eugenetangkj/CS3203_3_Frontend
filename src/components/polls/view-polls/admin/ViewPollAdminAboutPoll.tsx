import { Poll } from "@/types/Poll"
import PageSubtitle from "@/components/common/text/PageSubtitle"


/**
Represents the poll information that the admin views for each poll. It is uneditable.
*/
interface ViewPollAdminAboutPollProps {
    currentPoll: Poll,
}

export function ViewPollAdminAboutPoll({ currentPoll }: ViewPollAdminAboutPollProps) {
    return (
        <div className='flex flex-col space-y-4'>
            <PageSubtitle pageSubtitle="About Poll" />
            <div className='text-base text-yap-black-800 flex flex-col space-y-4'>
                <p><span className='text-yap-brown-900 text-lg'>Status:</span><br/>{ currentPoll.status }</p>
                { currentPoll.date_created !== null && <p><span className='text-yap-brown-900 text-lg'>Date created</span><br/>{ currentPoll.date_created }</p> }
                { currentPoll.date_published !== null && <p><span className='text-yap-brown-900 text-lg'>Date published:</span><br/>{ currentPoll.date_published }</p>}
                { currentPoll.date_closed !== null && <p><span className='text-yap-brown-900 text-lg'>Date closed:</span><br/>{ currentPoll.date_closed }</p>}
            </div>
           
        </div> 
    )
}
