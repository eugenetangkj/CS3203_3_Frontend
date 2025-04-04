import { z } from "zod"


/**
This file contains the validation rules for sign up and sign in form.
*/

//Validate name field
export const nameFieldValidation = z.string({ message: 'Name must be a string.' })
                                   .max(20, { message: 'Name must be a maximum of 20 characters long.' })
                                   .refine((val) => val.trim().length >= 2, { message: "Name must be a minimum of 2 characters long." })


//Validate email field
export const emailFieldValidation = z.string({ message: 'Email must be a string.' })
                                    .min(1, { message: "Email cannot be empty." })
                                    .email({ message: "Please enter a valid email address." });


//Validate password field
export const passwordFieldValidation = z.string({ message: 'Password must be a string.' })
                                       .min(5, { message: 'Password must be a minimum of 5 characters long.'})
                                       .max(20, { message: 'Password must be a maximum of 20 characters long.'})
                                       .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
                                       .regex(/[0-9]/, { message: "Password must contain at least one number." })


//Validate confirm password field
export const confirmPasswordFieldValidation = z.string({ message: 'Password must be a string.'})
