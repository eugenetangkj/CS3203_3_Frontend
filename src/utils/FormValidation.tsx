import { z } from "zod"


/**
This file contains the validation rules for sign up and sign in form.
*/

//Validate name field
export const nameFieldValidation = z.string({ message: 'Name cannot be empty.'})
                                   .min(2, { message: 'Name must be a minimum of 2 characters long.'})
                                   .max(20, { message: 'Name must be maximum of 20 characters long.'})
                                   .trim()
                                   .refine((val) => val.trim().length > 0, { message: "Name cannot be empty or just spaces." })

//Validate email field
export const emailFieldValidation = z.string({ message: 'Email cannot be empty.'})
                                    .email({ message: 'Please enter a valid email address.' })


//Validate password field
export const passwordFieldValidation = z.string({ message: 'Password cannot be empty.' })
                                       .min(5, { message: 'Password must be a minimum of 5 characters long.'})
                                       .max(20, { message: 'Password must be a maximum of 20 characters long.'})
                                       .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
                                       .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
                                       .regex(/[0-9]/, { message: "Password must contain at least one number." })
                                       .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character (!@#$%^&*)." })

//Validate confirm password field
export const confirmPasswordFieldValidation = z.string({ message: 'Password cannot be empty.'})
