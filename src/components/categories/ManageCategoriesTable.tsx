"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { Trash2Icon } from 'lucide-react';
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import DeleteCategoryButton from "./DeleteCategoryButton";


export const ManageCategoriesTable = ({ initialCategories } : any) => {



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


  //Toast management
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false);



  //TODO: Update delete category method
  //Might want to consider using an id instead of a name
  const handleDelete = (name: string) => {
    try {


      //Show successful toast
      toast({
        description: "Category is successfully deleted.",
      })

    } catch (error) {


      //Show error toast
      toast({
        variant: "destructive",
        description: "There was a problem deleting the category.",
      })
    } finally {

      //Closes the dialog
      setIsDialogOpen(false);
      
    }




















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
          <DeleteCategoryButton title={ category.name } />  
        </TableCell>  
      </TableRow>
    ))}
  </TableBody>
      
    </Table>
  )
}
  