
import Image from "next/image";
import { CategoryEnum } from "@/types/Category";
import { SocialMediaSource } from "@/types/SocialMediaSource";
import { SocialMediaSourceImageMap } from "@/utils/SocialMediaSourceImageMap";
import { CategoryColorMap } from "@/utils/CategoryColourMap";


/**
This component represents a card that displays a post in the home page. It contains the post's title, description,
category, date of post and source.
*/
interface PostCardProps {
    title: string;
    category: CategoryEnum | undefined;
    description: string;
    date: string;
    source: SocialMediaSource | undefined;
 }
 
export default function PostCard({title, category, description, date, source}: PostCardProps) {
    return (
        <a href="#">
            <div className='flex flex-col space-y-4 justify-between rounded-xl bg-yap-gray-100 hover:bg-yap-brown-100 duration-200 p-4 h-full'>
                <div className='flex flex-col space-y-4'>
                    <div className='space-y-2'>
                        {/* Title */}
                        <h6 className='text-yap-brown-900 text-xl sm:text-2xl font-bold line-clamp-2 overflow-hidden'>{ title }</h6>

                        {/* Category */}
                        <div className='rounded-full  text-white w-fit px-4 py-0.25 text-sm' style={{
                            backgroundColor: CategoryColorMap[category ?? CategoryEnum.Others]
                        }}>{ category }</div>
                    </div>

                    {/* Description */}
                    <p className='text-yap-black-800 line-clamp-2 overflow-hidden'>{ description }</p>
                </div>


                <div className='flex flex-row items-center justify-between'>
                    {/* Date posted */}
                    <p className='text-yap-brown-900'>Posted on: { date }</p>

                    {/* Source */}
                    <Image src={SocialMediaSourceImageMap[source ?? SocialMediaSource.Reddit]} alt="Profile image" className="w-8 h-8 rounded-full object-cover" />
                    
                </div>

            </div>
        </a>

    );
}