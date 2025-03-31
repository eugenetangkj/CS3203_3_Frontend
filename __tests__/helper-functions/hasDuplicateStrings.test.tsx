import '@testing-library/jest-dom'
import { hasDuplicateStrings } from '@/utils/HelperFunctions'

describe('hasDuplicateStrings', () => {
    it('should return true if the array has strings that are duplicated', () => {
        const stringArray = ['String 1', 'String 2', 'String 1', 'String 3']
        const output = hasDuplicateStrings(stringArray)
        expect(output).toBe(true)
    })

    it('should return true if the array has strings that are duplicated', () => {
        const stringArray = ['String 1', 'String 2', 'String 1', 'String 3']
        const output = hasDuplicateStrings(stringArray)
        expect(output).toBe(true)
    })

    it('should return false if all strings in the array are unique', () => {
        const stringArray = ['String 1', 'string 1', 'StRING 1', 'strING 1']
        const output = hasDuplicateStrings(stringArray)
        expect(output).toBe(false)
    })

    it('should return true if the array is empty', () => {
        const stringArray : string[] = []
        const output = hasDuplicateStrings(stringArray)
        expect(output).toBe(false)
    })
})