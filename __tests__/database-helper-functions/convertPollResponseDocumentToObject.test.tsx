import '@testing-library/jest-dom'
import { convertPollResponseDocumentToObject } from '@/utils/DatabaseHelperFunctions'

describe('convertPollResponseDocumentToObject', () => {

    it('should successfully convert the poll response document to a PollResponse object', () => {
        //Arrange
        const pollResponseDocument =
        {
            "_id": {
                "$oid": "67da891dbb0d0f2b82082521"
            },
            "user_id": "67d93e8c3c0bfe14510691b1",
            "poll_id": "67da871c1447ef5cec00d5f1",
            "response": "Maxwell Food Centre",
            "date_submitted": "01-01-2022 00:00:00"
        }

        //Action
        const pollResponseObjecct = convertPollResponseDocumentToObject(pollResponseDocument)

        //Assert whether mapping is done correctly
        expect(pollResponseObjecct.id).toBe("67da891dbb0d0f2b82082521")
        expect(pollResponseObjecct.poll_id).toBe("67da871c1447ef5cec00d5f1")
        expect(pollResponseObjecct.response).toBe("Maxwell Food Centre")
        expect(pollResponseObjecct.date_submitted).toBe("01-01-2022 00:00:00")
        expect(pollResponseObjecct.user_id).toBe("67d93e8c3c0bfe14510691b1")
    })
})
