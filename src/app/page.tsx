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
        <div className="flex flex-col space-y-0 justify-center flex-grow">
            <div className='grid grid-rows-2 xl:grid-rows-1 grid-cols-1 xl:grid-cols-5 h-full mb-8 gap-y-12 sm:gap-y-2 xl:gap-y-0'>
                <HomeLeftColumn />
                <HomeRightColumn />
            </div>

            <Image src={Yappy} alt="Yappy Duck" className="self-end w-36 h-36" />
        </div>
    </div>
  );

}
