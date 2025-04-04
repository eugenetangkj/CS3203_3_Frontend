import '@testing-library/jest-dom'
import { convertPollResponseDocumentsToObjects } from '@/utils/DatabaseHelperFunctions'

describe('convertPollResponseDocumentsToObjects', () => {

    it("should return an empty array when given an empty array of poll response documents", () => {
        const pollResponsesObjects = convertPollResponseDocumentsToObjects([])
        expect(pollResponsesObjects.length).toBe(0)
    })

    it('should successfully convert poll response documents to PollResponse objects', () => {
        //Arrange
        const pollResponseDocuments = [
            {
                "_id": {
                    "$oid": "67da891dbb0d0f2b82082520"
                },
                "user_id": "67d93e8c3c0bfe14510691b0",
                "poll_id": "67da871c1447ef5cec00d5f0",
                "response": "Satisfied",
                "date_submitted": "01-01-2021 00:00:00"
            },
            {
                "_id": {
                    "$oid": "67da891dbb0d0f2b82082521"
                },
                "user_id": "67d93e8c3c0bfe14510691b1",
                "poll_id": "67da871c1447ef5cec00d5f1",
                "response": "Maxwell Food Centre",
                "date_submitted": "01-01-2022 00:00:00"
            }
        ]


        //Action
        const pollTemplateObjects = convertPollResponseDocumentsToObjects(pollResponseDocuments)

        //Assert length and whether mapping is done correctly
        expect(pollTemplateObjects.length).toBe(2)

        expect(pollTemplateObjects[0].id).toBe("67da891dbb0d0f2b82082520")
        expect(pollTemplateObjects[0].poll_id).toBe("67da871c1447ef5cec00d5f0")
        expect(pollTemplateObjects[0].response).toBe("Satisfied")
        expect(pollTemplateObjects[0].date_submitted).toBe("01-01-2021 00:00:00")
        expect(pollTemplateObjects[0].user_id).toBe("67d93e8c3c0bfe14510691b0")
    })
})
