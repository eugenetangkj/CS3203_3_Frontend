import { Skeleton } from "@/components/ui/skeleton";


/** 
Component for displaying a skeleton when complaints are being fetched
*/
export default function ComplaintsTableSkeleton() {
    const numberOfRows = 6

    return (
        <div className='flex flex-col space-y-4'>
            {Array.from({ length: numberOfRows }).map((_, index) => (
                <div key={index} className="grid grid-cols-12 gap-4">
                    <Skeleton className="col-span-1 h-[20px]" />
                    <Skeleton className="col-span-2 h-[20px]" />
                    <Skeleton className="col-span-3 h-[20px]" />
                    <Skeleton className="col-span-2 h-[20px]" />
                    <Skeleton className="col-span-2 h-[20px]" />
                    <Skeleton className="col-span-2 h-[20px]" />
                </div>
            ))}
        </div>
    );

}
