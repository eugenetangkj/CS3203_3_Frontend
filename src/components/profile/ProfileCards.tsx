"use client"

import { useState, useEffect } from "react"
import { User, UserRoleEnum } from "@/types/User"
import { Skeleton } from "../ui/skeleton"
import BasicInformationProfileCard from "./BasicInformationProfileCard";
import CollectiblesProfileCard from "./CollectiblesProfileCard";
import axios from "axios";
import { API_BASE_URL_USER_MANAGEMENT, GET_PROFILE_BY_OID_ENDPOINT } from "@/constants/ApiRoutes";
import { CHECK_USER_AUTH_SERVER_ENDPOINT } from "@/constants/ApiRoutes";


/** 
This component represents the container for the profile cards to be displayed in the profile page.
*/
export default function ProfileCards() {
    //States
    const [hasRanApi, setHasRanApi] = useState<boolean>(false)
    const [isThereError, setIsThereError] = useState<boolean>(false)
    const [currentUser, setCurrentUser] = useState<User>()



    //Adapter function to convert API response to a User object
    const mapResponseToUser = (profileData: any): User => {
        return {
            id: profileData._id.$oid,
            email: profileData.email,
            name: profileData.name,
            role: profileData.role,
            collectibles: []  //Just default set to empty array first
        };
    };


    //Calls backend to fetch profile information
    const fetchUser = async () => {
        try {
            //Call API
            const response = await axios.post(CHECK_USER_AUTH_SERVER_ENDPOINT);
            const userOid = response.data.userOid
            const fetchUserProfileApiEndpoint = API_BASE_URL_USER_MANAGEMENT + '/' + GET_PROFILE_BY_OID_ENDPOINT
            const userData = await axios.post(fetchUserProfileApiEndpoint,
                {
                    "oid": userOid
                }
            )
           
            const currentUser = mapResponseToUser(userData.data.profile)
        
            //Update state
            setCurrentUser(currentUser)
        } catch (error) {
            setIsThereError(true)
        } finally {
            setHasRanApi(true)
        }
    }


    //Fetch profile information on component mount
    useEffect(() => {
        fetchUser()
    }, [])



    return (
        !hasRanApi
        ? (<Skeleton className="w-full h-[200px]" />)
        : isThereError
        ? <div>Something went wrong. Please try again later.</div>
        : (
            <div className='grid grid-rows-1 grid-cols-1 lg:grid-cols-6 w-full gap-y-4 lg:gap-x-8 lg:gap-y-0'>
                <BasicInformationProfileCard user={ currentUser }/>

                {/* Only display collectibles for citizen */}
                {
                    currentUser?.role && currentUser?.role === UserRoleEnum.Citizen && <CollectiblesProfileCard user={ currentUser } />
                }
            </div>
        )      
    )
   





}
