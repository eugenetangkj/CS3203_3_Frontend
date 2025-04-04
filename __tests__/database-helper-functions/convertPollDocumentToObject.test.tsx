import '@testing-library/jest-dom'
import { convertPollDocumentToObject } from '@/utils/DatabaseHelperFunctions'

describe('convertPollDocumentToObject', () => {

    it('should successfully convert the poll document to a Poll object', () => {
        //Arrange
        const pollDocument =
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

        //Action
        const pollObject = convertPollDocumentToObject(pollDocument)

        //Assert whether mapping is done correctly
        expect(pollObject.id).toBe("67eaa85a7d499fc26a00dcc2")
        expect(pollObject.question).toBe("How satisfied are you with your current employment situation in Singapore?")
        expect(pollObject.category).toBe("Employment")
        expect(pollObject.question_type).toBe("MCQ")
        expect(pollObject.options.length).toBe(2)
        expect(pollObject.options[0]).toBe("Satisfied")
        expect(pollObject.options[1]).toBe("Dissatisfied")
        expect(pollObject.date_created).toBe("31-03-2025 22:36:05")
        expect(pollObject.date_published).toBe(null)
        expect(pollObject.date_closed).toBe(null)
        expect(pollObject.status).toBe("Unpublished")
    })
})
