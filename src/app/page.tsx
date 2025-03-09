import Image from "next/image";
import Yappy from "../../public/graphics/yappy.svg";
import { ABOUT_JUST_YAP } from "@/constants/Constants";
import HomeLeftColumn from "@/components/home/HomeLeftColumn";

/** 
Layout for home page which displays the list of all posts
*/
export default function Home() {
  return (
    <div className="px-6 md:px-12 font-afacad">
        <div className='grid grid-rows-1 grid-cols-2 mt-64'>
            <HomeLeftColumn />

            <div className='col-span-1 flex flex-col items-center'>
                {/* Duck image */}
                {/* <Image src={Yappy} alt="Yappy Duck" className="self-end w-36 h-36 sm:w-48 sm:h-48" /> */}
            </div>


      </div>
    </div>
  );

}
