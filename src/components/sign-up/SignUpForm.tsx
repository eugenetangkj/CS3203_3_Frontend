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
import { ERROR_MESSAGE_API } from "@/constants/ConstantValues"

/**
This component represents the form for signing up a new account.
*/
const formSchema = z.object({
    name: z.string({ message: 'Name cannot be empty.'})
          .min(2, { message: 'Name must be a minimum of 2 characters long.'})
          .max(20, { message: 'Name must be maximum of 20 characters long.'})
          .trim()
          .refine((val) => val.trim().length > 0, { message: "Name cannot be empty or just spaces." }),

    email: z.string({ message: 'Email cannot be empty.'})
           .email({ message: 'Please enter a valid email address.' }),


    password: z.string({ message: 'Password cannot be empty.'})
              .min(5, { message: 'Password must be a minimum of 5 characters long.'})
              .max(20, { message: 'Password must be a maximum of 20 characters long.'})
              .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
             .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
             .regex(/[0-9]/, { message: "Password must contain at least one number." })
             .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character (!@#$%^&*)." }),
    
    confirmPassword: z.string({ message: 'Password cannot be empty.' })
                     .min(5, { message: 'Password must be a minimum of 5 characters long.'})
                     .max(20, { message: 'Password must be a maximum of 20 characters long.'})
                     .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
                     .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
                     .regex(/[0-9]/, { message: "Password must contain at least one number." })
                     .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character (!@#$%^&*)." }),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match.",
        path: ['confirmPassword']
      });
    }
});



export default function SignUpForm() {
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
    function onSubmit({ name, email, password }: z.infer<typeof formSchema>) {
        setIsSubmittingForm(true)

        try {
            // TODO: Make API call to register

            //Successful, toast to inform the user that his account has been created, please login
            toast({
                variant: "success",
                description: "Sign up is successful. Please login now.",
                duration: 3000,
            })
            form.reset()
        } catch (error) {
            toast({
                variant: "destructive",
                description: ERROR_MESSAGE_API,
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
                            <Input placeholder="Your password" type={isConfirmPasswordVisible ? "text" : "password"} className='sign-up-field' {...field} />
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
                
            >{isSubmittingForm ? "Signing up..." : "Sign Up" }</Button>
          </form>
        </Form>
      )
}