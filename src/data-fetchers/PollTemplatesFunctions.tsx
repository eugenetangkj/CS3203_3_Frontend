import { PollTemplate } from "@/types/Poll"
import { API_BASE_URL_ADMIN_MANAGEMENT } from "@/constants/ApiRoutes"
import axios from "axios"
import { POLL_TEMPLATES_GET_ALL_ENDPOINT, POLL_TEMPLATES_GET_BY_OID_ENDPOINT } from "@/constants/ApiRoutes"
import { convertPollTemplateDocumentsToObjects, convertPollTemplateDocumentToObject } from "@/utils/DatabaseHelperFunctions"


//Function to fetch many poll templates
export const pollTemplatesGetAll = async () : Promise<PollTemplate[]> => {
    try {
        const getAllPollTemplatesEndpoint = API_BASE_URL_ADMIN_MANAGEMENT  + POLL_TEMPLATES_GET_ALL_ENDPOINT
        const pollTemplatesData = await axios.post(getAllPollTemplatesEndpoint)
        const pollTemplates = convertPollTemplateDocumentsToObjects(pollTemplatesData.data.documents)
        return pollTemplates
    } catch (error) {
        return []
    }
}

//Function to retrieve a poll template
export const pollTemplateGetByOid = async (oid: string) : Promise<PollTemplate> => {
    try {
          const getPollTemplateEndpoint = API_BASE_URL_ADMIN_MANAGEMENT  + POLL_TEMPLATES_GET_BY_OID_ENDPOINT
          const pollTemplateData = await axios.post(getPollTemplateEndpoint, {
              "oid": oid
          })
          const pollTemplate = convertPollTemplateDocumentToObject(pollTemplateData.data.document)
          return pollTemplate

    } catch (error) {
        return  {
            id: '',
            question: '',
            category: '',
            reasoning: '',
            question_type: '',
            options: [],
            date_created: ''
        }
    }
}