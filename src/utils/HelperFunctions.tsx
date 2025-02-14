import { Complaint } from "@/types/Complaint";
import { Source } from "@/types/Source";
import { Category } from "@/types/Category";

/**
    Helper functions that are used across different files
*/


//Gets the current datetime in the format of dd-mm-YYYY HH:MM:SS
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
    .replace(/\//g, "-");
};














//Test if an input string is a valid hexadecimal colour code value
export const isStringValidHex = (color: string) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);


//Test if 2 arrays have the same set of items, regardless of order
export function checkIfArraysAreEqual(arrayOne: any[], arrayTwo: any[]): boolean {
    // Check if arrays have the same length
    if (arrayOne.length !== arrayTwo.length) {
        return false;
    }

    // Convert arrays to sets and check if they have the same size
    const setTwo = new Set(arrayTwo);

    // Check if every element in arr1 exists in set two
    return arrayOne.every(item => setTwo.has(item));
}


//Check if a given Complaint is found in a list of Complaints
export const doesComplaintExistInList = (complaints: Complaint[], complaintToCheck: Complaint): boolean => {
    return complaints.some(c => c.id === complaintToCheck.id);
};

//Check if a given Category is found in a list of Categories
export const doesCategoryExistInList = (categories: Category[], categoryToCheck: Category): boolean => {
    return categories.some(c => c.id === categoryToCheck.id);
};

//Check if a given Source is found in a list of Sources
export const doesSourceExistInList = (sources: Source[], sourceToCheck: Source): boolean => {
    return sources.some(s => s.id === sourceToCheck.id);
};

// Check if 2 lists of Category have the same set of Category, comparing using their ID values
export const areCategoryListsEqual = (listOne: Category[], listTwo: Category[]): boolean => {
    // Sort both arrays by the category id
    const sortedListOne = listOne.sort((a, b) => a.id.localeCompare(b.id));
    const sortedListTwo = listTwo.sort((a, b) => a.id.localeCompare(b.id));
    
    // Check if arrays have the same length
    if (sortedListOne.length !== sortedListTwo.length) return false;

    // Compare each category by id
    return sortedListOne.every((category, index) => category.id === sortedListTwo[index].id);
};

// Check if 2 lists of Source have the same set of Source, comparing using their ID values
export const areSourceListsEqual = (listOne: Source[], listTwo: Source[]): boolean => {
    // Sort both arrays by the source id
    const sortedListOne = listOne.sort((a, b) => a.id.localeCompare(b.id));
    const sortedListTwo = listTwo.sort((a, b) => a.id.localeCompare(b.id));
    
    // Check if arrays have the same length
    if (sortedListOne.length !== sortedListTwo.length) return false;

    // Compare each source by id
    return sortedListOne.every((source, index) => source.id === sortedListTwo[index].id);
};


