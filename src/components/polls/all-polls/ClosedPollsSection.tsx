import PollCard from "../PollCard"
import PageSubtitle from "@/components/common/text/PageSubtitle"
import { Poll } from "@/types/Poll"
import { closedPolls } from "@/constants/posts"

/**
Represents a section within the all polls page that displays the closed polls.
*/
export default async function ClosedPollsSection() {
    //Function to fetch all closed polls
    const fetchAllClosedPolls = async() : Promise<Poll[]> => {
        try {
            //TODO: Call the actual API
            return closedPolls
        } catch (error) {
            return []
        }
    }

    //TODO: Fetch all polls
    let allClosedPolls : Poll[] = await fetchAllClosedPolls()

    return (
        <div className='flex flex-col space-y-6'>
            <PageSubtitle pageSubtitle='Closed Polls' />
            {
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-rows-1 gap-x-4 gap-y-4'>
                    {allClosedPolls.map((poll) => (
                            <PollCard key={poll.id} pollToDisplay={poll} />
                    ))} 
                </div>
            }
        </div>
    )
}
