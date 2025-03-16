
import { pastCitizenPolls } from "@/constants/posts"
import { PollsSection } from "./PollsSection"

/**
Represents the section in polls page regarding the closed polls from admin's perspective.
*/


//Function that calls API to fetch closed polls from admin's perspective
const fetchClosedPolls = async () => {
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
    return pastCitizenPolls
}


export function ClosedPolls() {
    return (
        <p>Ongoing polls</p>
        // <PollsSection fetchPollsFromApi={ fetchClosedPolls } pageTitle="Closed Polls" />
    )
}
