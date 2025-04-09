
/** 
The analytics dashboard component used in the analytics page, housing the different analytics displays
*/

import AnalyticsDashboardTitle from "./AnalyticsDashboardTitle";
import { NumberOfComplaintsByCategoryOverTimeVisualisation } from "./visualisations/NumberOfComplaintsByCategoryOverTimeVisualisation";
import { NumberOfComplaintsByCategoryVisualisation } from "./visualisations/NumberOfComplaintsByCategoryVisualisation";
import { NumberOfComplaintsBySentimentVisualisation } from "./visualisations/NumberOfComplaintsBySentimentVisualisation";
import { SentimentsOfCategoriesVisualisation } from "./visualisations/SentimentsOfCategoriesVisualisation";
import { SentimentsOfSourcesVisualisation } from "./visualisations/SentimentsOfSourcesVisualisation";
import { MostNegativePostsVisualisation } from "./visualisations/MostNegativeComplaintsVisualisation";
import { SentimentsOfCategoriesOverTimeVisualisation } from "./visualisations/SentimentsOfCategoriesOverTimeVisualisation";
import InfoTooltip from "../common/others/InfoTooltip";

export default function AnalyticsDashboard() {
    return (
        <div className='grid grid-cols-1 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 gap-y-4'>
            {/* Number of complaints by category */}
            {/* <div className='analytics-dashboard-card col-span-1 xl:col-span-2 overflow-x-hidden'>
                <AnalyticsDashboardTitle title='Number of Complaints by Category' />
                <NumberOfComplaintsByCategoryVisualisation />
            </div> */}

            {/* Number of complaints by category over time */}
            {/* <div className='analytics-dashboard-card col-span-1 xl:col-span-3 2xl:col-span-4'>
                <div className='flex flex-row gap-2 items-center mb-6'>
                    <h3 className='font-bold text-xl sm:text-2xl text-yap-brown-900'>Number of Complaints by Category Over Time</h3>     
                    <InfoTooltip message='Shows the breakdown per month for the months between start and end dates, inclusive.' />    
                </div>
                <NumberOfComplaintsByCategoryOverTimeVisualisation />
            </div> */}

            {/* Sentiment of each category */}
            {/* <div className='analytics-dashboard-card col-span-1 xl:col-span-5 2xl:col-span-6'>
                <AnalyticsDashboardTitle title='Sentiments of Categories' />
                <SentimentsOfCategoriesVisualisation />
            </div> */}

            {/* Number of complaints by sentiments */}
            <div className='analytics-dashboard-card  col-span-1 xl:col-span-3 2xl:col-span-3'>
                <AnalyticsDashboardTitle title='Number of Complaints by Sentiment' />
                <NumberOfComplaintsBySentimentVisualisation />
            </div>

            {/* Sentiment by source */}
            {/* <div className='analytics-dashboard-card  col-span-1 xl:col-span-2 2xl:col-span-3'>
                <AnalyticsDashboardTitle title='Sentiments of Sources' />
                <SentimentsOfSourcesVisualisation />
            </div> */}

            {/* Sentiments of each category over time */}
            {/* <div className='analytics-dashboard-card  col-span-1 xl:col-span-5 2xl:col-span-6'>
                <div className='flex flex-row gap-2 items-center mb-6'>
                    <h3 className='font-bold text-xl sm:text-2xl text-yap-brown-900'>Sentiments of Categories Over Time</h3>     
                    <InfoTooltip message='Shows the breakdown per month for the months between start and end dates, inclusive.' />    
                </div>
                <SentimentsOfCategoriesOverTimeVisualisation />
            </div> */}

            {/* Top 5 negative posts */}
            {/* <div className='analytics-dashboard-card  col-span-1 xl:col-span-6'>
                <AnalyticsDashboardTitle title='Most Negative Complaints' />
                <MostNegativePostsVisualisation />
            </div> */}

        </div>

  );

}
