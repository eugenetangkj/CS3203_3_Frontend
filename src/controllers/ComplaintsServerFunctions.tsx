// "use server"
// import { API_BASE_URL_ADMIN_MANAGEMENT, COMPLAINTS_GET_COUNT_ENDPOINT, COMPLAINTS_GET_MANY_ENDPOINT } from "@/constants/ApiRoutes";
// import { Complaint } from "@/types/Complaint";
// import axios from "axios";
// import { convertComplaintDocumentsToObjects } from "@/utils/DatabaseHelperFunctions";


// //Fetch count
// export const complaintsGetCount = async (filter: object) => {
//     try {
//         const complaintsGetCountEndpoint = API_BASE_URL_ADMIN_MANAGEMENT + COMPLAINTS_GET_COUNT_ENDPOINT
//         const apiData = await axios.post(complaintsGetCountEndpoint, 
//             {
//                 "filter": filter
//             }
//         )
//         const count = apiData.data.count
//         return count
//     } catch (error) {
//         throw error
//     }
// };