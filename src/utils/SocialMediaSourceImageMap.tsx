import { StaticImageData } from "next/image";
import RedditImage from "../../../public/socialmedia/reddit.png";
import { SocialMediaSource } from "@/types/SocialMediaSource";

/**
Maps a social media source to the respective social media image, used for displaying cards
*/
export const socialMediaSourceImageMap: Record<SocialMediaSource, StaticImageData> = {
    [SocialMediaSource.Reddit]: RedditImage,
};