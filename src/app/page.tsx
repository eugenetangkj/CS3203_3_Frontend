import Image from "next/image";
import Yappy from "../../public/graphics/yappy.svg";
import HomeLeftColumn from "@/components/home/HomeLeftColumn";
import HomeRightColumn from "@/components/home/HomeRightColumn";

/** 
Layout for home page which displays the list of all posts
*/
export default function Home() {
  return (
    <div className="px-6 md:px-12 font-afacad mt-32 flex flex-grow">
        <div className="flex flex-col space-y-12 justify-center flex-grow">
            <div className='grid grid-rows-1 grid-cols-2 h-full'>
                <HomeLeftColumn />
                <HomeRightColumn />
            </div>

            <Image src={Yappy} alt="Yappy Duck" className="self-end w-36 h-36 sm:w-48 sm:h-48" />
        </div>
    </div>
  );

}
