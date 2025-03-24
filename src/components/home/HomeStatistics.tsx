"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL_ADMIN_MANAGEMENT } from '@/constants/ApiRoutes';


/**
This component displays a statistics in the homepage, by fetching data from backend API. For example, it
can be used for displaying the number of complaints processed and the number of responses collected.
*/
interface HomeStatisticsProps {
    initialDisplayCount: number,
    apiEndpoint: string,
    maxValue: number, //Max value for shuffling
    statsDescription: string,
}



export const HomeStatistics = ({ initialDisplayCount, apiEndpoint, maxValue, statsDescription }: HomeStatisticsProps) => {
    const [count, setCount] = useState<number>(0);  //Used for the actual count
    const [displayCount, setDisplayCount] = useState<number>(initialDisplayCount);  //Used for shuffling display, start with a random number
    const [isLoading, setIsLoading] = useState<boolean>(true);



    // Handles the API call to fetch the statistics
    const fetchStatistics = async () => {
        setIsLoading(true)

        //Delay before fetching API
        await new Promise(resolve => setTimeout(resolve, 2000));

        //Fetch API
        //TODO: Update again depending on the API design
        try {
            const apiEndPointToCall = API_BASE_URL_ADMIN_MANAGEMENT + apiEndpoint
            const data = await axios.post(apiEndPointToCall, 
                {
                    "filter": {}
                }
            )
            const statisticsValue = data.data.count
            setCount(statisticsValue)
        } catch (error) {
            //Error in fetching number
            setCount(-1)
        } finally {
            setIsLoading(false)
        }
    };

    // Handles the number shuffling animation
    const shuffleNumbers = () => {
        const shuffledNum = setInterval(() => {
          setDisplayCount(Math.floor(Math.random() * maxValue));  // Random number between 0 and max value
        }, 100);  // Update every 100ms to simulate the shuffle
        return shuffledNum;
    };


    //Fetch the statistics when component mounts
    useEffect(() => {
        //Shuffle until the data is fetched
        shuffleNumbers();
        fetchStatistics()
    }, []);


    return (
        <div className="flex flex-col justify-center items-center space-y-2">
            <p className="text-4xl sm:text-5xl 2xl:text-6xl font-bold text-yap-green-900">
            {isLoading ? displayCount : (count == -1) ? 0 : count}
            </p>
            <p className="2xl:text-xl text-yap-brown-900">{ statsDescription }</p>
        </div>
    );
};