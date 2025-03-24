import PageTitle from "@/components/common/text/PageTitle";
import ProfileCards from "@/components/profile/ProfileCards";
import { User } from "@/types/User";
import { getUserOidValue } from "@/utils/AuthChecker";
import { API_BASE_URL_USER_MANAGEMENT, GET_PROFILE_BY_OID_ENDPOINT } from "@/constants/ApiRoutes";
import axios from "axios";
import { determineIsObjectEmpty } from "@/utils/HelperFunctions";


/** 
Layout for the view profile page.
*/

export const metadata = {
    title: "Profile - Just Yap!",
    description: "View your profile information",
};


export default async function Profile() {
    //Adapter function to convert API response to a User object
    const mapResponseToUser = (profileData: any): User => {
        return {
            id: profileData._id.$oid,
            email: profileData.email,
            name: profileData.name,
            role: profileData.role,
            collectibles: profileData.collectibles
        };
    };

    //Function to fetch the user information
    const fetchUser = async () => {
        try {
            //Determine the user oid from cookies
            const userOid = await getUserOidValue()
            if (userOid.length === 0) {
                return {}
            }

            //Fetch user data using oid value
            const fetchUserProfileApiEndpoint = API_BASE_URL_USER_MANAGEMENT  + GET_PROFILE_BY_OID_ENDPOINT
            const userData = await axios.post(fetchUserProfileApiEndpoint,
                {
                    "oid": userOid
                }
            )
            const currentUser = mapResponseToUser(userData.data)
            return currentUser

        } catch (error) {
            return {}
        }
    }


    //Get user information
    const currentUser = await fetchUser()
    

    return (
        <div className="px-6 md:px-12 font-afacad mt-32 mb-8">
            <div className="flex flex-col space-y-8">
                {/* Title */}
                <PageTitle pageTitle="Profile" />
                {
                    determineIsObjectEmpty(currentUser)
                    ? <div>Something went wrong. Please try again later.</div>
                    : <ProfileCards currentUser={ currentUser as User } />
                }
            </div>
        </div>
    );
}
