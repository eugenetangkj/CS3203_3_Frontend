import { Skeleton } from "@/components/ui/skeleton";


/** 
Component for displaying a skeleton when categories are being fetched
*/
export default function CategoriesTableSkeleton() {

    return (
        <>
        <Skeleton className="col-span-3 h-[20px]" />
        <Skeleton className="col-span-2 h-[20px]" />
        <Skeleton className="col-span-1 h-[20px]" />
        </>
    );

}
