import '@testing-library/jest-dom'
import { addStringToListIfAbsent } from "@/utils/HelperFunctions";

describe('addStringToListIfAbsent', () => {
    let originalArray: string[]

    beforeEach(() => {
        originalArray = ['Lion', 'Elephant', 'Giraffe']
    })

    it('should add a string to a list if the string is not originally present', () => {
        const outputArray = addStringToListIfAbsent(originalArray, 'Monkey')
        expect(outputArray.length).toBe(4)
        expect(outputArray[3]).toBe('Monkey')
    })

    it('should not add a string to a list if the string is already originally present', () => {
        const outputArray = addStringToListIfAbsent(originalArray, 'Lion')
        expect(outputArray.length).toBe(3)
    })

    it('should add a string to a list if the list is empty', () => {
        originalArray = []
        const outputArray = addStringToListIfAbsent(originalArray, 'Monkey')
        expect(outputArray.length).toBe(1)
        expect(outputArray[0]).toBe('Monkey')
    })
})