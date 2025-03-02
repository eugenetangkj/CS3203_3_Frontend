import { Category } from "@/types/Category";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChartLine } from "lucide-react";


/**
This component allows the user to redirect to the analytics page for a given category. It is shown in the manage
categories table, under Actions.

*/



interface ViewCategoryAnalyticsButton {
    category: Category
}



export default function ViewCategoryAnalyticsButton({ category }: ViewCategoryAnalyticsButton) {
    return (
        <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <a href={`/categories/${category.name}`}>
                    <ChartLine className='text-yap-green-900 cursor-pointer hover:text-yap-green-800 duration-200' />
                </a>
            </TooltipTrigger>
            <TooltipContent className='bg-yap-brown-200 rounded-full'>
                <p className='font-afacad text-yap-black-800'>View category analytics</p>
            </TooltipContent>
        </Tooltip>
        </TooltipProvider>
    );
};


