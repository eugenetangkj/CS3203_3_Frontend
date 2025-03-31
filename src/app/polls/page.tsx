import Image from "next/image";
import YappyWitch from "../../../public/graphics/yappy-witch.svg";
import AllPollsBody from "@/components/polls/all-polls/AllPollsBody";

/** 
Layout for the polls page which allows viewing, editing and participating in polls.
*/

export const metadata = {
    title: "Polls - Just Yap!",
    description: "Participate in polls to share your perspectives on local issues",
};


export default async function PollsPage() {
    return (
        <div className="px-6 md:px-12 font-afacad mt-32 flex flex-col flex-grow justify-between">
            <AllPollsBody />

            {/* Duck image */}
            <Image src={YappyWitch} alt="Yappy Witch creating data insights from complaints" className="self-end w-56 h-56 2xl:w-64 2xl:h-64 mx-auto mt-16" />
          
        </div>
    );
}
