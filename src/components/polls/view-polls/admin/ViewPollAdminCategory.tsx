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
import useSWR from "swr"
import { CATEGORIES_GET_ALL_SWR_HOOK } from "@/constants/SwrHooks"
import { categoriesGetAll } from "@/controllers/CategoriesFunctions"
import { Skeleton } from "@/components/ui/skeleton"

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
    const { data, error, isLoading } = useSWR<Category[]>(CATEGORIES_GET_ALL_SWR_HOOK, categoriesGetAll);

    
    //Updates the category of a given poll
    const updatePollCategory = (newCategoryName: string)  =>  {
        setOpen(false);
        setPoll((prevPoll) => ({
            ...prevPoll, 
            category: newCategoryName, //Only update the category field
        }))
    };

    
    return (
        <div className='flex flex-col space-y-4'>
            <PageSubtitle pageSubtitle="Category" />
                {
                    isLoading || data === undefined
                    ? <Skeleton className='w-[60px] h-[20px]' />
                    : <Popover open={open} onOpenChange={setOpen}>
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
                                    {data.map((category) => (
                                    <CommandItem
                                        key={category.id}
                                        value={category.name}
                                        className='font-afacad text-yap-black-800'
                                        onSelect={(newCategoryName) => { updatePollCategory(newCategoryName) }}>
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
                }
        </div>
    )
}
