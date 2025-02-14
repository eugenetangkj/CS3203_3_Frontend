
/** 
The analytics dashboard component used in the analytics page, housing the different analytics displays
*/

import AnalyticsDashboardTitle from "./AnalyticsDashboardTitle";
import { NumberOfPostsByCategoryOverTimeVisualisation } from "./NumberOfPostsByCategoryOverTimeVisualisation";
import { NumberOfPostsByCategoryVisualisation } from "./NumberOfPostsByCategoryVisualisation";
import { NumberOfPostsBySentimentVisualisation } from "./NumberOfPostsBySentimentVisualisation";
import { SentimentsOfCategoriesVisualisation } from "./SentimentsOfCategoriesVisualisation";


export default function AnalyticsDashboard() {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-5 2xl:grid-cols-6 gap-x-4 gap-y-4'>
            {/* Number of posts by category */}
            <div className='gap-y-8 bg-yap-gray-100 p-4 rounded-xl col-span-1 lg:col-span-2'>
                <AnalyticsDashboardTitle title='Number of Complaints by Category' />
                <NumberOfPostsByCategoryVisualisation />
            </div>

            {/* Number of posts by category over time */}
            <div className='gap-y-8 bg-yap-gray-100 p-4 rounded-xl col-span-1 lg:col-span-3 2xl:col-span-4'>
                <AnalyticsDashboardTitle title='Number of Complaints by Category Over Time' />
                <NumberOfPostsByCategoryOverTimeVisualisation />
            </div>

            {/* Sentiment of each category */}
            <div className='gap-y-8 bg-yap-gray-100 p-4 rounded-xl col-span-1 lg:col-span-3 2xl:col-span-4'>
                <AnalyticsDashboardTitle title='Sentiment of Categories' />
                <SentimentsOfCategoriesVisualisation />
            </div>

            {/* Number of posts by sentiments */}
            <div className='gap-y-8 bg-yap-gray-100 p-4 rounded-xl col-span-1 lg:col-span-2'>
                <AnalyticsDashboardTitle title='Number of Complaints by Sentiment Score' />
                <NumberOfPostsBySentimentVisualisation />
            </div>

          {/* Number of posts by sentiments */}
          {/* <div className='gap-y-8 bg-yap-gray-100 p-4 rounded-xl col-span-1 lg:col-span-3 2xl:col-span-4'>
            <h3 className='font-bold text-xl sm:text-2xl text-yap-brown-900 mb-6'>Sentiments of Categories Over Time</h3>
            <LineChartMultiple chartData={ sentimentsOverTimeData } />
          </div> */}

          {/* Sentiment by source */}
          {/* <div className='gap-y-8 bg-yap-gray-100 p-4 rounded-xl col-span-1 lg:col-span-2'>
            <h3 className='font-bold text-xl sm:text-2xl text-yap-brown-900 mb-6'>Sentiment by Source</h3>
            <TableComponent headers={ sentimentBySourceData['headers']} data={ sentimentBySourceData['data']} />
          </div> */}

          {/* Top 5 negative posts */}
          {/* <div className='gap-y-8 bg-yap-gray-100 p-4 rounded-xl col-span-1 lg:col-span-6'>
            <h3 className='font-bold text-xl sm:text-2xl text-yap-brown-900 mb-6'>Most Negative Posts</h3>
            <TableComponent headers={ mostNegativePostsData['headers']} data={ mostNegativePostsData['data']} />
          </div> */}

        </div>

  );

}
