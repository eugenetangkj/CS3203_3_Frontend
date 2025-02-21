
import { pastCitizenPolls } from "@/constants/posts"
import { PollsSection } from "./PollsSection"

/**
Represents the section in polls page regarding the past polls that the citizen has participated in
*/


//Function that calls API to fetch past polls that the citizen has participated in
const fetchCitizenPastPolls = async () => {
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


export function CitizenPastPolls() {
    return (
        <PollsSection fetchPollsFromApi={ fetchCitizenPastPolls } pageTitle="Past Polls that You Participated In" />
    )
}
