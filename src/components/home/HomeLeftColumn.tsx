import { ABOUT_JUST_YAP } from "@/constants/Constants";
import StrikethroughImage from '../../../public/graphics/strike-through.svg'
import Image from "next/image";
import NumberOfComplaintsProcessed from "./NumberOfComplaintsProcessed";
import NumberOfResponsesCollected from "./NumberOfResponsesCollected";

/** 
Component for the left column in the home page. Displays:
- Title
- About Just Yap!
- Statistics on number of complaints processed and number of responses
*/
export default function HomeLeftColumn() {
    return (
        <div className="flex flex-col justify-center space-y-12 col-span-1">
            {/* Title */}
            <div className="flex flex-col space-y-2">
                <h1 className="text-yap-brown-900 font-bold text-3xl sm:text-5xl relative">
                    People yap and have tons of <span className="inline-block relative">
                        complaints.
                        <Image 
                            src={StrikethroughImage} 
                            alt="Strikethrough" 
                            className="absolute top-4 left-6 w-4/5"
                        />
                        <span className="absolute -top-12 left-4 text-yap-green-900 font-bold text-3xl sm:text-5xl">feedback</span>
                    </span>
                </h1>

                <h1 className='text-yap-brown-900 font-bold text-3xl sm:text-5xl'>Here, we turn it into data that matters.</h1>
            </div>

            {/* Explanation of what Just Yap! is */}
            <p className='text-yap-black-800 text-lg'>{ ABOUT_JUST_YAP }</p>


            {/* Statistics */}
            <div className='flex flex-row justify-start items-center space-x-24'>
                <NumberOfComplaintsProcessed />
                <NumberOfResponsesCollected />
            </div>
        </div>
  );
}
