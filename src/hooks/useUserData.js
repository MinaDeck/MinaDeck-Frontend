// Enable client-side only features in Next.js
'use client'

// Import hooks from React
import { useState, useEffect } from 'react';

// Custom hook for managing game data
export function useUserData() {
    // State to store game data with initial default values
    const [userData, setUserData] = useState({ id: "", address: "", name: "", userName: "", status: "" });

    // useEffect hook to load game data from local storage when the component mounts
    useEffect(() => {
        // Retrieve game data from local storage
        const storedUserData = localStorage.getItem('userData');
        // console.log('User data loaded from local storage 1', storedUserData)
        // If stored game data is found, update the state with this data
        if (storedUserData) {
            setUserData(prevUserData => ({ ...prevUserData, ...JSON.parse(storedUserData) }));
            console.log('User data loaded from local storage 2', JSON.parse(storedUserData));
        }
    }, []); // Empty dependency array to ensure this effect runs only once on mount

    // useEffect hook to save game data to local storage when it changes
    useEffect(() => {
        // Check if the size is not zero to avoid saving default/empty values
        if (!(userData.id == "")) {
            // Save updated game data to local storage
            localStorage.setItem('userData', JSON.stringify(userData));
            console.log('User data saved to local storage 1', userData);
        }

        // Dummy state update to ensure the latest state is always used - may not be necessary
        setUserData(prevUserData => prevUserData);
    }, [userData]); // Dependency on gameData to trigger effect when it changes

    // Return the game data state and its setter function
    return {
        userData,
        setUserData,
    };
}
