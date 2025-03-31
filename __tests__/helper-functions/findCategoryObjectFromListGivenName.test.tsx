import '@testing-library/jest-dom'
import { findCategoryObjectFromListGivenName } from "@/utils/HelperFunctions";
import { Category } from '@/types/Category';

describe('findCategoryObjectFromListGivenName', () => {
    let categoriesArray: Category[];

    beforeEach(() => {
        categoriesArray = [
            {
                id: '1',
                name: 'Category 1',
                colour: 'Colour 1'
            },
            {
                id: '2',
                name: 'Category 2',
                colour: 'Colour 2'
            },
        ]
    });

    it("should return the category if the input name matches the name of a category in the list", () => {
        const output = findCategoryObjectFromListGivenName(categoriesArray, 'Category 1')
        expect(output?.id).toBe('1')
        expect(output?.name).toBe('Category 1')
        expect(output?.colour).toBe('Colour 1')
    })

    it("should return null if the input name does not match the name of any categories in the list", () => {
        const output = findCategoryObjectFromListGivenName(categoriesArray, 'Category 10')
        expect(output).toBe(null)
    })

    it("should return null if the list is empty", () => {
        const output = findCategoryObjectFromListGivenName([], 'Category 1')
        expect(output).toBe(null)
    })
})
