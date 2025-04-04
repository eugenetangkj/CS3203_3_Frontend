import '@testing-library/jest-dom'
import { nameFieldValidation } from '@/utils/FormValidation'

describe('nameFieldValidation', () => {

    it("should pass for a name with 2 characters", () => {
        expect(() => nameFieldValidation.parse("Jo")).not.toThrow()
    });

    it("should pass for a name with 3 characters", () => {
        expect(() => nameFieldValidation.parse("Bob")).not.toThrow()
    });

    it("should pass for a name with 19 characters", () => {
        expect(() => nameFieldValidation.parse("AlexanderTheGreat12")).not.toThrow()
    });

    it("should pass for a name with 20 characters", () => {
        expect(() => nameFieldValidation.parse("AlexanderTheGreat123")).not.toThrow()
    });

    it("should throw error for names shorter than 2 characters", () => {
        expect(() => nameFieldValidation.parse("A")).toThrow("Name must be a minimum of 2 characters long.")
    });

    it("should throw error for names longer than 20 characters", () => {
        try {
            nameFieldValidation.parse("AlexanderTheGreat1234"); // 21 characters
        } catch (e: any) {
            // Expect the error to have the correct message inside the errors array
            expect(e.errors[0].message).toBe("Name must be a maximum of 20 characters long.")
        }
    });
    
    it("should throw error for names that are empty string", () => {
        expect(() => nameFieldValidation.parse("")).toThrow("Name must be a minimum of 2 characters long.")
    })

    it("should throw error for names shorter than 2 characters after removing leading and trailing whitespaces", () => {
        expect(() => nameFieldValidation.parse("    A   ")).toThrow("Name must be a minimum of 2 characters long.")
    });

    it("should throw error for names that are purely white spaces", () => {
        expect(() => nameFieldValidation.parse("       ")).toThrow("Name must be a minimum of 2 characters long.")
    });
})
