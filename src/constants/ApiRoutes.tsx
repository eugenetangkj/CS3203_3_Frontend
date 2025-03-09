/**
Routes used for API calling
*/

//Base URL to make API calls
export const API_BASE_URL_ANALYTICS = process.env.NEXT_PUBLIC_API_BASE_URL_ANALYTICS
export const API_BASE_URL_ADMIN_MANAGEMENT = process.env.NEXT_PUBLIC_API_BASE_URL_ADMIN_MANAGEMENT
export const API_BASE_URL_USER_MANAGEMENT = process.env.NEXT_PUBLIC_API_BASE_URL_USER_MANAGEMENT

//Endpoints for analytics service (analytics dashboard)
export const GET_COMPLAINTS_GROUPED_BY_FIELD_ENDPOINT = 'get_complaints_grouped_by_field'
export const GET_COMPLAINTS_GROUPED_BY_FIELD_OVER_TIME_ENDPOINT = 'get_complaints_grouped_by_field_over_time'
export const GET_COMPLAINTS_GROUPED_BY_SENTIMENT_VALUE_ENDPOINT = 'get_complaints_grouped_by_sentiment_value'
export const GET_COMPLAINTS_SORTED_BY_FIELDS_ENDPOINT = 'get_complaints_sorted_by_fields'

//Endpoints for admin management service (categories)
export const CATEGORIES_GET_ALL_ENDPOINT = "categories/get_all"
export const CATEGORIES_GET_BY_OID_ENDPOINT = "categories/get_by_oid"
export const CATEGORIES_INSERT_ONE_ENDPOINT = "categories/insert_one"
export const CATEGORIES_DELETE_BY_OID_ENDPOINT = "categories/delete_by_oid"
export const CATEGORIES_UPDATE_BY_OID_ENDPOINT = "categories/update_by_oid"

//Endpoints for admin management service (complaints)
export const COMPLAINTS_GET_BY_OID_ENDPOINT = "complaints/get_by_oid"
export const COMPLAINTS_DELETE_BY_OID_ENDPOINT = "complaints/delete_by_oid"
export const COMPLAINTS_SEARCH_ENDPOINT = "complaints/search"
export const COMPLAINTS_DELETE_MANY_BY_OIDS_ENDPOINT = "complaints/delete_many_by_oids"
export const COMPLAINTS_UPDATE_BY_OID_ENDPOINT = "complaints/update_by_oid"


//Endpoints for analytics service (category analytics)
export const GET_CATEGORY_ANALYTICS_BY_NAME_ENDPOINT = "get_category_analytics_by_name"
export const GET_COMPLAINTS_STATISTICS_ENDPOINT = "get_complaints_statistics"
export const GET_COMPLAINTS_STATISTICS_OVER_TIME_ENDPOINT = "get_complaints_statistics_over_time"


//Endpoints for user management
export const SIGNUP_ENDPOINT = "signup"
export const LOGIN_ENDPOINT = "login"
export const GET_PROFILE_BY_OID_ENDPOINT = "get_profile_by_oid"


//Endpoints for cookie setting, on server side
export const SIGNIN_SERVER_ENDPOINT = '/api/signin'
export const SIGNOUT_SERVER_ENDPOINT = '/api/signout'
export const CHECK_USER_AUTH_SERVER_ENDPOINT = '/api/checkuserauth'
