import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


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
                    <p className='text-xl cursor-help'>🤖</p>
                </TooltipTrigger>
                <TooltipContent className='bg-yap-brown-200 rounded-full'>
                    <p className='font-afacad text-yap-black-800'>{ message }</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        
    );
};











