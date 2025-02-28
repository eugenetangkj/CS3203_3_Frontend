"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

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
             .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character (!@#$%^&*)." })
})


export default function SignUpForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })
 
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
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
                        <Input placeholder="Your name" className='w-[400px] rounded-full text-base' {...field} />
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
                        <Input placeholder="Your email" type='email' className='w-[400px] rounded-full text-base' {...field} />
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
                        <Input placeholder="Your password" type='password' className='w-[400px] rounded-full text-base' {...field} />
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />





            <Button className='rounded-full bg-yap-brown-900 hover:bg-yap-brown-800 duration-200 w-full text-base' type="submit">Sign Up</Button>
          </form>
        </Form>
      )
}