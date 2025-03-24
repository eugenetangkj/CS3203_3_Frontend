import PollCard from "../PollCard"
import PageSubtitle from "@/components/common/text/PageSubtitle"
import { Poll, PollStatusEnum } from "@/types/Poll"
import { unpublishedPolls } from "@/constants/posts"
import Link from "next/link"
import { Plus } from "lucide-react"
import { API_BASE_URL_ADMIN_MANAGEMENT, POLLS_GET_MANY_ENDPOINT } from "@/constants/ApiRoutes"
import axios from "axios"
import { convertComplaintDocumentsToObjects, convertPollDocumentsToObjects } from "@/utils/DatabaseHelperFunctions"

/**
Represents a section within the all polls page that displays the unpublished polls, along with a button
that allows the admin to create a new poll.
*/
export default async function UnpublishedPollsSection() {
    const veryLargeNumber = 1000000

    //Function to fetch all unpublished polls
    const fetchAllUnpublishedPolls = async() : Promise<Poll[]> => {
        try {
            const getPollsEndpoint = API_BASE_URL_ADMIN_MANAGEMENT  + POLLS_GET_MANY_ENDPOINT
            const unpublishedPollsData = await axios.post(getPollsEndpoint, {
                "filter": {
                    "status": PollStatusEnum.Unpublished
                },
                "page_size": veryLargeNumber, //Fetch all
                "page_number": 1
            })
            const unpublishedPolls = convertPollDocumentsToObjects(unpublishedPollsData.data.documents)
            return unpublishedPolls
        } catch (error) {
            return []
        }
    }

    //TODO: Fetch all polls
    let allUnpublishedPolls : Poll[] = await fetchAllUnpublishedPolls()

    return (
        <div className='flex flex-col space-y-6'>
            <PageSubtitle pageSubtitle='Unpublished Polls' />
              
            {
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-rows-1 gap-x-4 gap-y-4'>
                    {allUnpublishedPolls.map((poll) => (
                            <PollCard key={poll.id} pollToDisplay={poll} />
                    ))}
                    <Link href="/polls/create-poll">
                        <button className='rounded-xl bg-transparent hover:bg-yap-brown-100 duration-200 p-4 h-full w-full shadow-none border-2 border-dashed border-yap-brown-900'>
                            <div className='text-yap-brown-900 flex flex-col space-y-2 justify-center items-center'>
                                <Plus className='w-12 h-12'/>
                                <h6 className='text-xl'>Create new poll</h6>
                            </div>
                        </button>
                    </Link>
                </div>
            }
        </div>
    )
}
