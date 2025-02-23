/**
Constant values used across files
*/
export const START_DATE = "01-01-2000 00:00:00"


/**
Error message if API call is not successful
*/
export const ERROR_MESSAGE_API = "Something went wrong. Please try again later."

/**
String to look out for to determine if the uniqueness property has been violated.
*/
export const DUPLICATE_KEY_STRING = "duplicate key error collection"


/**
Category object that represents 'All Categories', used for filtering search results by categories
 */
export const ALL_CATEGORIES_ID = "all-categories"
export const ALL_CATEGORIES_NAME = 'All Categories'
export const ALL_CATEGORIES_CATEGORY = { id: ALL_CATEGORIES_ID, name: "All Categories", colour: "#000000" }
