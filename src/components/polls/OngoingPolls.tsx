
import { ongoingPolls } from "@/constants/posts"
import { PollsSection } from "./PollsSection"

/**
Represents the ongoing polls section in Polls page
*/


//Function that calls API to fetch ongoing polls
//TODO: Need to differentiate ongoing polls between admin and citizen as they are different
//since citizens may have completed some polls albeit status is ongoing
const fetchOngoingPolls = async () => {
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
    return ongoingPolls
}


export function OngoingPolls() {
    return (
        <p>Ongoing Polls</p>
        // <PollsSection fetchPollsFromApi={ fetchOngoingPolls } pageTitle="Ongoing Polls" />
    )
}
