import { ABOUT_JUST_YAP } from "@/constants/Constants";
import ProfileIconTwo from '../../../public/graphics/profile-icon-two.svg'
import ProfileIconThree from '../../../public/graphics/profile-icon-three.svg'
import Yappy from '../../../public/graphics/yappy.svg'
import Image from "next/image";
import { ThumbsUp } from "lucide-react";
import { ThumbsDown } from "lucide-react";
import { COMPLAINTS_IN_HOME_PAGE } from "@/constants/Constants";




/** 
Component for the complaint card in the home page
*/
interface HomeComplaintCardProps {
    index: number
}


export default function HomeComplaintCard({ index } : HomeComplaintCardProps) {
    const is_orange_card = index === 0


    return (
        <div className={`flex flex-col space-y-6 rounded-2xl w-4/5 p-8
            ${ is_orange_card ? 'bg-yap-orange-50' : 'bg-yap-yellow-50'}
            ${ is_orange_card ? '' : 'self-end'}
            ${ is_orange_card ? 'rounded-bl-none' : 'rounded-br-none'}
            `}>
            <div className='flex flex-row items-center space-x-4'>
                {/* Title and profile image */}
                {
                    is_orange_card
                    ? <Image src={ProfileIconTwo} alt="Profile Icon" className="w-12 h-12" />
                    : <Image src={ProfileIconThree} alt="Profile Icon" className="w-12 h-12" />
                }
                <h6 className='text-yap-black-800 text-2xl'>{ COMPLAINTS_IN_HOME_PAGE[index].title }</h6>
            </div>

            <p className='text-yap-black-800'>{ COMPLAINTS_IN_HOME_PAGE[index].description }</p>

            <div className='flex flex-row items-center space-x-8'>
                {/* Icons */}
                <ThumbsUp className={ `${ is_orange_card ? 'text-yap-orange-900' : 'text-yap-yellow-900' } ${ is_orange_card ? 'fill-yap-orange-900' : 'fill-yap-yellow-900' }` } />
                <ThumbsDown className={ `${ is_orange_card ? 'text-yap-orange-900' : 'text-yap-yellow-900' }` } />
            </div>
        </div>
    );
}
