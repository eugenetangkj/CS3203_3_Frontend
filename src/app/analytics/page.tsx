import SearchBar from "@/components/home/SearchBar";
import OrderByFilter from "@/components/home/OrderByFilter";
import SelectSourceDropdown from "@/components/home/SelectSourceDropdown";
import PostCard from "@/components/home/PostCard";
import { posts } from "@/constants/posts";
import { stringToSource } from "@/types/SocialMediaSource";
import { stringToCategory } from "@/types/Category";
import PageTitle from "@/components/common/text/PageTitle";
import { Component } from "@/components/charts/Donutchart";

/** 
Layout for analytics dashboard which displays insights and trends from posts obtained from social media
*/

export const metadata = {
    title: "Analytics Dashboard - Just Yap!",
    description: "View insights and trends from posts obtained from social media.",
  };


export default function Analytics() {
  return (
    <div className="px-6 md:px-12 font-afacad mt-32">
      <div className="flex flex-col space-y-8">

  
        {/* Title */}
        <PageTitle pageTitle="Analytics Dashboard" />
   
             
                  
        
        {/* Analytics visualisation */}
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-x-4 gap-y-4'>
            <Component />
            
        </div>



       

     
      </div>
    </div>
  );

}
