import PageTitle from "@/components/common/text/PageTitle";
import { ManageCategoriesTable } from "@/components/categories/ManageCategoriesTable";
import { getCategories } from "@/services/ServicesHelper";
/** 
Layout for managing categories page where the authorities can view, add or delete categories.
*/

export const metadata = {
    title: "Manage Categories - Just Yap!",
    description: "Manage the list of categories used for classifying complaints.",
};





export default async function ManageCategoriesPage() {
    const initialCategories = await getCategories();

  return (
    <div className="px-6 md:px-12 font-afacad mt-32 mb-8">
      <div className="flex flex-col space-y-8">

        {/* Title */}
        <PageTitle pageTitle="Manage Categories" />

        {/* Table of categories */}
        <ManageCategoriesTable initialCategories={initialCategories} />       
      </div>
    </div>
  );

}
