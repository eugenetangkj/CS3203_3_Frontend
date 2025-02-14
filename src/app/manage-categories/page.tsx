import ManageCategoriesComponent from "./ManageCategoriesComponent";
import { Metadata } from "next";

/** 
Layout for managing categories page where the authorities can view, add or delete categories.
*/
export const metadata: Metadata = {
    title: "Manage Categories - Just Yap!",
    description: "Manage categories for complaints",
  };


export default function ManageCategoriesPage() {
    return (
        <ManageCategoriesComponent />
  );

}
