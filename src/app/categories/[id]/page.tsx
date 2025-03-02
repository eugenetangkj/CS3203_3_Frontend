import Link from "next/link";
import { MoveLeft } from "lucide-react";
import BackToPreviousButton from "@/components/common/navigation/BackToPreviousButton";
import PageTitle from "@/components/common/text/PageTitle";
import CategoryAnalyticsBody from "@/components/categories/CategoryAnalytics/CategoryAnalyticsBody";

/** 
Layout for the page where the admin can view the analytics for a given category.
*/

export const metadata = {
    title: "View Category - Just Yap!",
    description: "View the analytics for a given category.",
};


export default function ViewCategory() {
    

    return (
        <div className="px-6 md:px-12 font-afacad mt-32 mb-8">
            <div className="flex flex-col space-y-4">
                {/* Back to all categories button */}
                <BackToPreviousButton text='Back to all categories' route='/categories' />

                {/* Category analytics body */}
                <CategoryAnalyticsBody />
            </div>
        </div>
    );
}
