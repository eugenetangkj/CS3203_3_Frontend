import { Complaint } from "@/types/Complaint";
import { Category } from "@/types/Category";
import { Poll, PollTemplate } from "@/types/Poll";


/**
    Helper functions that are used across different files
*/


//Gets the current datetime in the format of dd-mm-YYYY HH:MM:SS
//Taken from ChatGPT
export const getCurrentDateTime = (): string => {
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    })
    .format(new Date())
    .replace(/\//g, "-") // Replace slashes with hyphens
    .replace(",", "");  // Remove the comma between date and time
};


/**
Gets the datetime that is 1 year ago from the current datetime in the
format of dd-mm-YYYY HH:MM:SS Then, set the day and time to the first
day of that month.

Taken from ChatGPT
*/
export const getDateTimeOneYearAgoAndSetToStart = (): string => {
    //Subtract 1 year
    const now = new Date();
    now.setFullYear(now.getFullYear() - 1);

    //Set to very start of the month
    now.setDate(1);
    now.setHours(0, 0, 0, 0);

    //Format
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    })
    .format(now)
    .replace(/\//g, "-") 
    .replace(",", "");
};


/**
Gets the datetime that is 1 month ago from the current datetime in the
format of dd-mm-YYYY HH:MM:SS. Then, set the day and time to the last
day of that month.

Taken from ChatGPT.
*/
export const getDateTimeOneMonthAgoAndSetToEnd = (): string => {
    // Subtract 1 month
    const now = new Date();
    now.setMonth(now.getMonth() - 1);

    // Set the date to the very end of the month
    const lastDayOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    lastDayOfPreviousMonth.setHours(23, 59, 59, 999);

    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    })
    .format(lastDayOfPreviousMonth)
    .replace(/\//g, "-")  // Replace slashes with hyphens
    .replace(",", "");    // Remove the comma between date and time
};


//Capitalises the first character of every word in a given string
//Taken from https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
export const capitaliseFirstLetter = (val: string) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}


/**
Check if a given Complaint is found in a list of Complaints by comparing the oid value.
*/
export const doesComplaintExistInList = (complaints: Complaint[], complaintToCheck: Complaint): boolean => {
    return complaints.some(c => c.oid === complaintToCheck.oid);
};


/**
* Find a given Category object from a list of Category objects by matching name
* 
* @param categories: List of Category objects to search from
* @param name: Name of category to use for searching
* 
* @return The given Category object is found, else null
*/
export const findCategoryObjectFromListGivenName = (categories: Category[], name: string): Category | null => {
    const foundCategory = categories.find(category => category.name === name);
    return foundCategory || null;
}


/**
 * Helper function to determine if a given poll is a Poll or PollTemplate
 * 
 * @param poll A Poll or PollTemplate object to check
 * 
 * @returns true if it is a poll, false if it is a poll template
 */

export const determineIsPollOrPollTemplate = (poll: Poll | PollTemplate): poll is Poll => {
    return !("reasoning" in poll)
}


/**
 * Checks if a given input is an empty object, {}
 * 
 * @param inputObject The object to check
 * 
 * @returns true if the object is empty, else false
 */
export const determineIsObjectEmpty = (inputObject: any) => {
    return  (Object.keys(inputObject).length === 0 && inputObject.constructor === Object)
}