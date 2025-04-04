import '@testing-library/jest-dom'
import { convertPollDocumentsToObjects } from '@/utils/DatabaseHelperFunctions'

describe('convertPollDocumentsToObjects', () => {

    it("should return an empty array when given an empty array of poll documents", () => {
        const pollObjects = convertPollDocumentsToObjects([])
        expect(pollObjects.length).toBe(0)
    })

    it('should successfully convert poll documents to Poll objects', () => {
        //Arrange
        const pollDocuments = [
            {
                "_id": {
                    "$oid": "67eaa85a7d499fc26a00dcc3"
                },
                "question": "Do you think we have enough green spaces in Singapore?",
                "category": "Environment",
                "date_closed": "01-04-2025 22:36:05",
                "question_type": "Open-ended",
                "options": [],
                "date_created": "31-03-2025 22:36:05",
                "date_published": "31-03-2025 23:36:05",
                "status": "Closed"
            },
            {
                "_id": {
                    "$oid": "67eaa85a7d499fc26a00dcc2"
                },
                "question": "How satisfied are you with your current employment situation in Singapore?",
                "category": "Employment",
                "date_closed": null,
                "question_type": "MCQ",
                "options": [
                    "Satisfied",
                    "Dissatisfied"
                ],
                "date_created": "31-03-2025 22:36:05",
                "date_published": null,
                "status": "Unpublished"
            }
        ]

        //Action
        const pollObjects = convertPollDocumentsToObjects(pollDocuments)

        //Assert length and whether mapping is done correctly
        expect(pollObjects.length).toBe(2)

        expect(pollObjects[0].id).toBe("67eaa85a7d499fc26a00dcc3")
        expect(pollObjects[0].question).toBe("Do you think we have enough green spaces in Singapore?")
        expect(pollObjects[0].category).toBe("Environment")
        expect(pollObjects[0].date_closed).toBe("01-04-2025 22:36:05")
        expect(pollObjects[0].question_type).toBe("Open-ended")
        expect(pollObjects[0].options.length).toBe(0)
        expect(pollObjects[0].date_created).toBe("31-03-2025 22:36:05")
        expect(pollObjects[0].date_published).toBe("31-03-2025 23:36:05")
        expect(pollObjects[0].status).toBe("Closed")

    })
})