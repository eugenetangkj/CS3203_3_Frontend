import { ViewPollAdmin } from "@/components/polls/view-polls/admin/ViewPollAdmin";
import ViewPollComponent from "@/components/polls/ViewPollComponent";
import { allPolls } from "@/constants/posts";
import { Poll } from "@/types/Poll";
import { determineIsUserAdmin } from "@/utils/AuthChecker";


/** 
Layout for the dynamic page which allows admin and citizens to view a given poll. The specific
layout depends on:

1. For admin, depends on the status of the poll..
2. For citizen, depends on whether he has already completed the poll or not.
*/

export const metadata = {
    title: "Polls - Just Yap!",
    description: "View a poll",
};


export default async function ViewPoll({ params }: any) {
    // Determine which poll is the user trying to view
    const { id } = await params

    //Determine if the user is an admin
    const isUserAdmin = await determineIsUserAdmin()


    //TODO: Fetch the given poll
    const fetchPoll = async() => {
        // const apiData = apiFetcherPost('', {}) //TODO: Update the endpoint with appropriate arguments

        // if (determineIsObjectEmpty(apiData)) {
        //     //Cannot fetch API
        //     return null
        // }

        //TODO: Process the API data. If got error, return null
        return allPolls[id]
    }

    const poll = await fetchPoll()




    return (
        <div className="px-6 md:px-12 font-afacad mt-32 mb-8">
            {
                poll == null
                ? <div className='text-yap-black-800 text-base'>Something went wrong. We could not fetch the poll.</div>
                : !isUserAdmin
                ? <></>
                : <ViewPollAdmin currentPoll={ poll } />
            }
         
        </div>
    );
}
