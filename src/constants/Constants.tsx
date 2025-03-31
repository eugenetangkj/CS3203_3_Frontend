import { Collectible } from "@/types/Collectible"

/**
Constant values used across files
*/
export const START_DATE = "01-01-2000 00:00:00"

/**
Indicates success
*/
export const SUCCESS = "Success"

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

/**
Breakpoints for customisation
*/
export const BREAKPOINTS = {
    'xs': 400,
    'sm': 640,
    'md': 768,
    'lg': 1024,
    'xl': 1280,
    '2xl': 1536,
    '3xl': 1800
}


/**
Range of values that is allowed for a sentiment value
*/
export const SENTIMENTS_RANGE = [-1, 1]


/**
The list of possible Poll question types
*/
export const POSSIBLE_POLL_QUESTION_TYPES: string[] = ["MCQ", "Open-ended"]


/**
The list of paths for possible collectible images
*/
export const POSSIBLE_COLLECTIBLE_PATHS: string[] = [
    '/graphics/collectibles/be-a-complain-king.svg',
    '/graphics/collectibles/chewing-grumblegum.svg',
    '/graphics/collectibles/complane-in-the-air.svg',
    '/graphics/collectibles/do-you-love-du-rant.svg',
    '/graphics/collectibles/its-yappy-hour.svg',
    '/graphics/collectibles/whine-together.svg'
]
/**
List that contains all possible collectibles
*/
export const ALL_COLLECTIBLES: Collectible[] = [
    {
        id: '1',
        name: "Be a Complain King",
        path: POSSIBLE_COLLECTIBLE_PATHS[0]
    },
    {
        id: '2',
        name: "Chewing Grumblegum",
        path: POSSIBLE_COLLECTIBLE_PATHS[1]
    },
    {
        id: '3',
        name: "Complane in the Air",
        path: POSSIBLE_COLLECTIBLE_PATHS[2]
    },
    {
        id: '4',
        name: "Do you love du-rant?",
        path: POSSIBLE_COLLECTIBLE_PATHS[3]
    },
    {
        id: '5',
        name: "It's Yappy Hour",
        path: POSSIBLE_COLLECTIBLE_PATHS[4]
    },
    {
        id: '6',
        name: "Whine Together?",
        path: POSSIBLE_COLLECTIBLE_PATHS[5]
    },
]


/**
Path for unknown collectible image
*/
export const PATH_UNKNOWN_COLLECTIBLE_IMAGE = "/graphics/collectibles/unknown.svg"


/**
Randomly get a path from the possible collectible paths
*/
export const getRandomCollectible = () => {
    const randomIndex = Math.floor(Math.random() * POSSIBLE_COLLECTIBLE_PATHS.length);
    return POSSIBLE_COLLECTIBLE_PATHS[randomIndex];
};


/**
API error message for incorrect credentials
*/
export const NO_MATCHING_DOCUMENTS_API_ERROR_MESSAGE = 'Server processed get request successfully but no matching documents found'


/**
A very large number
*/
export const VERY_LARGE_NUMBER = 100000


/**
An empty category
*/
export const EMPTY_CATEGORY = {id: "", name: "", colour: ""}



/**
Error messages for poll validation
*/
export const ERROR_MESSAGES_POLL_VALIDATION = {
    emptyQuestion: 'Please enter your poll question.',
    emptyCategory: 'Please select a category.',
    insufficientOptions: 'Please input at least 2 options for a MCQ question.',
    duplicatedOptions: 'There are duplicated options in the MCQ.'

}