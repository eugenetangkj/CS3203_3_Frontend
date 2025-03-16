
import { unpublishedPolls } from "@/constants/posts"
import { PollsSection } from "./PollsSection"

/**
Represents the section in polls page regarding the unpublished polls from admin's perspective.
*/


//Function that calls API to fetch unpublished polls from admin's perspective
const fetchUnpublishedPolls = async () => {
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
    return unpublishedPolls
}


export function UnpublishedPolls() {
    return (
        <p>Unpublished polls</p>
        // <PollsSection fetchPollsFromApi={ fetchUnpublishedPolls } pageTitle="Unpublished Polls" />
    )
}
