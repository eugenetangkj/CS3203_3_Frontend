"use client"

import { Drawer } from "flowbite-react";
import { NAV_LINKS, ERROR_MESSAGE_API} from "@/constants/Constants";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { SIGNOUT_SERVER_ENDPOINT } from "@/constants/ApiRoutes";
import { useToast } from "@/hooks/use-toast"
import axios from "axios";
import { useRouter } from "next/navigation";
import Profile from "../../../../public/profile.svg";


/**
This component represents the right drawer that is opened by the hamburger menu in the Navbar component.
*/
interface RightNavDrawerProps {
   isDrawerOpen: boolean;
   isUserAdmin: boolean;
   username: string;
   onClose: () => void;
}


export default function RightNavDrawer({isDrawerOpen, isUserAdmin, username, onClose}: RightNavDrawerProps) {
    //States
    const { isAuthenticated, isLoading, logout } = useAuth();

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
        <Drawer open={isDrawerOpen} onClose={onClose} position="right">

            {/* Drawer header */}
            <Drawer.Header
            titleIcon={() => <></>}
            />

            {/* Drawer body */}
            <Drawer.Items>
                {/* Profile information */}
                {
                (isLoading)
                ? (<Skeleton className="w-[50px] h-[20px]" />)
                : (isAuthenticated)
                ? <div className='flex flex-row space-x-4 items-center ml-4 mb-12'>
                    <Image src={Profile} alt="Profile image" className="w-8 h-8 rounded-full object-cover" />
                    <p className='font-afacad text-lg text-yap-black-800 items-center'>{ username }</p>
                    </div>
                : <div className='ml-4 mb-12'></div>
                }

                {/* Links */}
                <div className="flex flex-col justify-start space-y-8 ml-4">
                    {
                    NAV_LINKS.map((link) => (
                        link.is_admin_only && !isUserAdmin
                        ? null
                        : <a key={link.id} href={link.route} className='text-yap-brown-900 text-lg hover:text-yap-brown-800 duration-200'>{link.label}</a>
                    ))
                    }
                </div>


                {/* Sign in button */}
                {
                (isLoading)
                ? (<Skeleton className="w-full h-[40px]" />)
                : (isAuthenticated)
                ? <div className="ml-4 mt-12">
                    <hr className="my-4 border-t-2 border-yap-gray-100" />
                    <a href='/profile' className='text-yap-brown-900 hover:text-yap-brown-800 duration-200 text-base'>Profile</a>
                    <p onClick={ handleSignOut } className='text-yap-brown-900 hover:text-yap-brown-800 duration-200 text-base mt-8 cursor-pointer'>Sign Out</p>



                    </div>
                : <div className='ml-4 mt-12'>
                    <a href='sign-in'>
                        <Button className="rounded-full bg-yap-orange-900 hover:bg-yap-orange-800 duration-200 text-white text-base w-full">Sign In</Button>
                    </a>
                  </div>
                }


            </Drawer.Items>
        </Drawer>
    );
}
