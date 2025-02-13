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
