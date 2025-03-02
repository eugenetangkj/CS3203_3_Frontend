import Link from "next/link";
import { MoveLeft } from "lucide-react";


/**
This component represents a backward navigation button designed with a left arrow
and a text beside it.
*/
interface BackToPreviousButtonProps {
    text: string
    route: string,
}

export default function BackToPreviousButton({ text, route }: BackToPreviousButtonProps) {
    return (
        <Link href={ route } className='w-fit'>
            <div className='flex flex-row justify-start items-center space-x-4 text-yap-brown-900 hover:text-yap-brown-800 duration-200'>
                <MoveLeft />
                <h6>{ text }</h6>
            </div> 
        </Link> 
    );
}



