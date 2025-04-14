import { ViewPollAdmin } from "@/components/polls/view-polls/admin/ViewPollAdmin";
import { PollQuestionTypeEnum, PollStatusEnum } from "@/types/Poll";

/** 
Layout for the create polls page
*/
export const metadata = {
    title: "Polls - Just Yap!",
    description: "Create a poll for citizens to share their perspectives on local issues.",
    viewport: 'width=device-width, initial-scale=1',
};

export default function CreatePollsPage() {
    //Always start with an empty current poll when the user manually creates a new poll
    const emptyPoll = {
        id: "-1",
        question: "",
        category: "",
        question_type: PollQuestionTypeEnum.MCQ, //Default to MCQ
        options: [],
        date_created: null,
        date_published: null,
        date_closed: null,
        status: PollStatusEnum.Unpublished //New polls are unpublished
    }
    
    return (
        <div className="px-6 md:px-12 font-afacad mt-32 mb-8">
            <div className="flex flex-col space-y-12">
                <ViewPollAdmin currentPoll={ emptyPoll }/>
            </div>
        </div>
    );
}
