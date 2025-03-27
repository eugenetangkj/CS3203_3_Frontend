"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Eye, EyeClosed } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { SUCCESS } from "@/constants/Constants"
import { confirmPasswordFieldValidation, emailFieldValidation } from "@/utils/FormValidation"
import { useRouter } from "next/navigation"
import { USERS_GET_PROFILE_SWR_HOOK } from "@/constants/SwrHooks"
import { mutate } from "swr"
import { userLogin } from "@/controllers/UsersClientFunctions"
import { setCookiesForSigningIn } from "@/controllers/UsersServerFunctions"

/**
This component represents the form for signing in an existing account
*/
const formSchema = z.object({
    email: emailFieldValidation,
    password: confirmPasswordFieldValidation,
})


export default function SignInForm() {
    //Router
    const router = useRouter();

    //States
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isSubmittingForm, setIsSubmittingForm] = useState(false)

    //Toggle password visibility
    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev: boolean) => !prev);
    };

    //Toast management
    const { toast } = useToast()

   
    // Define the form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
 
    //Handler function after user presses sign up
    async function onSubmit({ email, password }: z.infer<typeof formSchema>) {
        setIsSubmittingForm(true)

        //Make API call to login
        const loginResult = await userLogin(email, password)

        //Check successful or not
        if (loginResult.message !== SUCCESS) {
            //CASE 1: Login is not successful
            toast({
                variant: "destructive",
                description: loginResult.message,
                duration: 3000,
            })
            setIsSubmittingForm(false)
        } else {
            //CASE 2: Login is successful
            const jwtToken = loginResult.jwt
            const userOid = loginResult.oid
    
            //Set cookie with JWT token
            await setCookiesForSigningIn(jwtToken, userOid)

            //Update form state
            setIsSubmittingForm(false)

            //Successful, redirect to home page
            window.location.href = '/';
        }
    }

    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                    <FormLabel className='text-yap-black-800 text-lg'>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="Your email" type='email' className='sign-up-field' {...field} />
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                    <FormLabel className='text-yap-black-800 text-lg'>Password</FormLabel>
                    <FormControl>
                        <div className='flex items-center space-x-2'>
                            <Input placeholder="Your password" type={isPasswordVisible ? "text" : "password"} className='sign-up-field' {...field} />
                            <div className='cursor-pointer text-yap-gray-800' onClick={togglePasswordVisibility}>
                                { isPasswordVisible ? <EyeClosed /> : <Eye /> }
                            </div>
                        </div>
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            {/* Submit button */}
            <Button className='rounded-full bg-yap-brown-900 hover:bg-yap-brown-800 duration-200 w-full text-base'
                type="submit"
                disabled={ isSubmittingForm }
                
            >{isSubmittingForm ? "Signing in..." : "Sign In" }</Button>
          </form>
        </Form>
      )
}