"use client"


import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Category } from "@/types/Category"


/**
This component represents a colour picker input for changing the colour associated with a given category.
It handles the logic for updating the colour of a category when user input changes.
*/
interface ColourPickerProps {
    category: Category,
}

export function ColourPicker({category} : ColourPickerProps)  {

    //States
    const [currentColourHexValue, setCurrentColourHexValue] = useState<string>(category.colour)
    const [isLoading, setIsLoading] = useState(false)
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
            console.log(isLoading)
            setIsLoading(true)

        
            //TODO: Call API to update the category's colour using currentColourHexValue and category
            console.log(currentColourHexValue)


            //Update previous selection
            setPreviousColourHexValue(currentColourHexValue)

            //Display successful toast
            toast({
                variant: "success",
                description: "The colour code of the category is successfully updated.",
                duration: 3000
            })
        } catch (error) {
            console.log(error)
            
            //Display error toast
            toast({
                variant: "destructive",
                description: "There was a problem updating the colourc code of the category.",
                duration: 3000
            })
        } finally {
            //Clean up code
            setIsLoading(false)
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
