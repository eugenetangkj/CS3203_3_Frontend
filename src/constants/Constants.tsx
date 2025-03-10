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
Cookie name used to store the user oid
*/
export const COOKIE_USER_OID = 'userOid'


/**
Links to show in the navigation bar
*/
export const NAV_LINKS = [
    {
        route: "/all-complaints",
        id: "all-complaints",
        label: "All Complaints",
        is_admin_only: true,
    },
    {
        route: "/polls",
        id: "polls",
        label: "Polls",
        is_admin_only: false,
    },
    {
        route: "/categories",
        id: "categories",
        label: "Categories",
        is_admin_only: true,
    },
    {
        route: "/analytics",
        id: "analytics",
        label: "Analytics",
        is_admin_only: true,
    },
]


/**
Colour map to access common colour values
*/
export const COLOUR_MAP: Record<string, string> = {
    'yap-black-800': '#3D3A39',
    'yap-green-900': '#92A062',
    'yap-orange-900': '#FF814A',
    'yap-yellow-900': '#FFC64A',
    'yap-brown-900': '#8D5F4A',
    'yap-blue-900': '#8999EA'
};


/**
About Just Yap! write-up found in the homepage
*/
export const ABOUT_JUST_YAP = 'Just Yap! collects real-time complaints from the r/Singapore subreddit and uses machine learning to filter, categorize, and analyze them by sentiment. It then presents insights through visualizations to help authorities understand public concerns. Additionally, Just Yap! suggests AI-generated polls for authorities to engage citizens on trending issues.'

/**
Default complaints shown in the home page
*/
export const COMPLAINTS_IN_HOME_PAGE = [
    {
        title: "Why are MRT trains so crowded?",
        description: "I get that Singapore has a world-class public transport system, but what's the point if I'm squished like a sardine every morning? Can we improve capacity or offer alternatives to avoid this daily struggle?"
    }, 
    {
         title: "HDB renovation noise is driving me nuts!",
        description: "Honestly, is there any way to get some peace at home without feeling like I'm living next to a construction site? Please implement stricter noise curfews to protect residents from constant disturbances."

    }
]
