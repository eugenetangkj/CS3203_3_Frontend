"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"
import DeleteCategoryButton from "./DeleteCategoryButton";


export const ManageCategoriesTable = ({ initialCategories, fetchCategories }: {
    initialCategories: any[],
    fetchCategories: () => void
    }) => {


    const [categoryColors, setCategoryColors] = useState(
    initialCategories.reduce((acc: Record<string, string>, category: any) => {
        acc[category.name] = category.colour || "#0k0l00";
        return acc;
    }, {} as Record<string, string>)
    );

    const handleColorChange = (name: string, newColor: string) => {
        setCategoryColors((prev: any) => ({
        ...prev,
        [name]: newColor,
        }));
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
            {initialCategories.map((category: any) => (
                <TableRow key={category.name}>
                <TableCell className="text-base text-yap-black-800 pl-0">{category.name}</TableCell>

                {/* Color input field (color picker) */}
                <TableCell className="text-center">
                    <input
                    type="color"
                    value={categoryColors[category.name]}
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
  