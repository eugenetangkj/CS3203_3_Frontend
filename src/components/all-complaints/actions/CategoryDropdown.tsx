"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import { Category } from "@/types/Category"
import { useToast } from "@/hooks/use-toast"
import { Complaint } from "@/types/Complaint"
import { complaintsUpdateByOid } from "@/data-fetchers/ComplaintsFunctions"
import { ApiResponseStatus } from "@/types/ApiResponse"
import { useRefreshComplaints } from "@/hooks/use-refresh-complaints"
import { EMPTY_CATEGORY } from "@/constants/Constants"

/**
This component represents a dropdown for user to select the category to assign to a complaint
*/
interface CategoryDropdownProps {
    readonly complaint: Complaint,
    readonly allCategories: Category[],
    readonly initialCategory: Category | null
}


export function CategoryDropdown({ complaint, allCategories, initialCategory }: CategoryDropdownProps) {
    //States
    const [open, setOpen] = useState(false)
    const [currentCategory, setCurrentCategory] = useState<Category>(initialCategory || EMPTY_CATEGORY)
    const [isSettingCategory, setIsSettingCategory] = useState<boolean>(false)

    //Toast management
    const { toast } = useToast()

    //Hooks
    const refreshAllComplaints = useRefreshComplaints();


    //Updates the category of a given complaint
    const updateCategory = async (newCategoryName: string)  =>  {
        setIsSettingCategory(true)

        //Obtain and set the new category object for local state management
        const newCategory : Category = allCategories.find(cat => cat.name === newCategoryName) || EMPTY_CATEGORY;
        setCurrentCategory(newCategory);
        setOpen(false);

        //Call API update the complaint's category using complaintId and newCategory
        const apiResponse = await complaintsUpdateByOid(complaint.oid, { "category": newCategoryName })

        //Show toast
        if (apiResponse === ApiResponseStatus.Success) {
            toast({
                variant: "success",
                description: "Category is successfully updated",
                duration: 3000
            })
        } else {
            toast({
                variant: "destructive",
                description: "There was a problem updating the category.",
                duration: 3000
            })
        }

        //Clean up code
        setIsSettingCategory(false)
        refreshAllComplaints()
    };


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[125px] md:w-[150px] xl:w-[200px] justify-between"
                    disabled={ isSettingCategory }
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
