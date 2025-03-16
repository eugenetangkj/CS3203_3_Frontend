import { OngoingPolls } from "@/components/polls/OngoingPolls";
import { ClosedPolls } from "@/components/polls/ClosedPolls";
import Image from "next/image";
import YappyWitch from "../../../public/graphics/yappy-witch.svg";
import { determineIsUserAdmin } from "@/utils/HelperFunctions";
import PollTemplatesSection from "@/components/polls/all-polls/PollTemplatesSection";
import UnpublishedPollsSection from "@/components/polls/all-polls/UnpublishedPollsSection";


/** 
Layout for the polls page which allows viewing, editing and participating in polls.
*/

export const metadata = {
    title: "Polls - Just Yap!",
    description: "Participate in polls to share your perspectives on local issues",
};


export default async function PollsPage() {
    //Determine if the user is an admin to know which blocks to render
    const isUserAdmin = await determineIsUserAdmin()

    return (
        <div className="px-6 md:px-12 font-afacad mt-32">
            <div className="flex flex-col space-y-12">
                <OngoingPolls />
                <ClosedPolls />
                { isUserAdmin ? <UnpublishedPollsSection /> : null}
                { isUserAdmin ? <PollTemplatesSection /> : null}
            </div>

            {/* Duck image */}
            <Image src={YappyWitch} alt="Yappy Witch creating data insights from complaints" className="self-center w-56 h-56 sm:w-64 sm:h-64 mx-auto mt-16" />
        </div>
    );
}
