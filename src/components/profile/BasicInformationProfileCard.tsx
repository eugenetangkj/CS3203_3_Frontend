"use client"

import { User, UserRoleEnum } from "@/types/User"
import Image from "next/image";
import ProfileImage from "../../../public/graphics/profile-image.svg";
import { capitaliseFirstLetter } from "@/utils/HelperFunctions";


/** 
This component represents the profile card that contains the basic information of the user.
*/
interface BasicInformationProfileCardProps {
    user: User | undefined
}





export default function BasicInformationProfileCard({ user }: BasicInformationProfileCardProps ) {
    const userRoleCapitalised = user?.role == null ? 'Undefined' : capitaliseFirstLetter(user.role)
    const isUserAdmin = userRoleCapitalised ===  UserRoleEnum.Admin
    
    return (
        <div className={`bg-yap-gray-100 p-4 rounded-xl col-span-1 lg:col-span-2 flex flex-col justify-start space-y-4 ${ isUserAdmin && 'lg:col-start-3' }`}>
            <h3 className='text-xl sm:text-2xl text-yap-brown-900 mb-6 self-center'>Basic Information</h3>

            <div className='flex flex-col space-y-12'> 
                <div className='flex flex-col space-y-4 self-center'>
                    <Image src={ProfileImage} alt="Profile Image" className="w-28 h-28 self-center" />
                    <div className={`rounded-full w-fit self-center px-4 py-1 ${ isUserAdmin ? 'bg-yap-green-900' : 'bg-yap-brown-900'}`}>
                        <p className='text-white'>{ user?.role ? userRoleCapitalised : 'Cannot fetch role' }</p>
                    </div>
                    <p className='text-yap-brown-900 text-4xl self-center font-bold'>{ user?.name }</p>
                </div>
            
                <div className='flex flex-col space-y-4 self-center text-center'>
                    <p className='text-yap-black-800'><span className='font-bold'>Email Address: </span>{ user?.email }</p>
                </div>
            </div>

         
        </div>

    )
   





}
