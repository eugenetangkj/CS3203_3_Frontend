import '@testing-library/jest-dom'
import { convertCategoryObjectsToColourMap } from '@/utils/DatabaseHelperFunctions'

describe('convertCategoryObjectsToColourMap', () => {
    
    it('should return an empty object if the input array of category objects is empty', () => {
        const colourMap = convertCategoryObjectsToColourMap([])
        expect(Object.keys(colourMap).length).toBe(0)
    })

    
    it('should correctly convert category objects into a colour map', () => {
        //Arrange
        const categoryObjects = [
            {
                "id": "67eaa759f62e7864f8893682",
                "name": "Housing",
                "colour": "#8D6E63"
            },
            {
                "id": "67eaa759f62e7864f8893683",
                "name": "Environment",
                "colour": "#A7E403"
            },
        ]

        //Action
        const colourMap = convertCategoryObjectsToColourMap(categoryObjects)

        //Assert
        expect(colourMap).toHaveProperty("Housing", "#8D6E63");
        expect(colourMap).toHaveProperty("Environment", "#A7E403");
        expect(Object.keys(colourMap).length).toBe(2)
    })
})
