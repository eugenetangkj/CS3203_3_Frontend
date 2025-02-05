import { Drawer } from "flowbite-react";
import Profile from "../../../../public/profile.svg";
import Image from "next/image";
import { Dropdown, DropdownItem } from "flowbite-react";
import { navLinks } from "@/constants/navLinks";

/**
This component represents the right drawer that is opened by the hamburger menu in the Navbar component.
*/
interface RightNavDrawerProps {
   isDrawerOpen: boolean;
   onClose: () => void;
}


export default function RightNavDrawer({isDrawerOpen, onClose}: RightNavDrawerProps) {
    return (
      <Drawer open={isDrawerOpen} onClose={onClose} position="right">

         {/* Drawer header */}
         <Drawer.Header
            titleIcon={() => <></>}
         />

         {/* Drawer body */}
         <Drawer.Items>
            {/* Profile information */}
            <div className="flex justify-start items-center space-x-4 mb-12 ml-4">
               {/* Profile image */}
               <Image src={Profile} alt="Profile image" className="w-8 h-8 rounded-full object-cover" />


               {/* Profile name */}
               <Dropdown label="Sammy Tan" inline className='text-yap-black-800'>
                  <DropdownItem>Profile</DropdownItem>
                  <DropdownItem>Sign Out</DropdownItem>
               </Dropdown>
            </div>

            {/* Links */}
            <div className="flex flex-col justify-start space-y-8 ml-4">
            {
               navLinks.map((link) => (
                     <a key={link.id} href={link.route} className='text-yap-brown-900 hover:text-yap-brown-800 duration-200'>{link.label}</a>
               ))
            }
            </div>
         </Drawer.Items>
      </Drawer>
    );
}