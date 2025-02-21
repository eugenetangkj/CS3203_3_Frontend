import { OngoingPolls } from "@/components/polls/OngoingPolls";
import { CitizenPastPolls } from "@/components/polls/CitizenPastPolls";
import { ClosedPolls } from "@/components/polls/ClosedPolls";
import { UnpublishedPolls } from "@/components/polls/UnpublishedPolls";


/** 
Layout for the polls page which allows viewing, editing and participating in polls.
*/

export const metadata = {
    title: "Polls - Just Yap!",
    description: "Participate in polls to share your perspectives on local issues",
};


export default function PollsPage() {
    //TODO: We need to perform an API call or check context to determine what role the user is in. This tells us what blocks to render.


    return (
        <div className="px-6 md:px-12 font-afacad mt-32 mb-8">
            <div className="flex flex-col space-y-12">
                <OngoingPolls />
                <CitizenPastPolls />
                <ClosedPolls />
                <UnpublishedPolls />
            </div>
        </div>
    );
}
