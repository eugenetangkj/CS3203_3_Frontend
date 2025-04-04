import '@testing-library/jest-dom'
import { convertCategoryDocumentsToColourMap } from '@/utils/DatabaseHelperFunctions'

describe('convertCategoryDocumentsToColourMap', () => {

    it('should return an empty object if the input array of category documents is empty', () => {
        const colourMap = convertCategoryDocumentsToColourMap([])
        expect(Object.keys(colourMap).length).toBe(0)
    })

    it('should correctly convert category documents into a colour map', () => {
        //Arrange
        const categoryDocuments = [
            {
                "_id": {
                    "$oid": "67eaa759f62e7864f8893682"
                },
                "name": "Housing",
                "color": "#8D6E63"
            },
            {
                "_id": {
                    "$oid": "67eaa759f62e7864f8893683"
                },
                "name": "Environment",
                "color": "#A7E403"
            },
        ]

        //Action
        const colourMap = convertCategoryDocumentsToColourMap(categoryDocuments)

        //Assert
        expect(colourMap).toHaveProperty("Housing", "#8D6E63");
        expect(colourMap).toHaveProperty("Environment", "#A7E403");
        expect(Object.keys(colourMap).length).toBe(2)
    })
})
