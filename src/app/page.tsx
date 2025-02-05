import SearchBar from "@/components/home/SearchBar";
import OrderByFilter from "@/components/home/OrderByFilter";
import SelectSourceDropdown from "@/components/home/SelectSourceDropdown";
import PostCard from "@/components/home/PostCard";
import { posts } from "@/constants/posts";
import { stringToSource } from "@/types/SocialMediaSource";
import { stringToCategory } from "@/types/Category";
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

          {/* Search and filter */}
          <div className='flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0'>
            <SearchBar />
            <div className='flex flex-row justify-start items-center space-y-0 space-x-4'>
              <OrderByFilter />
              <SelectSourceDropdown />
            </div>
          </div>
        </div>

        {/* Cards for posts */}
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-rows-1 gap-x-4 gap-y-4'>
          {posts.map((post, index) => (
            <PostCard key={index} title={post.title} category={ stringToCategory(post.category) }
              description={post.description} date={post.date} source={stringToSource(post.source)} />
          ))}
        </div>

        {/* Duck image */}
        <Image src={Yappy} alt="Yappy Duck" className="self-end w-36 h-36 sm:w-48 sm:h-48" />
        
      </div>
    </div>
  );

}
