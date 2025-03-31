/**
Routes used for API calling
*/

//Base URL to make API calls
export const API_BASE_URL_ANALYTICS = process.env.NEXT_PUBLIC_API_BASE_URL_ANALYTICS
export const API_BASE_URL_ADMIN_MANAGEMENT = process.env.NEXT_PUBLIC_API_BASE_URL_ADMIN_MANAGEMENT
export const API_BASE_URL_USER_MANAGEMENT = process.env.NEXT_PUBLIC_API_BASE_URL_USER_MANAGEMENT

//Endpoints for analytics service (analytics dashboard)
export const COMPLAINTS_GET_STATISTICS_GROUPED_ENDPOINT = '/complaints/get_statistics_grouped'
export const COMPLAINTS_GET_STATISTICS_GROUPED_OVER_TIME_ENDPOINT = '/complaints/get_statistics_grouped_over_time'
export const COMPLAINTS_GET_STATISTICS_GROUPED_BY_SENTIMENT_VALUE_ENDPOINT = '/complaints/get_statistics_grouped_by_sentiment_value'

//Endpoints for admin management service (categories)
export const CATEGORIES_GET_ALL_ENDPOINT = "/categories/get_all"
export const CATEGORIES_GET_BY_OID_ENDPOINT = "/categories/get_by_oid"
export const CATEGORIES_INSERT_ONE_ENDPOINT = "/categories/insert_one"
export const CATEGORIES_DELETE_BY_OID_ENDPOINT = "/categories/delete_by_oid"
export const CATEGORIES_UPDATE_BY_OID_ENDPOINT = "/categories/update_by_oid"

//Endpoints for admin management service (complaints)
export const COMPLAINTS_GET_BY_OID_ENDPOINT = "/complaints/get_by_oid"
export const COMPLAINTS_GET_MANY_ENDPOINT = "/complaints/get_many"
export const COMPLAINTS_DELETE_MANY_BY_OIDS_ENDPOINT = "/complaints/delete_many_by_oids"
export const COMPLAINTS_UPDATE_BY_OID_ENDPOINT = "/complaints/update_by_oid"
export const COMPLAINTS_GET_COUNT_ENDPOINT = "/complaints/get_count"

//Endpoints for admin management service (poll templates)
export const POLL_TEMPLATES_GET_ALL_ENDPOINT = "/poll_templates/get_all"
export const POLL_TEMPLATES_GET_BY_OID_ENDPOINT = "/poll_templates/get_by_oid"

//Endpoints for admin management service (polls)
export const POLLS_INSERT_ONE_ENDPOINT = "/polls/insert_one"
export const POLLS_GET_BY_OID_ENDPOINT = "/polls/get_by_oid"
export const POLLS_GET_MANY_ENDPOINT = "/polls/get_many"
export const POLLS_GET_COUNT_ENDPOINT = "/polls/get_count"
export const POLLS_DELETE_BY_OID_ENDPOINT = "/polls/delete_by_oid"
export const POLLS_DELETE_MANY_BY_OIDS_ENDPOINT = "/polls/delete_many_by_oids"
export const POLLS_UPDATE_BY_OID_ENDPOINT = "/polls/update_by_oid"

//Endpoints for admin management service (poll responses)
export const POLL_RESPONSES_INSERT_ONE_ENDPOINT = "/poll_responses/insert_one"
export const POLL_RESPONSES_GET_ONE_ENDPOINT = "/poll_responses/get_one"
export const POLL_RESPONSES_GET_MANY_ENDPOINT = "/poll_responses/get_many"
export const POLL_RESPONSES_GET_STATISTICS_ENDPOINT = "/poll_responses/get_statistics"
export const POLL_RESPONSES_GET_COUNT_ENDPOINT = "/poll_responses/get_count"

//Endpoints for analytics service (category analytics)
export const CATEGORY_ANALYTICS_GET_BY_NAME = "/category_analytics/get_by_name"
export const COMPLAINTS_GET_STATISTICS_ENDPOINT = "/complaints/get_statistics"
export const COMPLAINTS_GET_STATISTICS_OVER_TIME_ENDPOINT = "/complaints/get_statistics_over_time"

//Endpoints for user management
export const SIGNUP_ENDPOINT = "/signup"
export const LOGIN_ENDPOINT = "/login"
export const GET_PROFILE_BY_OID_ENDPOINT = "/get_profile_by_oid"
export const UPDATE_PROFILE_BY_OID_ENDPOINT = "/update_profile_by_oid"

//Endpoints for cookie setting and accessing, on server side
export const SIGNIN_SERVER_ENDPOINT = '/api/signin'
export const SIGNOUT_SERVER_ENDPOINT = '/api/signout'
export const CHECK_USER_AUTH_SERVER_ENDPOINT = '/api/checkuserauth'
