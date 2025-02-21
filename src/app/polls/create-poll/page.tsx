import { ViewPollAdminDetails } from "@/components/polls/ViewPollAdminDetails";
import { getCurrentDateTime } from "@/utils/HelperFunctions";


/** 
Layout for the create polls page
*/

export const metadata = {
    title: "Polls - Just Yap!",
    description: "Create a poll for citizens to share their perspectives on local issues.",
};


export default function CreatePollsPage() {
    //Always start with an empty current poll when the user manually creates a new poll
    const currentPoll = {
        id: -1,
        question: "",
        description: "",
        reasoning: "",
        type: "mcq", //Default to MCQ
        options: [],
        dateCreated: getCurrentDateTime(),
        datePublished: "",
        dateClosed: "",
        isAiGenerated: false,
        status: "unpublished"
    }
    

    return (
        <div className="px-6 md:px-12 font-afacad mt-32 mb-8">
            <div className="flex flex-col space-y-12">
                <ViewPollAdminDetails currentPoll={ currentPoll } />
            </div>

            
        </div>
    );
}
