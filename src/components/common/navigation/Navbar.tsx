"use client"

import { useState } from "react";
import Image from "next/image";
import Logo from "../../../../public/logo.svg";
import { NAV_LINKS } from "@/constants/Constants";
import RightNavDrawer from "./RightNavDrawer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProfileIconNavbar from "./ProfileIconNavbar";
import { Skeleton } from "@/components/ui/skeleton";
import { User, UserRoleEnum } from "@/types/User";
import useSWR from 'swr';
import { USERS_GET_PROFILE_SWR_HOOK } from "@/constants/SwrHooks";
import { getUserProfile } from "@/controllers/UsersClientFunctions";

/**
This component represents the Navbar component that is used in the web application for
navigation. It is mobile responsive, offering a hambuger menu and a drawer for mobile
screen sizes.  
*/
export default function Navbar() {
    //States
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const closeDrawer = () => setIsDrawerOpen(false);

    const { data, error, isLoading } = useSWR<User>(
        USERS_GET_PROFILE_SWR_HOOK,
        getUserProfile,
        { revalidateOnFocus: false,}
    )


    return (
        <nav className="fixed w-full top-0 start-0 z-20 bg-white font-afacad text-lg pt-4">
            <div className="flex justify-between items-center px-6 md:px-12">
                {/* Logo */}
                <Link href="/">
                    <Image src={Logo} alt="Just Yap!" className="w-28 h-14 sm:w-32 sm:h-16 2xl:w-36 2xl:h-18" />
                </Link>


                {/* Desktop navigation which only appears for md and above*/}
                <div className="hidden md:flex justify-center items-center space-x-8 lg:space-x-16">
                    {isLoading || error ? (
                        <Skeleton className="w-[80px] h-[20px]" />
                    ) : (
                        <>
                        {NAV_LINKS.map((link) =>
                            link.is_admin_only && data?.role !== UserRoleEnum.Admin ? null : (
                            <Link
                                key={link.id}
                                href={link.route}
                                className="text-yap-brown-900 hover:text-yap-brown-800 duration-200"
                            >
                                {link.label}
                            </Link>
                            )
                        )}

                        {data?.role !== UserRoleEnum.None ? (
                            <ProfileIconNavbar />
                        ) : (
                            <Link href="/sign-in">
                            <Button className="rounded-full bg-yap-orange-900 hover:bg-yap-orange-800 duration-200 text-white text-base">
                                Sign In
                            </Button>
                            </Link>
                        )}
                        </>
                    )}
                </div>



                {/* Hamburger menu which only appears for below md */}
                <button onClick={() => setIsDrawerOpen(true)} className="inline-flex items-center w-10 h-10 justify-center text-yap-brown-900 hover:text-yap-brown-800 rounded-lg md:hidden" aria-expanded="false">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button> 
            </div>


            {/* Right nav drawer for mobile navigation */}
            <RightNavDrawer isDrawerOpen={isDrawerOpen} user={ data } onClose={closeDrawer} />
        </nav>
    );
}