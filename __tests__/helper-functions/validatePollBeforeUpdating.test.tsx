import '@testing-library/jest-dom'
import { validatePollBeforeUpdating, hasDuplicateStrings } from "@/utils/HelperFunctions";
import { Poll, PollQuestionTypeEnum } from '@/types/Poll';
import { ERROR_MESSAGES_POLL_VALIDATION } from '@/constants/Constants';

//Mock hasDuplicateStrings because validatePollBeforeUpdating relies on it, but we need to isolate for unit testing
jest.mock('@/utils/HelperFunctions', () => ({
    ...jest.requireActual('@/utils/HelperFunctions'),
    hasDuplicateStrings: jest.fn(),
}));


describe('validatePollBeforeUpdating', () => {
    let poll: Poll

    beforeEach(() => {
        poll = {
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
    })

    afterEach(() => {
        jest.clearAllMocks()
    })


    describe('should return an empty error message', () => {
        beforeEach(() => {
            (hasDuplicateStrings as jest.Mock).mockReturnValue(false)
        })

        it('if the poll meets all the criteria', () => {
            const errorMessage = validatePollBeforeUpdating(poll)
            expect(errorMessage).toBe('')
        })

        it('if the poll meets all the criteria with 3 options as a MCQ', () => {
            poll.options = ['Yes', 'No', 'Maybe']
            const errorMessage = validatePollBeforeUpdating(poll)
            expect(errorMessage).toBe('')
        })

        it('if the poll has less than 2 options but it is an open-ended question', () => {
            poll.question_type = PollQuestionTypeEnum.OpenEnded
            const errorMessage = validatePollBeforeUpdating(poll)
            expect(errorMessage).toBe('')
        })

        it('if the poll has duplicated options ptions but it is an open-ended question', () => {
            (hasDuplicateStrings as jest.Mock).mockReturnValue(true)
            poll.question_type = PollQuestionTypeEnum.OpenEnded
            poll.options = ['Yes', 'Yes']
            const errorMessage = validatePollBeforeUpdating(poll)
            expect(errorMessage).toBe('')
        })    
    })


    describe('should return an error message if the poll has an empty question', () => {
        beforeEach(() => {
            (hasDuplicateStrings as jest.Mock).mockReturnValue(false)
        })

        it('where the question is an empty string', () => {
            poll.question = ''
            const errorMessage = validatePollBeforeUpdating(poll)
            expect(errorMessage).toBe(ERROR_MESSAGES_POLL_VALIDATION.emptyQuestion)
        })

        it('where the question is pure whitespace', () => {
            poll.question = '  '
            const errorMessage = validatePollBeforeUpdating(poll)
            expect(errorMessage).toBe(ERROR_MESSAGES_POLL_VALIDATION.emptyQuestion)
        })
    })


    describe('should return an error message if the poll has an empty category', () => {
        beforeEach(() => {
            (hasDuplicateStrings as jest.Mock).mockReturnValue(false)
        })

        it('where the category is an empty string', () => {
            poll.category = ''
            const errorMessage = validatePollBeforeUpdating(poll)
            expect(errorMessage).toBe(ERROR_MESSAGES_POLL_VALIDATION.emptyCategory)
        })

        it('where the category is pure whitespace', () => {
            poll.category = '  '
            const errorMessage = validatePollBeforeUpdating(poll)
            expect(errorMessage).toBe(ERROR_MESSAGES_POLL_VALIDATION.emptyCategory)
        })
    })


    describe('should return an error message if the poll is a MCQ and has less than 2 options', () => {
        beforeEach(() => {
            (hasDuplicateStrings as jest.Mock).mockReturnValue(false)
        })

        it('where the poll has only 1 option', () => {
            poll.options = ['Option 1']
            const errorMessage = validatePollBeforeUpdating(poll)
            expect(errorMessage).toBe(ERROR_MESSAGES_POLL_VALIDATION.insufficientOptions)
        })
    })


    describe('should return an error message if the poll is a MCQ and has duplicated options', () => {
        beforeEach(() => {
            (hasDuplicateStrings as jest.Mock).mockReturnValue(true)
        })

        it('where the poll has only 2 duplicated options', () => {
            poll.options = ['Option 1', 'Option 2', 'Option 1']
            const errorMessage = validatePollBeforeUpdating(poll)
            expect(errorMessage).toBe(ERROR_MESSAGES_POLL_VALIDATION.duplicatedOptions)
        })
    })
})
