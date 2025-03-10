"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL_ADMIN_MANAGEMENT, COMPLAINTS_SEARCH_ENDPOINT } from '@/constants/ApiRoutes';


/**
This component displays the number of responses collected, used in the homepage
*/


const NumberOfResponsesCollected = () => {
    const [count, setCount] = useState<number>(0);  //Used for the actual count
    const [displayCount, setDisplayCount] = useState<number>(120);  //Used for shuffling display, start with a random number
    const [isLoading, setIsLoading] = useState<boolean>(true);



    // Handles the API call to fetch the number of responses
    const fetchNumberOfResponses = async () => {
        setIsLoading(true)

        //Delay before fetching API
        await new Promise(resolve => setTimeout(resolve, 2000));

        //Fetch API

        try {
            // const searchComplaintsApiEndPoint = API_BASE_URL_ADMIN_MANAGEMENT + '/' + COMPLAINTS_SEARCH_ENDPOINT
            // const allComplaintsData = await axios.post(searchComplaintsApiEndPoint, 
            //     {
            //         "filter": {},
            //         "page_size": 1, //Since we are only interested in the total number of complaints
            //         "page_number": 1
            //     }
            // )
            // const totalNumberOfComplaints = allComplaintsData.data.total_count
            // setCount(totalNumberOfComplaints)
            setCount(360)
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
          setDisplayCount(Math.floor(Math.random() * 1000));  // Random number between 0 and 999
        }, 100);  // Update every 100ms to simulate the shuffle
        return shuffledNum;
    };


    //Fetch the number of complaints when component mounts
    useEffect(() => {
        //Shuffle until the data is fetched
        shuffleNumbers();
        fetchNumberOfResponses()
    }, []);


    return (
        <div className="flex flex-col justify-center items-center space-y-2">
            <p className="text-4xl sm:text-5xl 2xl:text-6xl font-bold text-yap-green-900">
            {isLoading ? displayCount : (count == -1) ? 'Something went wrong.' : count}
            </p>
            <p className="2xl:text-xl text-yap-brown-900">citizen responses collected</p>
        </div>
    );
};

export default NumberOfResponsesCollected;
