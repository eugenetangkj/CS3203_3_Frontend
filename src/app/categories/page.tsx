import ManageCategoriesTableAndButtons from "../../components/categories/manage-categories/ManageCategoriesTableAndButtons";
import { Metadata } from "next";
import PageTitle from "@/components/common/text/PageTitle";

/** 
Layout for viewing managing categories page where the authorities can view, add or delete categories.
*/
export const metadata: Metadata = {
    title: "Categories - Just Yap!",
    description: "View and manage categories for complaints",
};

export default function ManageCategoriesPage() {
    return (
        <div className="px-6 md:px-12 font-afacad mt-32 mb-8">
            <div className="flex flex-col space-y-8 sm:space-y-2">
                {/* Title */}
                <PageTitle pageTitle="Categories" />

                {/* Manage categories table and buttons */}
                <ManageCategoriesTableAndButtons />
            </div>
        </div>     
  );
}
