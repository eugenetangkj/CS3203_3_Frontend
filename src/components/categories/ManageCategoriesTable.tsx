import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DeleteCategoryButton from "./DeleteCategoryButton";
import { Category } from "@/types/Category";


/**
This component represents the table used in managing categories
 */

export const ManageCategoriesTable = ({ categories, setCategories, fetchCategories }: {
    categories: Category[],
    setCategories: (newCategories: any) => void,
    fetchCategories: () => void
    }) => {


    const handleColorChange = (name: string, newColor: string) => {
        setCategories((prevCategories : any) =>
            prevCategories.map((category: Category) =>
            category.name === name ? { ...category, colour: newColor } : category
            )
        );
    };
          


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
            {categories.map((category: any) => (
                <TableRow key={category.name}>
                <TableCell className="text-base text-yap-black-800 pl-0">{category.name}</TableCell>

                {/* Color input field (color picker) */}
                <TableCell className="text-center">
                    <input
                    type="color"
                    value={category.colour}
                    onChange={(e) => handleColorChange(category.name, e.target.value)}
                    className="border px-2 py-1 rounded-full w-24"
                    />
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
  