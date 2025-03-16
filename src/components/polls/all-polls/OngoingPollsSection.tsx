import PollCard from "../PollCard"
import PageSubtitle from "@/components/common/text/PageSubtitle"
import { Poll } from "@/types/Poll"
import { ongoingPolls } from "@/constants/posts"

/**
Represents a section within the all polls page that displays the ongoing polls
*/
export default async function OngoingPollsSection() {
    //Function to fetch all ongoing polls
    const fetchAllOngoingPolls = async() : Promise<Poll[]> => {
        try {
            //TODO: Call the actual API
            return ongoingPolls
        } catch (error) {
            return []
        }
    }

    //TODO: Fetch all ongoing polls
    let allOngoingPolls : Poll[] = await fetchAllOngoingPolls()

    return (
        <div className='flex flex-col space-y-6'>
            <PageSubtitle pageSubtitle='Ongoing Polls' />
            {
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-rows-1 gap-x-4 gap-y-4'>
                    {allOngoingPolls.map((poll) => (
                        <PollCard key={poll.id} pollToDisplay={poll} />
                    ))} 
                </div>
            }
        </div>
    )
}
