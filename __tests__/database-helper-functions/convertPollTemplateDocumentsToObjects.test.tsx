import '@testing-library/jest-dom'
import { convertPollTemplateDocumentsToObjects } from '@/utils/DatabaseHelperFunctions'

describe('convertPollTemplateDocumentsToObjects', () => {

    it("should return an empty array when given an empty array of poll template documents", () => {
        const pollTemplateObjects = convertPollTemplateDocumentsToObjects([])
        expect(pollTemplateObjects.length).toBe(0)
    })

    it('should successfully convert poll template documents to PollTemplate objects', () => {
        //Arrange
        const pollTemplateDocuments = [
            {
                "_id": {
                    "$oid": "67eaa76bf62e7864f88abd99"
                },
                "category": "Economy",
                "question": "Question 1",
                "question_type": "MCQ",
                "options": [
                    "Option 1",
                    "Option 2"
                ],
                "reasoning": "Reasoning 1",
                "date_created": "14-04-2025 14:30:00"
            },
            {
                "_id": {
                    "$oid": "67eaa76bf62e7864f88abd10"
                },
                "category": "Environment",
                "question": "Question 2",
                "question_type": "Open-ended",
                "options": [],
                "reasoning": "Reasoning 2",
                "date_created": "14-04-2025 14:30:00"
            },  
        ]

        //Action
        const pollTemplateObjects = convertPollTemplateDocumentsToObjects(pollTemplateDocuments)

        //Assert length and whether mapping is done correctly
        expect(pollTemplateObjects.length).toBe(2)

        expect(pollTemplateObjects[0].id).toBe("67eaa76bf62e7864f88abd99")
        expect(pollTemplateObjects[0].question).toBe("Question 1")
        expect(pollTemplateObjects[0].category).toBe("Economy")
        expect(pollTemplateObjects[0].reasoning).toBe("Reasoning 1")
        expect(pollTemplateObjects[0].question_type).toBe("MCQ")
        expect(pollTemplateObjects[0].options.length).toBe(2)
        expect(pollTemplateObjects[0].options[0]).toBe("Option 1")
        expect(pollTemplateObjects[0].options[1]).toBe("Option 2")
        expect(pollTemplateObjects[0].date_created).toBe("14-04-2025 14:30:00")
    })
})