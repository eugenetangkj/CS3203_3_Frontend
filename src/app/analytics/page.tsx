import PageTitle from "@/components/common/text/PageTitle";
import { PieChartWithLabel } from "@/components/charts/PieChartWithLabel";
import { pieChartWithLabelData } from "@/constants/analyticsData";

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
          <div className='gap-y-8 bg-yap-gray-100 p-4 rounded-xl col-span-2'>
            <h3 className='font-bold text-xl sm:text-2xl text-yap-brown-900 mb-6'>Number of Posts by Category</h3>
            <PieChartWithLabel chartData={ pieChartWithLabelData } />
          </div>
            
            
        </div>



       

     
      </div>
    </div>
  );

}
