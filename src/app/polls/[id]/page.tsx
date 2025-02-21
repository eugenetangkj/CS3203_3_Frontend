import ViewPollComponent from "@/components/polls/ViewPollComponent";
import { allPolls } from "@/constants/posts";
import { Poll } from "@/types/Poll";


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


export default function ViewPoll() {
    //TODO: Determine user role by reading from context
    const userRole = "admin"


    //Function that makes API call to fetch the given post
    const fetchPollWithId = async (id: number) => {
        "use server"
        // const apiEndPoint = API_BASE_URL + '/' + GET_COMPLAINTS_GROUPED_BY_FIELD_ENDPOINT
        // const apiData = await axios.post(apiEndPoint,
        //     {
        //         "start_date": START_DATE,
        //         "end_date": getCurrentDateTime(),
        //         "group_by_field": "category"
        //     }
        // )
        // const complaintsGroupedByCategories = convertToArray(apiData.data.result)
        // return complaintsGroupedByCategories
        return allPolls.find(poll => poll.id === id) as Poll;
    }






    return (
        <div className="px-6 md:px-12 font-afacad mt-32 mb-8">
            <ViewPollComponent role={ userRole } fetchPollWithId={ fetchPollWithId } />
        </div>
    );
}
