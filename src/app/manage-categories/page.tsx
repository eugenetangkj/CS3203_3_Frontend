import ManageCategoriesTableAndButtons from "../../components/categories/ManageCategoriesTableAndButtons";
import { Metadata } from "next";
import PageTitle from "@/components/common/text/PageTitle";

/** 
Layout for managing categories page where the authorities can view, add or delete categories.
*/
export const metadata: Metadata = {
    title: "Manage Categories - Just Yap!",
    description: "Manage categories for complaints",
};

export default function ManageCategoriesPage() {
    return (
        <div className="px-6 md:px-12 font-afacad mt-32 mb-8">
            <div className="flex flex-col space-y-8 sm:space-y-2">
                {/* Title */}
                <PageTitle pageTitle="Manage Categories" />

                {/* Manage categories table and buttons */}
                <ManageCategoriesTableAndButtons />
            </div>
        </div>     
  );
}
