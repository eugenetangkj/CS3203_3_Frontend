"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Category } from "@/types/Category"
import { ERROR_MESSAGE_API } from "@/constants/Constants"
import { categoriesUpdateByOid } from "@/controllers/CategoriesFunctions"
import { CATEGORIES_GET_ALL_SWR_HOOK } from "@/constants/SwrHooks"
import { mutate } from "swr"

/**
This component represents a colour picker input for changing the colour associated with a given category.
It handles the logic for updating the colour of a category when user input changes.
*/
interface CategoryColourPicker {
    readonly category: Category,
}

export function CategoryColourPicker({ category } : CategoryColourPicker)  {

    //States
    const [currentColourHexValue, setCurrentColourHexValue] = useState<string>(category.colour)
    const [previousColourHexValue, setPreviousColourHexValue] = useState<string>(category.colour)

    //Toast management
    const { toast } = useToast()

    //Updates the colour of a given category
    const updateColourForCategory = async ()  =>  {
        if (currentColourHexValue === previousColourHexValue) {
            //Colour did not change from previous selection
            return
        }

        //Colour did change from previous selection
        const updateCategoryResult = await categoriesUpdateByOid(category.id, {
            "color": currentColourHexValue
        })
        if (updateCategoryResult) {
            setPreviousColourHexValue(currentColourHexValue)
            category.colour = currentColourHexValue
            mutate(CATEGORIES_GET_ALL_SWR_HOOK)
            toast({
                variant: "success",
                description: "The colour code of the category is successfully updated.",
                duration: 3000
            })
        } else {
            toast({
                variant: "destructive",
                description: ERROR_MESSAGE_API,
                duration: 3000
            })
        }
    };

    return (
        <input
            type="color"
            value={ currentColourHexValue }
            onChange={(e) => setCurrentColourHexValue(e.target.value)}
            className="border px-2 py-1 rounded-full w-24"
            onBlur={ () => updateColourForCategory() }
        />
    )
}
