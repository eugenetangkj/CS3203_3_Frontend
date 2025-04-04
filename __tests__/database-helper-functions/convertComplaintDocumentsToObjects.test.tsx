import '@testing-library/jest-dom'
import { convertComplaintDocumentsToObjects } from '@/utils/DatabaseHelperFunctions'

describe('convertCategoryDocumentsToObjects', () => {
    
    it('should return an empty array if the input array of complaint documents is empty', () => {
        const complaintObjects = convertComplaintDocumentsToObjects([])
        expect(complaintObjects.length).toBe(0)
    })

    it('should correctly convert complaint documents to objects', () => {
        //Arrange
        const complaintDocuments = [
            {
                "_id": {
                    "$oid": "67eaa759f62e7864f8893681"
                },
                "id": "id1",
                "title": "Complaint 1",
                "description": "Complaint 1 description",
                "date": "20-03-2024 00:00:00",
                "category": "Housing",
                "source": "Reddit",
                "sentiment": 0.1,
                "url": "www.complaint1.com"
            },
            {
                "_id": {
                    "$oid": "67eaa759f62e7864f8893682"
                },
                "id": "id2",
                "title": "Complaint 2",
                "description": "Complaint 2 description",
                "date": "21-03-2024 00:00:00",
                "category": "Environment",
                "source": "Reddit",
                "sentiment": 0.2,
                "url": "www.complaint2.com"
            },
        ]

        //Action
        const complaintObjects = convertComplaintDocumentsToObjects(complaintDocuments)

        //Assert length and whether mapping is done correctly
        expect(complaintObjects.length).toBe(2)

        expect(complaintObjects[0].oid).toBe("67eaa759f62e7864f8893681")
        expect(complaintObjects[0].id).toBe("id1")
        expect(complaintObjects[0].title).toBe("Complaint 1")
        expect(complaintObjects[0].description).toBe("Complaint 1 description")
        expect(complaintObjects[0].date).toBe("20-03-2024 00:00:00")
        expect(complaintObjects[0].category).toBe("Housing")
        expect(complaintObjects[0].source).toBe("Reddit")
        expect(complaintObjects[0].sentiment).toBe(0.1)
        expect(complaintObjects[0].url).toBe("www.complaint1.com")
    })
})