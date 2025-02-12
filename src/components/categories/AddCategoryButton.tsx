"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { DestructiveAlert } from "../common/alert/DestructiveAlert"
import { useToast } from "@/hooks/use-toast"

export function AddCategoryButton() {

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






    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
    
        //Check that both fields are field up
        if (!name || !colour) {
          console.log(colour);
            setError("Please fill in both fields.")
            return
        }

        try {
            setIsSubmitting(true);



            //Show successful toast
            toast({
              description: "Category is successfully added.",
            })
            



        } catch (error) {

          //Show error toast
          toast({
            variant: "destructive",
            description: "There was a problem adding the category.",
          })

        } finally {
            setIsSubmitting(false)
            setOpen(false); //Close dialog
            resetStates(); //Reset states
        }

        


    
        // try {
        //     setIsSubmitting(true);
      
        //     const response = await axios.post("http://localhost:8081/categories", {
        //       name,
        //       colour,
        //     });
      
        //     if (response.status === 201) {
        //       setName("");
        //       setColour("");
        //       document.getElementById("closeDialog")?.click(); // Close dialog
        //     } else {
        //       setError("Something went wrong. Please try again.");
        //     }
        //   } catch (error) {
        //     console.error("Error adding category:", error);
        //     setError("Failed to add category. Please try again later.");
        //   } finally {
        //     setIsSubmitting(false);
        //   }
    };






  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) resetStates() //Reset all states when dialog closes
      }}
    >

      <DialogTrigger asChild>
        <Button className="bg-yap-brown-900 hover:bg-yap-brown-800 duration-200 text-white self-end rounded-full">Add Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] font-afacad">
        <DialogHeader>
          <DialogTitle className='text-xl text-yap-black-800'>Add Category</DialogTitle>
          <DialogDescription className='text-base yap-gray-900'>
            Add a new category to categorise complaints under.
          </DialogDescription>
        </DialogHeader>


        {/* Display error message if any */}
        { error && <DestructiveAlert description={ error } />}







        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                Name
                </Label>
                <Input id="name" placeholder="Environment" className="col-span-3 rounded-full text-yap-black-800 text-base"
                    value={ name } onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="colour" className="text-left">
                Colour Code
                </Label>
                <Input id="colour" type="color" className="col-span-3 rounded-full text-yap-black-800 text-base"
                    value={ colour } onChange={(e) => setColour(e.target.value)} />
            </div>
            </div>
            <DialogFooter>
            <Button type="submit" className='bg-yap-brown-900 hover:bg-yap-brown-800 duration-200 rounded-full px-6'>{isSubmitting ? "Adding..." : "Add"}</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
