//Constants for test scripts and functions
const MONGO_URI = "mongodb://localhost:27017/"
const DB_NAME = "CS3203"
const COLLECTION_NAMES = {
    "categories": "categories",
    "sources": "sources",
    "posts": "posts",
    "complaints": "complaints",
    "categoryAnalytics": "category_analytics",
    "users": "users",
    "polls": "polls",
    "pollResponses": "poll_responses"
}

export default { MONGO_URI, DB_NAME, COLLECTION_NAMES };