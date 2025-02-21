import { Poll } from "@/types/Poll";
import { COLOUR_MAP } from "@/constants/ColourMap";
import { Sparkles } from "lucide-react";
import { capitaliseFirstLetter as capitaliseFirstLetter } from "@/utils/HelperFunctions";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


/**
This component represents a card that displays a poll in the polls page. It contains the post's question, description,
question type, date and whether it is AI-generated.
*/
interface PollCardProps {
    poll: Poll
}
 
export default function PollCard({ poll }: PollCardProps) {

    // Determine date string to display
    const dateStringToDisplay =  poll.status == "published"
                                 ? "Date published: " + poll.date_published 
                                 : poll.status == "closed"
                                 ? "Date closed: " + poll.date_closed
                                 : "Date created:" + poll.date_created


    // Return component
    return (
        <a href="#">
            <div className='flex flex-col space-y-4 justify-between rounded-xl bg-yap-gray-100 hover:bg-yap-brown-100 duration-200 p-4 h-full'>
                <div className='flex flex-col space-y-4'>
                    <div className='space-y-2'>
                        {/* Question */}
                        <h6 className='text-yap-brown-900 text-xl sm:text-2xl line-clamp-2 overflow-hidden'>{ poll.question }</h6>

                        {/* Question Type */}
                        <div className='rounded-full  text-white w-fit px-4 py-0.25 text-sm' style={{
                            backgroundColor: poll.type === "mcq"
                                             ? COLOUR_MAP["yap-green-900"]
                                             : poll.type == "open-ended"
                                             ? COLOUR_MAP["yap-orange-900"]
                                             : COLOUR_MAP["yap-brown-900"]
                        }}>{ capitaliseFirstLetter(poll.type) }</div>
                    </div>

                    {/* Description */}
                    <p className='text-yap-black-800 line-clamp-2 overflow-hidden'>{ poll.description }</p>
                </div>


                <div className='flex flex-row items-center justify-between'>
                    {/* Date posted */}
                    <p className='text-yap-brown-900'>{ dateStringToDisplay }</p>

                    {/* AI-generated status */}
                    {
                        (poll.is_ai_generated)
                        ? <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                <Sparkles className='w-8 h-8 fill-yap-yellow-900 stroke-yap-yellow-900'/>
                                </TooltipTrigger>
                                <TooltipContent className='bg-yap-brown-900 rounded-full'>
                                <p className='font-afacad text-white'>This poll is AI-generated.</p>
                                </TooltipContent>
                            </Tooltip>
                           </TooltipProvider>
                        : <></>
                    }
                  
                    
                </div>

            </div>
        </a>

    );
}