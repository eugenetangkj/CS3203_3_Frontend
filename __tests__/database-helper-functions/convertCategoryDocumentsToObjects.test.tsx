import '@testing-library/jest-dom'
import { convertCategoryDocumentsToObjects } from '@/utils/DatabaseHelperFunctions'

describe('convertCategoryDocumentsToObjects', () => {
    
    it('should return an empty array if the input array of category documents is empty', () => {
        const categoryObjects = convertCategoryDocumentsToObjects([])
        expect(categoryObjects.length).toBe(0)
    })

    it('should correctly convert category documents to objects', () => {
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
        const categoryObjects = convertCategoryDocumentsToObjects(categoryDocuments)

        //Assert
        expect(categoryObjects.length).toBe(2)
        expect(categoryObjects[0].id).toBe("67eaa759f62e7864f8893682")
        expect(categoryObjects[0].name).toBe("Housing")
        expect(categoryObjects[0].colour).toBe("#8D6E63")

        expect(categoryObjects[1].id).toBe("67eaa759f62e7864f8893683")
        expect(categoryObjects[1].name).toBe("Environment")
        expect(categoryObjects[1].colour).toBe("#A7E403")
    })
})