import '@testing-library/jest-dom'
import { determineIsObjectEmpty } from "@/utils/HelperFunctions";

describe('determineIsObjectEmpty method', () => {
    it('should return true if the argument is an empty object', () => {
        const isObjectEmpty: boolean = determineIsObjectEmpty({})
        expect(isObjectEmpty).toBe(true)
    })

    it('should return false if the argument is a non-empty object', () => {
        const isObjectEmpty: boolean = determineIsObjectEmpty({key: 1})
        expect(isObjectEmpty).toBe(false)
    })

    it('should return false if the argument is not an object', () => {
        const isObjectEmpty: boolean = determineIsObjectEmpty("{}")
        expect(isObjectEmpty).toBe(false)
    })
})