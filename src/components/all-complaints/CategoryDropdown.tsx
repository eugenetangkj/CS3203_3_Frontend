"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import { Category } from "@/types/Category"



const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

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


    return (
        <Popover open={open} onOpenChange={setOpen}>
            
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    { currentCategory.name }
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[200px] p-0">
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
                            onSelect={(selectedCategory) => {
                                // Find the category object based on the selected name
                                const selectedCategoryObj = allCategories.find(cat => cat.name === selectedCategory);
                                //TODO: Update again
                                setCurrentCategory(selectedCategoryObj || {id: "", name: "", colour: ""});  // Set the whole category object
                                setOpen(false);
                            }}
                        >
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
