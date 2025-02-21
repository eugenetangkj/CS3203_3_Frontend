import PageTitle from "@/components/common/text/PageTitle";
import { OngoingPolls } from "@/components/polls/OngoingPolls";


/** 
Layout for the polls page which allows viewing, editing and participating in polls.
*/

export const metadata = {
    title: "Polls - Just Yap!",
    description: "Participate in polls to share your perspectives on local issues",
};


export default function PollsPage() {




  return (
    <div className="px-6 md:px-12 font-afacad mt-32 mb-8">
      <div className="flex flex-col space-y-8">

        {/* Title */}
        {/* <PageTitle pageTitle="Polls" /> */}

        {/* Polls Information */}
        <div>
            {/* Ongoing polls */}
            <OngoingPolls />
        </div>
        

      
   
             
                
      </div>
    </div>
  );

}
