import { Collectible } from "@/types/Collectible"

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


/**
List that contains all possible collectibles
*/
export const ALL_COLLECTIBLES: Collectible[] = [
    {
        id: '1',
        name: "Collectible 1",
        path: ""
    },
    {
        id: '2',
        name: "Collectible 2",
        path: ""
    },
    {
        id: '3',
        name: "Complain King",
        path: "/graphics/collectibles/complain-king.svg"
    },
    {
        id: '4',
        name: "Angry Yappy",
        path: "/graphics/collectibles/angry-yappy.svg"
    },
    {
        id: '5',
        name: "Collectible 5",
        path: ""
    },
    {
        id: '6',
        name: "Collectible 6",
        path: ""
    },
]


/**
Path for unknown collectible image
*/
export const PATH_UNKNOWN_COLLECTIBLE_IMAGE = "/graphics/collectibles/unknown.svg"


/**
Cookie name used to store the JWT token 
*/
export const COOKIE_JWT_TOKEN = 'jwtToken'


/**
Links to show in the navigation bar
*/
export const NAV_LINKS = [
    {
        route: "/all-complaints",
        id: "all-complaints",
        label: "All Complaints"
    },
    {
        route: "/polls",
        id: "polls",
        label: "Polls"
    },
    {
        route: "/analytics",
        id: "analytics",
        label: "Analytics"
    },
    {
        route: "/categories",
        id: "categories",
        label: "Categories"
    }
]