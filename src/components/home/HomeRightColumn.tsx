import HomeComplaintCard from "./HomeComplaintCard";


/** 
Component for the right column in the home page. Displays complaint cards.
*/
export default function HomeRightColumn() {
    return (
        <div className="flex flex-col justify-center space-y-12 col-span-1 px-8">
            {/* Card 1 */}
            <HomeComplaintCard index={0} />
           
            {/* Card 2 */}
            <HomeComplaintCard index={1} />
        </div>
  );
}
