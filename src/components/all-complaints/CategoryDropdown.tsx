"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import { Category } from "@/types/Category"
import { useToast } from "@/hooks/use-toast"

/**
This component represents a dropdown for user to select the category to assign to a complaint
*/
interface CategoryDropdownProps {
    complaintId: string,
    allCategories: Category[],
    initialCategory: Category
}


export function CategoryDropdown({ complaintId, allCategories, initialCategory }: CategoryDropdownProps) {
    //States
    const [open, setOpen] = useState(false)
    const [currentCategory, setCurrentCategory] = useState<Category>(initialCategory)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    //Toast management
    const { toast } = useToast()


    //Updates the category of a given complaint
    const updateCategory = async (newCategoryName: string)  =>  {
        try {
            //Obtain and set the new category object for local state management
            setIsLoading(true)
            const newCategory : Category = allCategories.find(cat => cat.name === newCategoryName) || {id: "", name: "", colour: ""};
            setCurrentCategory(newCategory);
            setOpen(false);


            //TODO: Call API to update the complaint's category using complaintId and newCategory
            console.log(complaintId)


            //Display successful toast
            toast({
                variant: "success",
                description: "Category is successfully updated",
                duration: 3000
            })
        } catch (error) {
            //Display error toast
            console.log(error)
            toast({
                variant: "destructive",
                description: "There was a problem updating the category.",
                duration: 3000
            })
        } finally {
            //Clean up code
            setIsLoading(false)
        }
    };


    return (
        <Popover open={open} onOpenChange={setOpen}>
            
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[125px] md:w-[150px] xl:w-[200px] justify-between"
                    disabled={ isLoading }
                >
                    { currentCategory.name }
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[125px] md:w-[150px] xl:w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search category..." className="h-9 font-afacad" />
                    <CommandList>
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                        {allCategories.map((category) => (
                        <CommandItem
                            key={category.id}
                            value={category.name}
                            className='font-afacad text-yap-black-800'
                            onSelect={(newCategoryName) => { updateCategory(newCategoryName) }}>
                            { category.name }
                            <Check
                            className={cn(
                                "ml-auto",
                                currentCategory.id === category.id ? "opacity-100" : "opacity-0"
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
