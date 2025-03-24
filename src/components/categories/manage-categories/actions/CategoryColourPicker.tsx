"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Category } from "@/types/Category"
import { API_BASE_URL_ADMIN_MANAGEMENT, CATEGORIES_UPDATE_BY_OID_ENDPOINT } from "@/constants/ApiRoutes"
import axios from "axios"
import { ERROR_MESSAGE_API } from "@/constants/Constants"

/**
This component represents a colour picker input for changing the colour associated with a given category.
It handles the logic for updating the colour of a category when user input changes.
*/
interface CategoryColourPicker {
    category: Category,
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
        try {
            const updateCategoryEndpoint = API_BASE_URL_ADMIN_MANAGEMENT  + CATEGORIES_UPDATE_BY_OID_ENDPOINT
            const response = await axios.post(updateCategoryEndpoint, 
                {
                    "oid": category.id,
                    "update_document": {
                        "$set": {
                            "color": currentColourHexValue
                        }
                    }
                } 
            )
            const wasColourUpdatedSuccessfully = response.data.success
            const messageFromApi = response.data.message

            if (wasColourUpdatedSuccessfully) {
                setPreviousColourHexValue(currentColourHexValue)
                category.colour = currentColourHexValue
                toast({
                    variant: "success",
                    description: "The colour code of the category is successfully updated.",
                    duration: 3000
                })
            } else {
                toast({
                    variant: "destructive",
                    description: messageFromApi,
                    duration: 3000
                })
            }
        } catch (error) {
            //Display error toast
            toast({
                variant: "destructive",
                description:ERROR_MESSAGE_API ,
                duration: 3000
            })
        } finally {
            //Clean up code
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
