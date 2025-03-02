"use client"

import PageSubtitle from "@/components/common/text/PageSubtitle"
import { Category } from "@/types/Category"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

/**
This component is used to display the most negative complaints of a given category
in the category analytics page.
*/
interface CategoryAnalyticsStatisticsProps {
    category: Category
}



export default function CategoryAnalyticsStatistics({ category }: CategoryAnalyticsStatisticsProps) {
    //States
    const [hasRanAPi, setHasRanApi] = useState<boolean>(false)
    const [isThereError, setIsThereError] = useState<boolean>(false)
    const [totalNumberOfComplaints, setTotalNumberOfcomplaints] = useState<number>(-1)
    const [currentSentiment, setCurrentSentiment] = useState<number>(-1)


    const fetchCategoryStatistics = async () => {
        try {
            //Call API to fetch category statistics given its name
            
            //Process data

            //Update state
            setTotalNumberOfcomplaints(1500)
            setCurrentSentiment(-0.5)
        } catch (error) {
            setIsThereError(true)

        } finally {
            setHasRanApi(true)

        }
    }


    //Fetch category statistics on component mount
    useEffect(() => {
        fetchCategoryStatistics()
    }, [])



    return (
        !hasRanAPi
        ? (<Skeleton className='w-full h-[100px]' />)
        : isThereError
        ? <div className='paragraph-container'>
            <PageSubtitle pageSubtitle="Statistics" />
            <p className='text-yap-black-800'>Something went wrong with fetching the statistics.</p>
            </div>
        : (
            <div className='paragraph-container'>
                <PageSubtitle pageSubtitle="Statistics" />


                <div className='flex flex-col justify-start items-center space-y-8 xs:space-y-0 xs:flex-row xs:justify-start xs:flex-wrap xs:space-x-16'>
                    {/* Total number of complaints */}
                    <div className='flex flex-col justify-center items-center space-y-2'>
                        <p className='text-5xl font-bold text-yap-green-900'>{ totalNumberOfComplaints }</p>
                        <p className='text-lg text-yap-brown-900'>Total no. of complaints</p>
                    </div>


                    {/* Current sentiment */}
                    <div className='flex flex-col justify-center items-center space-y-2'>
                        <p className={`text-5xl font-bold ${currentSentiment < 0 ? 'text-yap-orange-900' : 'text-yap-green-900'}`}>{ currentSentiment }</p>
                        <p className='text-lg text-yap-brown-900'>Current sentiment</p>
                    </div>
                </div>
            </div>
           )
    )
}
