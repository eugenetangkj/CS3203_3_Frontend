import { ABOUT_JUST_YAP } from "@/constants/Constants";
import ProfileIconTwo from '../../../public/graphics/profile-icon-two.svg'
import ProfileIconThree from '../../../public/graphics/profile-icon-three.svg'
import Yappy from '../../../public/graphics/yappy.svg'
import Image from "next/image";
import { ThumbsUp } from "lucide-react";
import { ThumbsDown } from "lucide-react";


/** 
Component for the right column in the home page. Displays graphics.
*/
export default function HomeRightColumn() {
    return (
        <div className="flex flex-col justify-center space-y-12 col-span-1 px-8">

            {/* Card 1 */}
            <div className='flex flex-col space-y-6 bg-yap-orange-50 rounded-2xl rounded-bl-none w-4/5 p-8'>
                <div className='flex flex-row items-center space-x-4'>
                    {/* Title and profile image */}
                    <Image src={ProfileIconTwo} alt="Profile Icon" className="w-12 h-12" />
                    
                    <h6 className='text-yap-black-800 text-2xl'>Why are MRT trains so crowded?</h6>
                </div>

                <p className='text-yap-black-800'>I get that Singapore has a world-class public transport system, but seriously, what's the point if I'm squished like a sardine every morning? We need to rethink how to manage the crowds.</p>

                <div className='flex flex-row items-center space-x-8'>
                    {/* Icons */}
                    <ThumbsUp className='text-yap-orange-900 fill-yap-orange-900' />
                    <ThumbsDown className='text-yap-orange-900' />
                </div>
            </div>


            {/* Card 2 */}
            <div className='flex flex-col space-y-6 bg-yap-orange-50 rounded-2xl rounded-bl-none w-4/5 p-8 self-end'>
                <div className='flex flex-row items-center space-x-4'>
                    {/* Title and profile image */}
                    <Image src={ProfileIconTwo} alt="Profile Icon" className="w-12 h-12" />
                    
                    <h6 className='text-yap-black-800 text-2xl'>Why are MRT trains so crowded?</h6>
                </div>

                <p className='text-yap-black-800'>I get that Singapore has a world-class public transport system, but seriously, what's the point if I'm squished like a sardine every morning? We need to rethink how to manage the crowds.</p>

                <div className='flex flex-row items-center space-x-8'>
                    {/* Icons */}
                    <ThumbsUp className='text-yap-orange-900 fill-yap-orange-900' />
                    <ThumbsDown className='text-yap-orange-900' />
                </div>
            </div>

        </div>
  );
}
