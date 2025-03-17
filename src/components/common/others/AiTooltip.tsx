import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Bot } from "lucide-react";


/**
This component represents a tooltip that informs the user that something is AI-generated,
such as polls.

*/



interface AiTooltipProps {
    message: string
}



export default function AiTooltip({ message }: AiTooltipProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                <p className='text-xl cursor-default cursor-help'>🤖</p>
                {/* <Bot className='w-7 h-7  stroke-yap-orange-900 hover:stroke-yap-orange-800'/> */}
                </TooltipTrigger>
                <TooltipContent className='bg-yap-brown-200 rounded-full'>
                <p className='font-afacad text-yap-black-800'>{ message }</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        
    );
};











