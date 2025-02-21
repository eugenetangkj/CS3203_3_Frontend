import { Skeleton } from "@/components/ui/skeleton";


/** 
Component for displaying a skeleton when poll cards are being loaded
*/
export default function PollsSkeleton() {
    return (
        <div className='flex flex-col space-y-4 space-x-0 sm:flex-row sm:space-x-4 sm:space-y-0'>
        <Skeleton className="w-[300px] h-[150px] rounded-xl" />
        <Skeleton className="w-[300px] h-[150px] rounded-xl" />
      
        </div>
    );

}
