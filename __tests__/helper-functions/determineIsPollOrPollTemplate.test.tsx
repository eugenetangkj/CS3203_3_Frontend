import '@testing-library/jest-dom'
import { determineIsPollOrPollTemplate } from "@/utils/HelperFunctions";
import { Poll, PollQuestionTypeEnum, PollTemplate } from '@/types/Poll';


describe('determineIsPollOrPollTemplate', () => {
    it('should return true if the input is a poll', () => {
        const poll : Poll = {
            id: '1',
            question: 'Question',
            category: 'Environment',
            question_type: PollQuestionTypeEnum.MCQ,
            options: ['Yes', 'No'],
            date_created: '31-01-2024 23:50:50',
            date_published: '31-01-2024 23:50:50',
            date_closed: '31-01-2024 23:50:50',
            status: 'Unpublished',
        }
        const isPoll = determineIsPollOrPollTemplate(poll)
        expect(isPoll).toBe(true)
    })

    it('should return false if the input is a poll template', () => {
        const pollTemplate : PollTemplate = {
            id: '1',
            question: 'Question',
            category: 'Environment',
            reasoning: 'Reasoning',
            question_type: PollQuestionTypeEnum.MCQ,
            options: ['Yes', 'No'],
            date_created: '31-01-2024 23:50:50',
        }
        const isPoll = determineIsPollOrPollTemplate(pollTemplate)
        expect(isPoll).toBe(false)
    })
})