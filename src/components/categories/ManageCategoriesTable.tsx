"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Trash2Icon } from 'lucide-react';
 
import { useState } from "react"








export const ManageCategoriesTable = ({ initialCategories } : any) => {
  console.log(initialCategories)
  const [categoryColors, setCategoryColors] = useState(
    initialCategories.reduce((acc: Record<string, string>, category: any) => {
      acc[category.name] = category.colour || "#000000";
      return acc;
    }, {} as Record<string, string>)
  );

  const handleColorChange = (name: string, newColor: string) => {
    setCategoryColors((prev: any) => ({
      ...prev,
      [name]: newColor,
    }));
  };



  //TODO: Update delete category method
  const handleDelete = (name: string) => {
    // setCategories((prevCategories) => prevCategories.filter((category) => category.name !== name));
    console.log(`Deleted category: ${name}`);
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

        {/* Delete icon (Trash can icon) */}
        <TableCell>
          <Trash2Icon
            className="w-5 h-5 mx-auto cursor-pointer text-yap-gray-900 hover:text-red-400 duration-300"
            onClick={() => handleDelete(category.name)}
          />
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
      
    </Table>
  )
}
  