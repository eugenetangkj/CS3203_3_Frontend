import Profile from "../../../../public/profile.svg";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";


/**
This component represents the profile icon that appears in the navbar or drawer if the user is signed in.
*/
export default function ProfileIconNavbar() {

    return (
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild className='font-afacad text-base text-yap-black-800'>
                    <Image src={Profile} alt="Profile image" className="w-8 h-8 rounded-full object-cover cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Sign Out</DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
    );
}