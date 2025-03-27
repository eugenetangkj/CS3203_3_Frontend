import { PollTemplate } from "@/types/Poll"
import { API_BASE_URL_ADMIN_MANAGEMENT } from "@/constants/ApiRoutes"
import axios from "axios"
import { POLL_TEMPLATES_GET_ALL_ENDPOINT } from "@/constants/ApiRoutes"
import { convertPollTemplateDocumentsToObjects } from "@/utils/DatabaseHelperFunctions"


//Function to fetch many poll templates
export const pollTemplatesGetAll = async () : Promise<PollTemplate[]> => {
    const getAllPollTemplatesEndpoint = API_BASE_URL_ADMIN_MANAGEMENT  + POLL_TEMPLATES_GET_ALL_ENDPOINT
    const pollTemplatesData = await axios.post(getAllPollTemplatesEndpoint)
    const pollTemplates = convertPollTemplateDocumentsToObjects(pollTemplatesData.data.documents)
    return pollTemplates
}