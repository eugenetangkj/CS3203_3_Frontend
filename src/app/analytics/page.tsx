import PageTitle from "@/components/common/text/PageTitle";
import { PieChartWithLabel } from "@/components/charts/PieChartWithLabel";
import { categoriesOverTimeData, pieChartWithLabelData } from "@/constants/analyticsData";
import { LineChartMultiple } from "@/components/charts/LineChartMultiple";

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
        <div className='grid grid-cols-1 md:grid-cols-5 2xl:grid-cols-6 gap-x-4 gap-y-4'>
          {/* Number of posts by category */}
          <div className='gap-y-8 bg-yap-gray-100 p-4 rounded-xl col-span-1 md:col-span-2'>
            <h3 className='font-bold text-xl sm:text-2xl text-yap-brown-900 mb-6'>Number of Posts by Category</h3>
            <PieChartWithLabel chartData={ pieChartWithLabelData } />
          </div>

          {/* Number of posts by category over time */}
          <div className='gap-y-8 bg-yap-gray-100 p-4 rounded-xl col-span-1 md:col-span-3 2xl:col-span-4'>
            <h3 className='font-bold text-xl sm:text-2xl text-yap-brown-900 mb-6'>Number of Posts by Category Over Time</h3>
            <LineChartMultiple chartData= { categoriesOverTimeData } />
          </div>

        





            
            
        </div>



       

     
      </div>
    </div>
  );

}
