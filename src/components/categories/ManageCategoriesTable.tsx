import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DeleteCategoryButton from "./DeleteCategoryButton";
import { Category } from "@/types/Category";
import { ColourPicker } from "./ColourPicker";


/**
This component represents the table used in managing categories. It displays a list
of categories, allowing the authority to change the colours and delete the categories.
*/
interface ManageCategoriesTableProps {
    categories: Category[],
    fetchCategories: () => void
}


export const ManageCategoriesTable = ({ categories, fetchCategories }: ManageCategoriesTableProps) => {
    return (
        <Table>
            <TableHeader>
            <TableRow className='hover:bg-transparent font-bold text-yap-brown-900'>
                <TableHead className="text-yap-brown-900 font-bold text-lg pl-0">Category</TableHead>
                <TableHead className="text-yap-brown-900 font-bold text-lg text-center">Colour Code</TableHead>
                <TableHead className="text-yap-brown-900 font-bold text-lg text-center">Actions</TableHead>
            </TableRow>
            </TableHeader>

            <TableBody>
                {categories.map((category: Category) => (
                    <TableRow key={category.name}>
                    <TableCell className="text-base text-yap-black-800 pl-0">{category.name}</TableCell>

                    {/* Color input field (color picker) */}
                    <TableCell className="text-center">
                        <ColourPicker category={ category }/>
                    </TableCell>

                    {/* Delete icon wrapped in an alert dialog*/}
                    <TableCell className="text-center">
                        <DeleteCategoryButton title={ category.name } fetchCategories={ fetchCategories } />  
                    </TableCell>  
                    </TableRow>
                ))}
                </TableBody>       
        </Table>
        )
}
  