import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react";


/**
This component represents a tooltip that informs the user of some useful information.
*/

interface InfoTooltipProps {
    message: string
}



export default function InfoTooltip({ message }: InfoTooltipProps) {
    return (
        <TooltipProvider delayDuration={ 50 }>
            <Tooltip>
                <TooltipTrigger asChild>
                <Info className='w-5 h-5 stroke-yap-gray-900 duration-200 cursor-help'/>
                </TooltipTrigger>
                <TooltipContent className='bg-yap-brown-200 rounded-full'>
                <p className='font-afacad text-yap-black-800'>{ message }</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        
    );
};











