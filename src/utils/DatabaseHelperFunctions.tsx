import { Category } from "@/types/Category"
import { Complaint } from "@/types/Complaint";
import { Poll, PollResponse, PollTemplate } from "@/types/Poll";

/**
Helper functions to convert database documents into interfaces used in frontend
*/

/**
Converts a list of MongoDB Category documents into a list of Category objects
*/
export const convertCategoryDocumentsToObjects = (categories: any[]) : Category[] => {
    return categories.map(category => ({
        id: category._id.$oid,
        name: category.name,
        colour: category.color,
    }));
}

/**
Converts a list of Category objects into a colour map.

{
    "Environment": "#000000"
    "Healthcare": "#AAAAAA"
    ...
}
*/
export const convertCategoryObjectsToColourMap = (categories: any[]): Record<string, string> => {
    return categories.reduce((acc, category) => {
        acc[category.name] = category.colour;
        return acc;
    }, {} as Record<string, string>);
};


/**
Converts a list of MongoDB Category documents into a colour map.

{
    "Environment": "#000000"
    "Healthcare": "#AAAAAA"
    ...
}
*/
export const convertCategoryDocumentsToColourMap = (documents: { name: string; color: string }[]): Record<string, string> => {
    return documents.reduce((acc, doc) => {
        if (doc.name && doc.color) {
            acc[doc.name] = doc.color;
        }
        return acc;
    }, {} as Record<string, string>);
}


/** 
Converts a list of MongoDB Complaint documents into a list of Complaint objects
*/
export const convertComplaintDocumentsToObjects = (complaints: any[]) : Complaint[] => {
    return complaints.map(complaint => ({
        oid: complaint._id.$oid,
        id: complaint.id,
        title: complaint.title,
        description: complaint.description,
        date: complaint.date,
        category: complaint.category,
        source: complaint.source,
        sentiment: complaint.sentiment,
        url: complaint.url
    }));
}


/** 
Converts a MongoDB Poll Template document into a Poll Template object
*/
export const convertPollTemplateDocumentToObject = (pollTemplate : any) : PollTemplate => {
    return  {
        id: pollTemplate._id.$oid,
        category: pollTemplate.category,
        question: pollTemplate.question,
        question_type: pollTemplate.question_type,
        options: pollTemplate.options,
        reasoning: pollTemplate.reasoning,
        date_created: "2025-03-17" //TODO: Update this again

    }
}

/** 
Converts a list of MongoDB Poll Template documents into a list of Poll Template objects
*/
export const convertPollTemplateDocumentsToObjects = (pollTemplates: any[]) : PollTemplate[] => {
    return pollTemplates.map(pollTemplate => ({
        id: pollTemplate._id.$oid,
        category: pollTemplate.category,
        question: pollTemplate.question,
        question_type: pollTemplate.question_type,
        options: pollTemplate.options,
        reasoning: pollTemplate.reasoning,
        date_created: "2025-03-17" //TODO: Update this again
    }));
}


/** 
Converts a  MongoDB Poll document into a Poll object.
*/
export const convertPollDocumentToObject = (poll: any) : Poll => {
    return {
        id: poll._id.$oid,
        category: poll.category,
        question: poll.question,
        question_type: poll.question_type,
        options: poll.options,
        date_created: poll.date_created,
        date_published: poll.date_published,
        date_closed: poll.date_closed,
        status: poll.status
    }
}


/** 
Converts a list of MongoDB Poll documents into a list of Poll objects
*/
export const convertPollDocumentsToObjects = (polls: any[]) : Poll[] => {
    return polls.map(poll => ({
        id: poll._id.$oid,
        category: poll.category,
        question: poll.question,
        question_type: poll.question_type,
        options: poll.options,
        date_created: poll.date_created,
        date_published: poll.date_published,
        date_closed: poll.date_closed,
        status: poll.status
    }));
}


/**
Converts a list of MongoDB Poll Response documents into a list of PollResponse objects
*/
export const convertPollResponseDocumentsToObjects = (pollResponses: any[]) : PollResponse[] => {
    return pollResponses.map(pollResponse => ({
        id: pollResponse._id.$oid,
        poll_id: pollResponse.poll_id,
        response: pollResponse.response,
        date_submitted: pollResponse.date_submitted,
        user_id: pollResponse.user_id  
    }))
}


/**
Converts a MongoDB Poll Response document into a PollResponse object
*/
export const convertPollResponseDocumentToObject = (pollResponse: any) : PollResponse => {
    return {
        id: pollResponse._id.$oid,
        poll_id: pollResponse.poll_id,
        response: pollResponse.response,
        date_submitted: pollResponse.date_submitted,
        user_id: pollResponse.user_id  
    }
}
