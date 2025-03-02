import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sparkles } from "lucide-react";


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
                <Sparkles className='w-7 h-7 fill-yap-yellow-900 stroke-yap-yellow-900'/>
                </TooltipTrigger>
                <TooltipContent className='bg-yap-brown-200 rounded-full'>
                <p className='font-afacad text-yap-black-800'>{ message }</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        
    );
};











