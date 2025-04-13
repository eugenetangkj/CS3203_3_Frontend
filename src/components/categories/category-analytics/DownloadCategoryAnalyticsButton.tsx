"use client"
import { Button } from "@/components/ui/button";
import { CategoryAnalytics } from "@/types/CategoryAnalytics";
import { pdf } from "@react-pdf/renderer";
import { CategoryAnalyticsReport } from "./CategoryAnalyticsReport";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast"
import { complaintsGetMany, complaintsGetStatistics, complaintsGetStatisticsOverTime } from "@/data-fetchers/ComplaintsFunctions";
import { VERY_LARGE_NUMBER } from "@/constants/Constants";
import { getComplaintsWithinRange } from "@/utils/HelperFunctions";
import { getDateRangeForCategoryAnalytics } from "@/utils/HelperFunctions";



/**
This component represents a button that allows users to create and downloa
 */
interface DownloadCategoryAnalyticsButtonProps {
    readonly categoryAnalytics: CategoryAnalytics
}

export default function DownloadCategoryAnalyticsButton({ categoryAnalytics }: DownloadCategoryAnalyticsButtonProps ) {
    //Constants and states
    const [isLoading, setIsLoading] = useState<boolean>()
    const { toast } = useToast()
    const datesForCategoryAnalytics = getDateRangeForCategoryAnalytics(categoryAnalytics.date_created)



    const handleDownload = async () => {
        //Step 1: Set state
        setIsLoading(true)

        //Step 2: Create download toast
        //Show loading toast
        toast({
            variant: "download",
            description: "Download is in progress. Please do not leave this page.",
            duration: Infinity, // Keep it open until download completes
        });


        //Step 3: Fetch number of complaints and average sentiment for the category in the given time period
        const complaintStatistics = await complaintsGetStatistics(
            {
            "category": categoryAnalytics.name,
            "_from_date": datesForCategoryAnalytics[0],
            "_to_date": datesForCategoryAnalytics[1]
            }
        )
        if (complaintStatistics.count < 0 || complaintStatistics.avg_sentiment < -1) {
            toast({
                variant: "destructive",
                description: "Download unsuccessful. Please try again later.",
                duration: 3000,
            });
            setIsLoading(false)
            return
        }

        //Step 4: Fetch number of complaints and sentiment for the category over time in the given time period
        const monthlyComplaintStatistics = await complaintsGetStatisticsOverTime(
            {
                "category": categoryAnalytics.name,
                "_from_date": datesForCategoryAnalytics[0],
                "_to_date":  datesForCategoryAnalytics[1],
            }
        )
        if (monthlyComplaintStatistics.length === 0) {
            toast({
                variant: "destructive",
                description: "Download unsuccessful. Please try again later.",
                duration: 3000,
            });
            setIsLoading(false)
            return
        }

        //Step 5: Get relevant complaints
        const allCategoryComplaints = await complaintsGetMany(
            { "category": categoryAnalytics.name },
            VERY_LARGE_NUMBER,
            1,
            {
                "date": -1,
                "sentiment": 1
            }
        )
        if (allCategoryComplaints.length === 0) {
            toast({
                variant: "destructive",
                description: "Download unsuccessful. Please try again later.",
                duration: 3000,
            });
            setIsLoading(false)
            return
        }
        const relevantComplaints = getComplaintsWithinRange(datesForCategoryAnalytics[0], datesForCategoryAnalytics[1], allCategoryComplaints)


        



        //Step 4: Generate the PDF document
        const blob = await pdf(<CategoryAnalyticsReport categoryAnalytics={ categoryAnalytics } complaintStatistics={ complaintStatistics } monthlyComplaintStatistics={ monthlyComplaintStatistics } relevantComplaints={ relevantComplaints }/>).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${categoryAnalytics.name}_CategoryAnalytics.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);


        //STEP 5: Generate success toast
        toast({
            variant: "success",
            description: "Download completed!",
            duration: 3000,
        });

        //Step 6: Set state
        setIsLoading(false)
      };
    
    
      return (
        <Button className='bg-yap-green-900 hover:bg-yap-green-800 duration-200 rounded-full w-fit'
                    onClick={() => handleDownload()} disabled={ isLoading }>{isLoading ? 'Downloading' : 'Download Report'}</Button>
        
      );
   
}
