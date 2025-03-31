"use client"

import { useState } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import { Filter, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Category } from "@/types/Category"
import { cn } from "@/lib/utils"
import { ALL_CATEGORIES_CATEGORY, ALL_CATEGORIES_NAME, ALL_CATEGORIES_ID } from "@/constants/Constants"


/**
This component represents the category filter that allows users to select a category and filter complaints
according to the selected category
*/
interface CategoryFilterProps {
    allCategories: Category[],
    categorySelected: Category,
    handleCategoryChange: (category: Category) => void
}


export default function CategoryFilter({ allCategories, categorySelected, handleCategoryChange }: CategoryFilterProps) {
    //States
    const [open, setOpen] = useState(false)


    //Function that runs when the user selects a category to filter by
    const filterByCategory = async (newCategoryName: string)  =>  {
        //Set the new category
        if (newCategoryName === ALL_CATEGORIES_NAME) {
            handleCategoryChange(ALL_CATEGORIES_CATEGORY)
        } else {
            const newCategory = allCategories.find(category => category.name === newCategoryName) || ALL_CATEGORIES_CATEGORY
            handleCategoryChange(newCategory)
        }
    };


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[125px] md:w-[150px] xl:w-[200px] justify-between bg-white hover:bg-yap-brown-100 border-yap-brown-200 duration-200"
                >
                    { categorySelected.name }
                    <Filter className="opacity-50 text-yap-brown-900 fill-yap-brown-900" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[125px] md:w-[150px] xl:w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search category..." className="h-9 font-afacad" />
                    <CommandList>
                    <CommandEmpty className='font-afacad text-yap-black-800 pl-3 py-4 text-sm'>No category found.</CommandEmpty>
                    <CommandGroup>
                        {/* All Categories Option */}
                        <CommandItem
                            key={-1}
                            value={ ALL_CATEGORIES_NAME }
                            className='font-afacad text-yap-black-800'
                            onSelect={ (newCategoryName) => { filterByCategory(newCategoryName) } }>
                            All Categories
                            <Check
                            className={cn(
                                "ml-auto",
                                categorySelected.id === ALL_CATEGORIES_ID ? "opacity-100" : "opacity-0"
                            )}
                            />
                        </CommandItem>


                        {/* Other Categories */}
                        {allCategories.map((category) => (
                            <CommandItem
                                key={category.id}
                                value={category.name}
                                className='font-afacad text-yap-black-800'
                                onSelect={ (newCategoryName) => { filterByCategory(newCategoryName) } }>
                                { category.name }
                                <Check
                                className={cn(
                                    "ml-auto",
                                    categorySelected.id === category.id ? "opacity-100" : "opacity-0"
                                )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
    </Popover>
        
  )
}
