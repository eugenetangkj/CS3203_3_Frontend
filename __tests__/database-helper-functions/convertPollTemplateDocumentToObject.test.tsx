import '@testing-library/jest-dom'
import { convertPollTemplateDocumentToObject } from '@/utils/DatabaseHelperFunctions'

describe('convertPollTemplateDocumentToObject', () => {

    it('should successfully convert the poll template document to a PollTemplate object', () => {
        //Arrange
        const pollTemplateDocument =
            {
                "_id": {
                    "$oid": "67eaa76bf62e7864f88abd10"
                },
                "category": "Environment",
                "question": "Question 2",
                "question_type": "Open-ended",
                "options": [],
                "reasoning": "Reasoning 2"
            }  
        

        //Action
        const pollTemplateObject = convertPollTemplateDocumentToObject(pollTemplateDocument)

        //Assert length and whether mapping is done correctly
       
        expect(pollTemplateObject.id).toBe("67eaa76bf62e7864f88abd10")
        expect(pollTemplateObject.question).toBe("Question 2")
        expect(pollTemplateObject.category).toBe("Environment")
        expect(pollTemplateObject.reasoning).toBe("Reasoning 2")
        expect(pollTemplateObject.question_type).toBe("Open-ended")
        expect(pollTemplateObject.options.length).toBe(0)
        expect(pollTemplateObject.date_created).toBe("2025-03-17")
    })
})