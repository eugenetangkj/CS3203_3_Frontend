"use client"

import Profile from "../../../../public/profile.svg";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { SIGNOUT_SERVER_ENDPOINT } from "@/constants/ApiRoutes";
import axios from "axios";
import { useToast } from "@/hooks/use-toast"
import { ERROR_MESSAGE_API } from "@/constants/Constants";
import { useRouter } from "next/navigation";

/**
This component represents the profile icon that appears in the navbar if the user is signed in, allowing for viewing profile and signing out
*/
export default function ProfileIconNavbar() {
    //States
    const { logout } = useAuth();

    //Toast management
    const { toast } = useToast()

    //Router
    const router = useRouter();


    
    //Sign out by deleting the JWT token
    const handleSignOut = async () => {
        try {
            await axios.post(SIGNOUT_SERVER_ENDPOINT);
            logout();
            toast({
                variant: "success",
                description: "You have successfully signed out.",
                duration: 3000,
            })
            router.push('/');
        } catch (error) {
            toast({
                variant: "destructive",
                description: ERROR_MESSAGE_API,
                duration: 3000,
            })
        }
    };
  

    return (
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild className='font-afacad text-base text-yap-black-800'>
                    <Image src={Profile} alt="Profile image" className="w-8 h-8 rounded-full object-cover cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className='font-afacad text-yap-black-800'>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <a href='/profile'>Profile</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <button onClick={ handleSignOut }>Sign Out</button>
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
    );
}
