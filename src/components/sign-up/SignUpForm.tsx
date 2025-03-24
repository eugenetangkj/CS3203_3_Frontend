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
import { ERROR_MESSAGE_API } from "@/constants/Constants"
import { nameFieldValidation, emailFieldValidation, passwordFieldValidation, confirmPasswordFieldValidation } from "@/utils/FormValidation"
import { API_BASE_URL_USER_MANAGEMENT, SIGNUP_ENDPOINT } from "@/constants/ApiRoutes"
import axios from "axios"
/**
This component represents the form for signing up a new account.
*/
const formSchema = z.object({
    name: nameFieldValidation,
    email: emailFieldValidation,
    password: passwordFieldValidation,
    confirmPassword: confirmPasswordFieldValidation,
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match.",
        path: ['confirmPassword']
      });
    }
});


interface SignUpFormProps {
    role: string
    successMessage: string,
    buttonMessage: string,
    buttonActionMessage: string
}


export default function SignUpForm({ role, successMessage, buttonMessage, buttonActionMessage }: SignUpFormProps) {
    //States
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [isSubmittingForm, setIsSubmittingForm] = useState(false)

    //Toggle password visibility
    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev: boolean) => !prev);
    };
    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible((prev: boolean) => !prev);
    };

    //Toast management
    const { toast } = useToast()

    // Define the form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    })
 
    //Handler function after user presses sign up
    async function onSubmit({ name, email, password }: z.infer<typeof formSchema>) {
        setIsSubmittingForm(true)

        try {
            //Make API call to sign up
            const signupApiEndpoint = API_BASE_URL_USER_MANAGEMENT  + SIGNUP_ENDPOINT
            await axios.post(signupApiEndpoint,
                {
                    "document": {
                        "name": name,
                        "email": email,
                        "password": password,
                        "role": role,
                        "collectibles": []
                    }
                }
            )

            //Successful, toast to inform the user that his account has been created, please login
            toast({
                variant: "success",
                description: successMessage,
                duration: 3000,
            })
            form.reset()
        } catch (error) {
            let message = ERROR_MESSAGE_API

            //Axios error
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 409) {
                    message = error.response?.data?.message;
                } else {
                    message = ERROR_MESSAGE_API
                }
            }

            //Display error toast
            toast({
                variant: "destructive",
                description: message,
                duration: 3000,
            })
        } finally {
            // Clean up
            setIsSubmittingForm(false)
        }
    }

    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                    <FormLabel className='text-yap-black-800 text-lg'>Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Your name" className='sign-up-field' {...field} />
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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


            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                    <FormLabel className='text-yap-black-800 text-lg'>Confirm Password</FormLabel>
                    <FormControl>
                        <div className='flex items-center space-x-2'>
                            <Input placeholder="Confirm your password" type={isConfirmPasswordVisible ? "text" : "password"} className='sign-up-field' {...field} />
                            <div className='cursor-pointer text-yap-gray-800' onClick={toggleConfirmPasswordVisibility}>
                                { isConfirmPasswordVisible ? <EyeClosed /> : <Eye /> }
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
                
            >{isSubmittingForm ? buttonActionMessage : buttonMessage }</Button>
          </form>
        </Form>
      )
}