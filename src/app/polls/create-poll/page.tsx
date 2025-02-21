import { ViewPollPage } from "@/components/polls/ViewPollPage";
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
        date_created: getCurrentDateTime(),
        date_published: "",
        date_closed: "",
        is_ai_generated: false,
        status: "unpublished"
    }
    

    return (
        <div className="px-6 md:px-12 font-afacad mt-32">
            <div className="flex flex-col space-y-12">
                <ViewPollPage currentPoll={ currentPoll } />
            </div>

            
        </div>
    );
}
