/**
An interface that represents a Poll, which can be either user-generated
or AI-generated.
*/
export interface Poll {
    id: string,
    question: string
    category: string,
    question_type: string,
    options: string[],
    date_created: string | null,
    date_published: string | null,
    date_closed: string | null,
    status: string  
}


/**
An interface that represents a poll template which is AI-generated.
*/
export interface PollTemplate {
    id: string,
    question: string,
    category: string,
    reasoning: string,
    question_type: string,
    options: string[],
    date_created: string
}


/**
An interface that represents a poll response
*/
export interface PollResponse {
    id: string,
    poll_id: string,
    response: string,
    date_submitted: string,
    user_id: string
}


/**
The possible question types available
 */
export enum PollQuestionTypeEnum {
    MCQ = 'MCQ',
    OpenEnded = 'Open-ended',
}


/**
The possible status available
*/
export enum PollStatusEnum {
    Unpublished = 'Unpublished',
    Published = 'Published',
    Closed = 'Closed'
}