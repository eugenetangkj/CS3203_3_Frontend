import { User, UserRoleEnum } from "@/types/User"
import BasicInformationProfileCard from "./BasicInformationProfileCard";
import CollectiblesProfileCard from "./CollectiblesProfileCard";
import { Button } from "../ui/button";
import Link from "next/link";

/** 
This component represents the container for the profile cards to be displayed in the profile page.
*/
interface ProfileCardsProps {
    currentUser: User
}

export default async function ProfileCards({ currentUser }: ProfileCardsProps) {
    return (
        <div className='flex flex-col items-center space-y-6'>
            {/* Add admin account button */}
            {
                currentUser.role === UserRoleEnum.Admin &&
                <Link className='self-end' href='/create-admin'>
                    <Button className="rounded-full bg-yap-orange-900 hover:bg-yap-orange-800 duration-200 text-white text-base">Create Admin Account</Button>
                </Link>
            }

            {/* Profile cards */}
            <div className='grid grid-rows-1 grid-cols-1 lg:grid-cols-6 w-full gap-y-4 lg:gap-x-8 lg:gap-y-0'>
                <BasicInformationProfileCard user={ currentUser as User }/>

                {/* Only display collectibles for citizen */}
                {
                    currentUser?.role && currentUser?.role === UserRoleEnum.Citizen && <CollectiblesProfileCard user={ currentUser } />
                }
            </div>
        </div>
    )
}
