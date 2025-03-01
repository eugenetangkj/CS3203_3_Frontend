import PageTitle from "@/components/common/text/PageTitle";
import ProfileCards from "@/components/profile/ProfileCards";


/** 
Layout for the sign up page for new users to create an account
*/

export const metadata = {
    title: "Profile - Just Yap!",
    description: "View your profile information",
};


export default function Profile() {
    return (
        <div className="px-6 md:px-12 font-afacad mt-32 mb-8">
            <div className="flex flex-col space-y-8">
                {/* Title */}
                <PageTitle pageTitle="Profile" />

                {/* Profile information */}
                <ProfileCards />
            </div>
        </div>
    );
}
