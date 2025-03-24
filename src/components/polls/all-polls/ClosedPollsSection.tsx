import PollCard from "../PollCard"
import PageSubtitle from "@/components/common/text/PageSubtitle"
import { Poll, PollStatusEnum } from "@/types/Poll"
import { API_BASE_URL_ADMIN_MANAGEMENT, POLLS_GET_MANY_ENDPOINT } from "@/constants/ApiRoutes"
import axios from "axios"
import { convertPollDocumentsToObjects } from "@/utils/DatabaseHelperFunctions"

/**
Represents a section within the all polls page that displays the closed polls.
*/
export default async function ClosedPollsSection() {
    const veryLargeNumber = 1000000

    //Function to fetch all closed polls
    const fetchAllClosedPolls = async() : Promise<Poll[]> => {
        try {
            const getPollsEndpoint = API_BASE_URL_ADMIN_MANAGEMENT  + POLLS_GET_MANY_ENDPOINT
            const ongoingPollsData = await axios.post(getPollsEndpoint, {
                "filter": {
                    "status": PollStatusEnum.Closed
                },
                "page_size": veryLargeNumber, //Fetch all
                "page_number": 1
            })
            const ongoingPolls = convertPollDocumentsToObjects(ongoingPollsData.data.documents)
            return ongoingPolls
        } catch (error) {
            return []
        }
        
    }

    let allClosedPolls : Poll[] = await fetchAllClosedPolls()

    return (
        <div className='flex flex-col space-y-6'>
            <PageSubtitle pageSubtitle='Closed Polls' />
            {
                (allClosedPolls.length === 0)
                ? <div className='text-base text-yap-black-800'>There are no closed polls.</div>
                : <div className='grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-rows-1 gap-x-4 gap-y-4'>
                    {allClosedPolls.map((poll) => (
                            <PollCard key={poll.id} pollToDisplay={poll} />
                    ))} 
                </div>
            }
        </div>
    )
}
