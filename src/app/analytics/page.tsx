import PageTitle from "@/components/common/text/PageTitle";
import AnalyticsDashboard from "../../components/analytics/AnalyticsDashboard";

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
        
                {/* Analytics dashboard visualisation */}
                <AnalyticsDashboard />
            </div>
        </div>
    );
}
