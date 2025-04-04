import '@testing-library/jest-dom'
import { confirmPasswordFieldValidation } from '@/utils/FormValidation'


describe('confirmPasswordFieldValidation', () => {

    describe('should not throw error as long as the password is a string where the password can be', () => {
        it("a non-empty string", () => {
            expect(() => confirmPasswordFieldValidation.parse("password")).not.toThrow()
        });

        it("a pure whitespace string", () => {
            expect(() => confirmPasswordFieldValidation.parse("   ")).not.toThrow()
        });
    })

    describe('should throw error if the password is not a string where the password is', () => {
        it("a number", () => {
            try {
                    confirmPasswordFieldValidation.parse(12)
            } catch (e: any) {
                    // Expect the error to have the correct message inside the errors array
                    expect(e.errors[0].message).toBe("Password must be a string.")
            }
        });

        it("an object", () => {
            try {
                    confirmPasswordFieldValidation.parse({})
            } catch (e: any) {
                    // Expect the error to have the correct message inside the errors array
                    expect(e.errors[0].message).toBe("Password must be a string.")
            }
        }) 
    })
})
