import PageTitle from "@/components/common/text/PageTitle";
import ProfileCards from "@/components/profile/ProfileCards";
import { User, UserRoleEnum } from "@/types/User";
import { getUserProfile } from "@/controllers/UsersController";


/** 
Layout for the view profile page. We perform server-side rendering because there is no user interactions.
*/

export const metadata = {
    title: "Profile - Just Yap!",
    description: "View your profile information",
};


export default async function Profile() {
    //Function to fetch the user information
    const fetchUser = async () => {
        try {
           const currentUser =  (await getUserProfile()) as User; 
           return currentUser 
        } catch (error) {
            return {
                id: '',
                email: '',
                name: '',
                role: UserRoleEnum.None,
                collectibles: []
            }
        };
    }
    

    const currentUser = await fetchUser()
   
    return (
        <div className="px-6 md:px-12 font-afacad mt-32 mb-8">
            <div className="flex flex-col space-y-8">
                {/* Title */}
                <PageTitle pageTitle="Profile" />
                {
                    currentUser.role === UserRoleEnum.None
                    ? <div>Something went wrong. Please try again later.</div>
                    : <ProfileCards currentUser={ currentUser as User } />
                }
            </div>
        </div>
    );
}