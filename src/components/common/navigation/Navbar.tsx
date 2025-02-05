"use client"

import { useState } from "react";
import Image from "next/image";
import Logo from "../../../../public/logo.svg";
import { navLinks } from "@/constants/navLinks";
import RightNavDrawer from "./RightNavDrawer";

/**
This component represents the Navbar component that is used in the web application for
navigation. It is mobile responsive, offering a hambuger menu and a drawer for mobile
screen sizes.  
*/
export default function Navbar() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const closeDrawer = () => setIsDrawerOpen(false);
    
    return (
        <nav className="fixed w-full top-0 start-0 z-20 bg-white font-afacad text-lg pt-4">
            <div className="flex justify-between items-center px-6 md:px-12">
                {/* Logo */}
                <a href="/">
                    <Image src={Logo} alt="Just Yap!" className="w-28 h-14 sm:w-36 sm:h-18" />
                </a>


                {/* Desktop navigation which only appears for md and above*/}
                <div className="hidden md:flex justify-center items-center space-x-16">
                    {/* Desktop links */}
                    {
                        navLinks.map((link) => (
                            <a key={link.id} href={link.route} className='text-yap-brown-900 hover:text-yap-brown-800 duration-200'>{link.label}</a>
                        ))
                    }
                  
                    {/* Login button */}
                    <button className="rounded-full bg-yap-brown-900 hover:bg-yap-brown-800 duration-200 text-white px-6 py-1">Login</button>
                </div>


                {/* Hamburger menu which only appears for below md */}
                <button onClick={() => setIsDrawerOpen(true)} className="inline-flex items-center w-10 h-10 justify-center text-yap-brown-900 hover:text-yap-brown-800 rounded-lg md:hidden" aria-expanded="false">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button> 
            </div>


            {/* Right nav drawer for mobile navigation */}
            <RightNavDrawer isDrawerOpen={isDrawerOpen} onClose={closeDrawer} />
        </nav>
    );
}