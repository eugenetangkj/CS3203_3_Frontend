/**
An interface that represents a Poll, which can be either user-generated
or AI-generated.
*/
export interface Poll {
    id: number,
    question: string
    category: string,
    question_type: string,
    options: string[],
    date_created: string,
    date_published: string,
    date_closed: string,
    status: string  
}


/**
An interface that represents a poll template which is AI-generated.
*/
export interface PollTemplate {
    id: number,
    question: string,
    category: string,
    reasoning: string,
    question_type: string,
    options: string[],
    date_created: string
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