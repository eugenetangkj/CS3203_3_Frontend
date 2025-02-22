import { Skeleton } from "@/components/ui/skeleton";


/** 
Component for displaying a skeleton when complaints are being fetched
*/
export default function ComplaintsTableSkeleton() {
    const numberOfRows = 6

    return (
        <div className='flex flex-col space-y-8'>
            <div className='flex flex-col space-y-4'>
                {/* Search bar and filter */}
                <Skeleton className="w-full max-w-md md:max-w-xl h-[40px] rounded-full" />
                <Skeleton className="w-[200px] h-[35px]" />
            </div>
            <div className='flex flex-col space-y-4'>
                {/* Table */}
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
        </div>
    );

}
