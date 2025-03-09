import Image from "next/image";
import Yappy from "../../public/graphics/yappy.svg";
import PageTitle from "@/components/common/text/PageTitle";

/** 
Layout for home page which displays the list of all posts
*/
export default function Home() {
  return (
    <div className="px-6 md:px-12 font-afacad mt-32">
      <div className="flex flex-col space-y-8">

        {/* Title and search and filter */}
        <div className="flex flex-col space-y-6">
          {/* Title */}
          <PageTitle pageTitle="What Singaporeans Are Yapping About" />

          
        </div>

       

        {/* Duck image */}
        <Image src={Yappy} alt="Yappy Duck" className="self-end w-36 h-36 sm:w-48 sm:h-48" />
        
      </div>
    </div>
  );

}
