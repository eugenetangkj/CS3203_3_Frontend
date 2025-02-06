import PageTitle from "@/components/common/text/PageTitle";
import { barChartCustomLabelData, categoriesOverTimeData, sentimentBySourceData, sentimentsOfCategories, sentimentsOverTimeData, sentimentsPieChart, mostNegativePostsData } from "@/constants/analyticsData";
import { LineChartMultiple } from "@/components/charts/LineChartMultiple";
import { BarChartNegative } from "@/components/charts/BarChartNegative";
import { PieChartLegend } from "@/components/charts/PieChartLegend";
import { BarChartCustomLabel } from "@/components/charts/BarChartCustomLabel";
import { TableComponent } from "@/components/charts/Table";

/** 
Layout for analytics dashboard which displays insights and trends from posts obtained from social media
*/

export const metadata = {
    title: "Analytics Dashboard - Just Yap!",
    description: "View insights and trends from posts obtained from social media.",
  };


export default function Analytics() {
  return (
    <div className="px-6 md:px-12 font-afacad mt-32 mb-8">
      <div className="flex flex-col space-y-8">

  
        {/* Title */}
        <PageTitle pageTitle="Analytics Dashboard" />
   
             
                  
        
        {/* Analytics visualisation */}
        <div className='grid grid-cols-1 lg:grid-cols-5 2xl:grid-cols-6 gap-x-4 gap-y-4'>
          {/* Number of posts by category */}
          <div className='gap-y-8 bg-yap-gray-100 p-4 rounded-xl col-span-1 lg:col-span-2'>
            <h3 className='font-bold text-xl sm:text-2xl text-yap-brown-900 mb-6'>Number of Posts by Category</h3>
            <BarChartCustomLabel chartData={ barChartCustomLabelData } />
          </div>

          {/* Number of posts by category over time */}
          <div className='gap-y-8 bg-yap-gray-100 p-4 rounded-xl col-span-1 lg:col-span-3 2xl:col-span-4'>
            <h3 className='font-bold text-xl sm:text-2xl text-yap-brown-900 mb-6'>Number of Posts by Category Over Time</h3>
            <LineChartMultiple chartData={ categoriesOverTimeData } />
          </div>

          {/* Sentiment of each category */}
          <div className='gap-y-8 bg-yap-gray-100 p-4 rounded-xl col-span-1 lg:col-span-3 2xl:col-span-4'>
            <h3 className='font-bold text-xl sm:text-2xl text-yap-brown-900 mb-6'>Sentiment of Categories</h3>
            <BarChartNegative chartData={ sentimentsOfCategories } footerText={"* Sentiment score of 1.00 and -1.00 are the most positive and negative respectively."} />
          </div>

          {/* Number of posts by sentiments */}
          <div className='gap-y-8 bg-yap-gray-100 p-4 rounded-xl col-span-1 lg:col-span-2'>
            <h3 className='font-bold text-xl sm:text-2xl text-yap-brown-900 mb-6'>Number of Posts by Sentiment Score</h3>
            <PieChartLegend chartData={ sentimentsPieChart } />
          </div>

          {/* Number of posts by sentiments */}
          <div className='gap-y-8 bg-yap-gray-100 p-4 rounded-xl col-span-1 lg:col-span-3 2xl:col-span-4'>
            <h3 className='font-bold text-xl sm:text-2xl text-yap-brown-900 mb-6'>Sentiments of Categories Over Time</h3>
            <LineChartMultiple chartData={ sentimentsOverTimeData } />
          </div>

          {/* Sentiment by source */}
          <div className='gap-y-8 bg-yap-gray-100 p-4 rounded-xl col-span-1 lg:col-span-2'>
            <h3 className='font-bold text-xl sm:text-2xl text-yap-brown-900 mb-6'>Sentiment by Source</h3>
            <TableComponent headers={ sentimentBySourceData['headers']} data={ sentimentBySourceData['data']} />
          </div>

          {/* Top 5 negative posts */}
          <div className='gap-y-8 bg-yap-gray-100 p-4 rounded-xl col-span-1 lg:col-span-6'>
            <h3 className='font-bold text-xl sm:text-2xl text-yap-brown-900 mb-6'>Top Negative Posts</h3>
            <TableComponent headers={ mostNegativePostsData['headers']} data={ mostNegativePostsData['data']} />
          </div>

        </div>

      </div>
    </div>
  );

}
