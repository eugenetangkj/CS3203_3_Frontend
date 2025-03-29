"use client"
import { Button } from "@/components/ui/button";
import { CategoryAnalytics } from "@/types/CategoryAnalytics";
import { pdf } from "@react-pdf/renderer";
import { CategoryAnalyticsReport } from "./CategoryAnalyticsReport";
import { useState } from "react";



/**
This component represents a button that allows users to create and downloa
 */
interface DownloadCategoryAnalyticsButtonProps {
    categoryAnalytics: CategoryAnalytics
}

export default function DownloadCategoryAnalyticsButton({ categoryAnalytics }: DownloadCategoryAnalyticsButtonProps ) {

    const [isLoading, setIsLoading] = useState<boolean>()



    const handleDownload = async () => {
        setIsLoading(true)
        
        // Generate the PDF as a blob
        const blob = await pdf(<CategoryAnalyticsReport categoryAnalytics={ categoryAnalytics }/>).toBlob();
    
        // Create a link and download the PDF
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "my-pdf.pdf"; // Set file name for the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up

        setIsLoading(false)
      };
    
    
      return (
        <Button className='bg-yap-green-900 hover:bg-yap-green-800 duration-200 rounded-full w-fit'
                    onClick={() => handleDownload()} disabled={ isLoading }>{isLoading ? 'Downloading' : 'Download Report'}</Button>
        
      );
   
}
