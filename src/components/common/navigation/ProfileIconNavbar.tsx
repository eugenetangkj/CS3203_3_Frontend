"use client"

import Profile from "../../../../public/profile.svg";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast"
import { ERROR_MESSAGE_API } from "@/constants/Constants";
import { setCookiesForSigningOut } from "@/controllers/UsersController";
import { mutate } from "swr";
import { USERS_GET_PROFILE_SWR_HOOK } from "@/constants/SwrHooks";
import { UserRoleEnum } from "@/types/User";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

/**
This component represents the profile icon that appears in the navbar if the user is signed in, allowing for viewing profile and signing out
*/
export default function ProfileIconNavbar() {
    //States
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { toast } = useToast()
    const router = useRouter()

    //Sign out by deleting the JWT token
    const handleSignOut = async () => {
        try {
            setCookiesForSigningOut()
            mutate(USERS_GET_PROFILE_SWR_HOOK, {
                    id: '',
                    email: '',
                    name: '',
                    role: UserRoleEnum.None,
                    collectibles: []
            })
            toast({
                variant: "success",
                description: "You have successfully signed out.",
                duration: 3000,
            })
            router.push('/')
        } catch (error) {
            toast({
                variant: "destructive",
                description: ERROR_MESSAGE_API,
                duration: 3000,
            })
        }
    };
  
    return (
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen} modal={false}>
                <DropdownMenuTrigger asChild className='font-afacad text-base text-yap-black-800'>
                    <Image src={Profile} alt="Profile image" className="w-8 h-8 rounded-full object-cover cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className='font-afacad text-yap-black-800'>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link href='/profile' onClick={ () => setIsDropdownOpen(false)}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <button onClick={ handleSignOut }>Sign Out</button>
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
    );
}
