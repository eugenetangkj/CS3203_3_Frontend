/**
An interface that represents a Poll, which can be either user-generated
or AI-generated.
*/
export interface Poll {
    id: number,
    question: string
    description: string,
    reasoning: string,
    type: string,
    options: string[],
    date_created: string,
    date_published: string,
    date_closed: string,
    is_ai_generated: boolean,
    status: string  
}