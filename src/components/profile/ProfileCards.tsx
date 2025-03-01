"use client"

import { useState, useEffect } from "react"
import { User, UserRoleEnum } from "@/types/User"
import { Skeleton } from "../ui/skeleton"
import BasicInformationProfileCard from "./BasicInformationProfileCard";
import CollectiblesProfileCard from "./CollectiblesProfileCard";
import { capitaliseFirstLetter } from "@/utils/HelperFunctions";


/** 
This component represents the container for the profile cards to be displayed in the profile page.
*/
export default function ProfileCards() {
    //States
    const [hasRanApi, setHasRanApi] = useState<boolean>(false)
    const [isThereError, setIsThereError] = useState<boolean>(false)
    const [currentUser, setCurrentUser] = useState<User>()



    //Calls backend to fetch profile information
    const fetchUser = async () => {
        try {
            //Call API
           

            //Process data


            //Update state
            setCurrentUser({
                id: 'id',
                email: 'sallyfong@gmail.com',
                name: 'Sally Fong',
                role: 'citizen',
                collectibles: ['Angry Yappy', 'Complain King']
            })
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
                    currentUser?.role && capitaliseFirstLetter(currentUser?.role) === UserRoleEnum.Citizen && <CollectiblesProfileCard user={currentUser } />
                }
            </div>
        )      
    )
   





}
