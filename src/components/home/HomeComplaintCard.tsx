import ProfileIconTwo from '../../../public/graphics/profile-icon-two.svg'
import ProfileIconThree from '../../../public/graphics/profile-icon-three.svg'
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
        <div className={`flex flex-col space-y-4 rounded-2xl w-full sm:w-90 py-4 px-6 xl:px-8
            ${ is_orange_card ? 'bg-yap-orange-50' : 'bg-yap-yellow-50'}
            ${ is_orange_card ? '' : 'xl:self-end'}
            ${ is_orange_card ? 'rounded-bl-none' : 'rounded-br-none'}
            `}>
            <div className='flex flex-row items-center space-x-4'>
                {/* Title and profile image */}
                {
                    is_orange_card
                    ? <Image src={ProfileIconTwo} alt="Profile Icon" className="w-10 h-10 md:w-12 md:h-12" />
                    : <Image src={ProfileIconThree} alt="Profile Icon" className="w-10 h-10 md:w-12 md:h-12" />
                }
                <h6 className='text-yap-black-800 text-lg md:text-xl'>{ COMPLAINTS_IN_HOME_PAGE[index].title }</h6>
            </div>

            <p className='text-yap-black-800 text-sm'>{ COMPLAINTS_IN_HOME_PAGE[index].description }</p>

            <div className='flex flex-row items-center space-x-8'>
                {/* Icons */}
                <ThumbsUp className={ `w-4 h-4 md:w-6 md:h-6 ${ is_orange_card ? 'text-yap-orange-900' : 'text-yap-yellow-900' } ${ is_orange_card ? 'fill-yap-orange-900' : 'fill-yap-yellow-900' }` } />
                <ThumbsDown className={ `w-4 h-4 md:w-6 md:h-6 ${ is_orange_card ? 'text-yap-orange-900' : 'text-yap-yellow-900' }` } />
            </div>
        </div>
    );
}
