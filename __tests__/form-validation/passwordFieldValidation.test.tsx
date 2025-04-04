import '@testing-library/jest-dom'
import { passwordFieldValidation } from '@/utils/FormValidation'

/**
Conditions for a valid password:
- Minimum 5, max 20 characters.
- Minimum 1 uppercase letter.
- Minimum 1 number.

We apply equivalence partitioning and obtain 12 equivalence classes.
 */
describe('passwordFieldValidation should return the correct message for', () => {

    it("< 5 chars, >= 1 UC, < 1 num", () => {
        expect(() => passwordFieldValidation.parse("A")).toThrow('Password must be a minimum of 5 characters long.')
    });

    it("< 5 chars, >= 1 UC, >= 1 num", () => {
        expect(() => passwordFieldValidation.parse("A1")).toThrow('Password must be a minimum of 5 characters long.')
    });

    it("< 5 chars, < 1 UC, < 1 num", () => {
        expect(() => passwordFieldValidation.parse("aa")).toThrow('Password must be a minimum of 5 characters long.')
    });

    it("< 5 chars, < 1 UC, >= 1 num", () => {
        expect(() => passwordFieldValidation.parse("a1")).toThrow('Password must be a minimum of 5 characters long.')
    });

    it("> 20 chars, < 1 UC, >= 1 num", () => {
        expect(() => passwordFieldValidation.parse("passwordpassword12345")).toThrow('Password must be a maximum of 20 characters long.')
    });

    it("> 20 chars, < 1 UC, < 1 num", () => {
        expect(() => passwordFieldValidation.parse("passwordpasswordpassword")).toThrow('Password must be a maximum of 20 characters long.')
    });

    it("> 20 chars, >= 1 UC, >= 1 num", () => {
        expect(() => passwordFieldValidation.parse("Passwordpassword12345")).toThrow('Password must be a maximum of 20 characters long.')
    });

    it("> 20 chars, >= 1 UC, < 1 num", () => {
        expect(() => passwordFieldValidation.parse("Passwordpasswordpassword")).toThrow('Password must be a maximum of 20 characters long.')
    });

    it("between 5-20 chars, >= 1 UC, < 1 num", () => {
        expect(() => passwordFieldValidation.parse("Password")).toThrow('Password must contain at least one number.')
    });

    it("between 5-20 chars, < 1 UC, < 1 num", () => {
        expect(() => passwordFieldValidation.parse("password")).toThrow('Password must contain at least one uppercase letter.')
    });

    it("between 5-20 chars, < 1 UC, >= 1 num", () => {
        expect(() => passwordFieldValidation.parse("password1")).toThrow('Password must contain at least one uppercase letter.')
    });

    it("between 5-20 chars, >= 1 UC, >= 1 num", () => {
        expect(() => passwordFieldValidation.parse("Password1")).not.toThrow()
    });
})
