"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL_ADMIN_MANAGEMENT, COMPLAINTS_SEARCH_ENDPOINT } from '@/constants/ApiRoutes';


/**
This component displays the number of complaints processed, used in the homepage
*/


const NumberOfComplaintsProcessed = () => {
    const [count, setCount] = useState<number>(0);  //Used for the actual count
    const [displayCount, setDisplayCount] = useState<number>(8500);  //Used for shuffling display, start with a random number
    const [isLoading, setIsLoading] = useState<boolean>(true);



    // Handles the API call to fetch the number of complaints
    const fetchNumberOfComplaints = async () => {
        setIsLoading(true)

        //Delay before fetching API
        await new Promise(resolve => setTimeout(resolve, 2000));

        //Fetch API

        try {
            const searchComplaintsApiEndPoint = API_BASE_URL_ADMIN_MANAGEMENT + '/' + COMPLAINTS_SEARCH_ENDPOINT
            const allComplaintsData = await axios.post(searchComplaintsApiEndPoint, 
                {
                    "filter": {},
                    "page_size": 1, //Since we are only interested in the total number of complaints
                    "page_number": 1
                }
            )
            const totalNumberOfComplaints = allComplaintsData.data.total_count
            setCount(totalNumberOfComplaints)
        } catch (error) {
            //Error in fetching number
            setCount(-1)
        } finally {
            setIsLoading(false)
        }
    };

    // Handles the number shuffling animation
    const shuffleNumbers = () => {
        let shuffledNum = setInterval(() => {
          setDisplayCount(Math.floor(Math.random() * 10000));  // Random number between 0 and 9999
        }, 100);  // Update every 100ms to simulate the shuffle
        return shuffledNum;
    };


    //Fetch the number of complaints when component mounts
    useEffect(() => {
        //Shuffle until the data is fetched
        shuffleNumbers();
        fetchNumberOfComplaints()
    }, []);


    return (
        <div className="flex flex-col justify-center items-center space-y-2">
            <p className="text-4xl sm:text-5xl 2xl:text-6xl font-bold text-yap-green-900">
            {isLoading ? displayCount : (count == -1) ? 'Something went wrong.' : count}
            </p>
            <p className="2xl:text-xl text-yap-brown-900">complaints processed</p>
        </div>
    );
};

export default NumberOfComplaintsProcessed;
