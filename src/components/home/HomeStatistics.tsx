"use client"

import { complaintsGetCount } from '@/data-fetchers/ComplaintsFunctions';
import { pollResponsesGetCount } from '@/data-fetchers/PollResponsesFunctions';
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { COMPLAINTS_GET_COUNT_SWR_HOOK } from '@/constants/SwrHooks';


/**
This component displays a statistics in the homepage, by fetching data from backend API. For example, it
can be used for displaying the number of complaints processed and the number of responses collected.

It is a client-side component because we have the shuffling animation which means it cannot be pre-rendered.
Instead, we use CSR to  update the number as the data is being fetched.

*/
interface HomeStatisticsProps {
    initialDisplayCount: number,
    maxValue: number, //Max value for shuffling
    statsDescription: string,
    fetcherKey: string,
}


export const HomeStatistics = ({ initialDisplayCount, maxValue, statsDescription, fetcherKey }: HomeStatisticsProps) => {
    const [displayCount, setDisplayCount] = useState<number>(initialDisplayCount);  //Used for shuffling display, start with a random number

    const fetcherFunction = fetcherKey === COMPLAINTS_GET_COUNT_SWR_HOOK ? complaintsGetCount : pollResponsesGetCount


    const { data, error, isLoading } = useSWR<number>(
        fetcherKey,
        () => fetcherFunction({}),
    )
       
    // Handles the number shuffling animation
    const shuffleNumbers = () => {
        const shuffledNum = setInterval(() => {
          setDisplayCount(Math.floor(Math.random() * maxValue));  // Random number between 0 and max value
        }, 100);  // Update every 100ms to simulate the shuffle
        return shuffledNum;
    };

    //Initialise the number shuffling animation
    useEffect(() => {
        shuffleNumbers();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center space-y-2">
            <p className="text-4xl sm:text-5xl 2xl:text-6xl font-bold text-yap-green-900">
            {isLoading || error ? displayCount : data}
            </p>
            <p className="2xl:text-xl text-yap-brown-900 text-center">{ statsDescription }</p>
        </div>
    );
};