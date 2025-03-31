import '@testing-library/jest-dom'
import { capitaliseFirstLetter } from "@/utils/HelperFunctions";

describe('capitaliseFirstLetter', () => {
    it('should capitalise the first letter if it is not capitalised', () => {
        const inputString = 'hello'
        const processedString = capitaliseFirstLetter(inputString)
        expect(processedString).toBe('Hello')
    })

    it('should return the same string if its first letter is already capitalised', () => {
        const inputString = 'Hello'
        const processedString = capitaliseFirstLetter(inputString)
        expect(processedString).toBe('Hello')
    })

    it('should return the same string the string is empty', () => {
        const inputString = ''
        const processedString = capitaliseFirstLetter(inputString)
        expect(processedString).toBe('')
    })
})