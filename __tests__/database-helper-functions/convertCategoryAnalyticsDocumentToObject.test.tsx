import '@testing-library/jest-dom'
import { convertCategoryAnalyticsDocumentToObject } from '@/utils/DatabaseHelperFunctions'

describe('convertCategoryAnalyticsDocumentToObject', () => {

    it('should successfully convert the category analytics document to a CategoryAnalytics object', () => {
        //Arrange
        const categoryAnalyticsDocument = {
            "_id": {
                "$oid": "67eaa76bf62e7864f88abd90"
            },
            "sentiment": 0.076039,
            "name": "Housing",
            "absa_result": [
                {
                    "theme": "Rubbish chute seal",
                    "sentiment": "negative"
                },
                {
                    "theme": "HDB calculator",
                    "sentiment": "negative"
                },
            ],
            "keywords": ["Keyword 1", "Keyword 2"],
            "forecasted_sentiment": -0.157839,
            "summary": "Summary of housing",
            "suggestions": ["Suggestion 1","Suggestion 2"],
            "concerns": ["Concern 1","Concern 2"]
        }

        //Action
        const categoryAnalyticsObject = convertCategoryAnalyticsDocumentToObject(categoryAnalyticsDocument)

        //Assert whether mapping is done correctly
        expect(categoryAnalyticsObject.id).toBe("67eaa76bf62e7864f88abd90")
        expect(categoryAnalyticsObject.name).toBe("Housing")
        expect(categoryAnalyticsObject.suggestions.length).toBe(2)
        expect(categoryAnalyticsObject.suggestions[0]).toBe("Suggestion 1")
        expect(categoryAnalyticsObject.suggestions[1]).toBe("Suggestion 2")
        expect(categoryAnalyticsObject.keywords.length).toBe(2)
        expect(categoryAnalyticsObject.keywords[0]).toBe("Keyword 1")
        expect(categoryAnalyticsObject.keywords[1]).toBe("Keyword 2")
        expect(categoryAnalyticsObject.summary).toBe("Summary of housing")
        expect(categoryAnalyticsObject.forecasted_sentiment).toBe(-0.157839)
        expect(categoryAnalyticsObject.sentiment).toBe(0.076039)
        expect(categoryAnalyticsObject.concerns.length).toBe(2)
        expect(categoryAnalyticsObject.concerns[0]).toBe("Concern 1")
        expect(categoryAnalyticsObject.concerns[1]).toBe("Concern 2")
        expect(categoryAnalyticsObject.absa_result.length).toBe(2)
        expect(categoryAnalyticsObject.absa_result[0].theme).toBe("Rubbish chute seal")
        expect(categoryAnalyticsObject.absa_result[0].sentiment).toBe("negative")
        expect(categoryAnalyticsObject.absa_result[1].theme).toBe("HDB calculator")
        expect(categoryAnalyticsObject.absa_result[1].sentiment).toBe("negative")
    })
})
