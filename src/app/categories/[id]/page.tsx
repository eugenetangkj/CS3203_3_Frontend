import BackToPreviousButton from "@/components/common/navigation/BackToPreviousButton";
import CategoryAnalyticsBody from "@/components/categories/category-analytics/CategoryAnalyticsBody";

/** 
Layout for the page where the admin can view the analytics for a given category.
*/

export const metadata = {
    title: "View Category - Just Yap!",
    description: "View the analytics for a given category.",
};


export default async function ViewCategory({ params }: any) {
    const categoryName = decodeURIComponent((await params).id); 
    

    return (
        <div className="px-6 md:px-12 font-afacad mt-32 mb-8">
            <div className="flex flex-col space-y-4">
                {/* Back to all categories button */}
                <BackToPreviousButton text='Back to all categories' route='/categories' />

                {/* Category analytics body */}
                <CategoryAnalyticsBody categoryName={ categoryName } />
            </div>
        </div>
    );
}
