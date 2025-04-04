import '@testing-library/jest-dom'
import { emailFieldValidation } from '@/utils/FormValidation'

describe('emailFieldValidation', () => {

    it("should pass for a email in valid format", () => {
        expect(() => emailFieldValidation.parse("jo@gmail.com")).not.toThrow();
    });

    it("should throw error for a email in invalid format", () => {
        expect(() => emailFieldValidation.parse("jooo")).toThrow('Please enter a valid email address.');
    });

    it("should throw error for a email in invalid format where it is made of entirely whitespaces", () => {
        expect(() => emailFieldValidation.parse("      ")).toThrow('Please enter a valid email address.');
    });

    it("should throw error for an empty email", () => {
        expect(() => emailFieldValidation.parse('')).toThrow('Email cannot be empty.');
    });

    it("should throw error for non-string inputs", () => {
        expect(() => emailFieldValidation.parse(1)).toThrow('Email must be a string.');
    });
})
