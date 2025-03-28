import { Skeleton } from "@/components/ui/skeleton";

/** 
Component for displaying a skeleton when poll cards are being fetched
*/
export default function PollCardsSkeleton() {
    return (
        <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-8 sm:space-y-0'>
            <Skeleton className="h-[200px] w-full sm:w-[400px] rounded-xl" />
            <Skeleton className="h-[200px] w-full sm:w-[400px] rounded-xl" />
        </div>
    )
}
