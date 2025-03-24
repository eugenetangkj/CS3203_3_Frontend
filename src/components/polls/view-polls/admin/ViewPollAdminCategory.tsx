"use client"

import { Poll } from "@/types/Poll"
import PageSubtitle from "@/components/common/text/PageSubtitle"
import { useState, useEffect } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown } from "lucide-react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { PollStatusEnum } from "@/types/Poll"
import { Category } from "@/types/Category"
import { API_BASE_URL_ADMIN_MANAGEMENT, CATEGORIES_GET_ALL_ENDPOINT } from "@/constants/ApiRoutes"
import axios from "axios"
import { convertCategoryDocumentsToObjects } from "@/utils/DatabaseHelperFunctions"

/**
Represents the category input field that the admin views for each poll. It is only editable
if the poll is unpublished.
*/
interface ViewPollAdminCategoryProps {
    currentPoll: Poll,
    setPoll: React.Dispatch<React.SetStateAction<Poll>>,
}

export function ViewPollAdminCategory({ currentPoll, setPoll }: ViewPollAdminCategoryProps) {
    //States
    const [open, setOpen] = useState(false)
    const [allCategories, setAllCategories] = useState<Category[]>([])

    
  

    
  
    //Updates the category of a given poll
    const updateCategory = (newCategoryName: string)  =>  {
        setOpen(false);
        setPoll((prevPoll) => ({
            ...prevPoll, 
            category: newCategoryName, //Only update the category field
        }))
    };

    //Fetches all categories
    const fetchCategories = async () => {
        try {
            const categoriesApiEndPoint = API_BASE_URL_ADMIN_MANAGEMENT  + CATEGORIES_GET_ALL_ENDPOINT
            const categoriesData = await axios.post(categoriesApiEndPoint)
            const categories = convertCategoryDocumentsToObjects(categoriesData.data.documents)
            setAllCategories(categories);
        } catch (error) {
            console.error(error)
        }
    };

    //Fetches all categories on mount
    useEffect(() => {
        fetchCategories()
    }, [])


    return (
        <div className='flex flex-col space-y-4'>
            <PageSubtitle pageSubtitle="Category" />
            
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[150px] md:w-[150px] xl:w-[200px] justify-between text-yap-black-800"
                                disabled={ currentPoll.status != PollStatusEnum.Unpublished }
                            >
                                { currentPoll.category === '' ? 'Select a category' : currentPoll.category }
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
                                            currentPoll.category === category.name ? "opacity-100" : "opacity-0"
                                        )}
                                        />
                                    </CommandItem>
                                    ))}
                                </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
            
        </div>
    )







}
