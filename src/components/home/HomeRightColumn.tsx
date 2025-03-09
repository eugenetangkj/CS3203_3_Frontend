import HomeComplaintCard from "./HomeComplaintCard";


/** 
Component for the right column in the home page. Displays complaint cards.
*/
export default function HomeRightColumn() {
    return (
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center xl:items-start xl:flex-col xl:justify-start 2xl:justify-center xl:space-y-8 row-span-1 col-span-1 xl:col-span-2 xl:pl-8 sm:space-y-0 sm:space-x-8 xl:space-x-0">
            {/* Card 1 */}
            <HomeComplaintCard index={0} />
           
            {/* Card 2 */}
            <HomeComplaintCard index={1} />
        </div>
  );
}
