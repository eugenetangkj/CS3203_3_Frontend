"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { DestructiveAlert } from "@/components/common/alert/DestructiveAlert"
import { useToast } from "@/hooks/use-toast"
import { API_BASE_URL_ADMIN_MANAGEMENT, CATEGORIES_INSERT_ONE_ENDPOINT } from "@/constants/ApiRoutes"
import axios from "axios"
import { DUPLICATE_KEY_STRING, ERROR_MESSAGE_API } from "@/constants/Constants"

/**
This component represents the button for adding category. It presents a pop-up to allow
the user to select the name and colour code of a category to be added. Then, it allows adding
of the category to the database and refreshes the list of categories in the manage categories table.
*/
interface AddCategoryButtonProps {
    readonly fetchCategories: () => void
}

export function AddCategoryButton({ fetchCategories }: AddCategoryButtonProps ) {
    //States
    const [name, setName] = useState("")
    const [colour, setColour] = useState("000000")
    const [error, setError] = useState<string | null>(null)
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)


    //Resets all states
    const resetStates = () => {
        setError(null)
        setName("")
        setColour("000000")
        setIsSubmitting(false)
    }

    //Toast management
    const { toast } = useToast()


    //Handles logic for adding a category
    const handleAddCategory = async (e: React.FormEvent) => {
        //Initialisation
        e.preventDefault()
        setError(null)
    
        //Check that both fields are field up
        if (!name || !colour || name.trim() === '') {
            setError("Please fill in both fields.")
            return
        }

        //Submit to API
        try {
            setIsSubmitting(true);
            const addCategoryApiEndpoint = API_BASE_URL_ADMIN_MANAGEMENT  + CATEGORIES_INSERT_ONE_ENDPOINT
            const response = await axios.post(addCategoryApiEndpoint, 
                {
                    "document": {
                        name,
                        color: colour
                    }
                }
            )
            const wasCategoryAddedSuccessfully = response.data.success
            const messageFromApi = response.data.message

            if (wasCategoryAddedSuccessfully) {
                //Successfully added
                toast({
                    variant: "success",
                    description: "Category is successfully added.",
                    duration: 3000,
                })

                //Fetch categories
                fetchCategories()
            } else {
                //Error in adding
                toast({
                    variant: "destructive",
                    description: messageFromApi,
                    duration: 3000,
                })
            }
        } catch (error) {
            //Show error toast
            let errorMessage = axios.isAxiosError(error) && error.response?.data?.message
                                 ? error.response.data.message
                                 : "There was a problem adding the category.";
            errorMessage = (errorMessage.includes(DUPLICATE_KEY_STRING))
                           ? "A category already exists with the same name."
                           : ERROR_MESSAGE_API
            toast({
                variant: "destructive",
                description: errorMessage,
                duration: 3000,
            })
        } finally {
            setIsSubmitting(false)
            setOpen(false); //Close dialog
            resetStates(); //Reset states
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                setOpen(isOpen);
                if (!isOpen) resetStates() //Reset all states when dialog closes
            }}
        >
            <DialogTrigger asChild>
                <Button className="bg-yap-orange-900 hover:bg-yap-orange-800 duration-200 text-white self-end rounded-full">Add Category</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] font-afacad">
                <DialogHeader>
                    <DialogTitle className='text-xl text-yap-black-800'>Add Category</DialogTitle>
                    <DialogDescription className='text-base yap-gray-900'>
                        Add a new category to categorise complaints under.
                    </DialogDescription>
                </DialogHeader>


                {/* Display error message if any, such as if the user entered a blank category name */}
                { error && <DestructiveAlert description={ error } />}


                <form onSubmit={ handleAddCategory }>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-left">Name</Label>
                            <Input id="name" placeholder="e.g. Environment" className="col-span-3 rounded-full text-yap-black-800 text-base"
                                value={ name } onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="colour" className="text-left">Colour Code</Label>
                            <Input id="colour" type="color" className="col-span-3 rounded-full text-yap-black-800 text-base"
                                value={ colour } onChange={(e) => setColour(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className='bg-yap-brown-900 hover:bg-yap-brown-800 duration-200 rounded-full px-6'
                            disabled={ isSubmitting }>{isSubmitting ? "Adding..." : "Add"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
  )
}
