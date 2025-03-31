import { Category } from "@/types/Category";
import Link from "next/link";


/**
This component allows the user to redirect to the analytics page for a given category. It is shown in the manage
categories table, under Actions.

*/



interface ViewCategoryAnalyticsButton {
    category: Category
}



export default function ViewCategoryAnalyticsButton({ category }: ViewCategoryAnalyticsButton) {
    return (
        <Link href={`/categories/${category.name}`} className='text-yap-brown-900 hover:text-yap-brown-800 duration-200 underline'>
            View Analytics
        </Link>
    );
};


