// Enable client-side only features in Next.js
'use client'

// Import hooks from React
import { useState, useEffect } from 'react';

// Custom hook for managing game data
export function useGameData() {
    // State to store game data with initial default values
    const [gameData, setGameData] = useState({ size: 0, lowBetChips: 0, topBetChips: 0, totalRounds: 0, gameId: '' });

    // useEffect hook to load game data from local storage when the component mounts
    useEffect(() => {
        // Retrieve game data from local storage
        const storedGameData = localStorage.getItem('gameData');

        // If stored game data is found, update the state with this data
        if (storedGameData) {
            setGameData(prevGameData => ({ ...prevGameData, ...JSON.parse(storedGameData) }));
            console.log('Game data loaded from local storage 2', JSON.parse(storedGameData));
        }
    }, []); // Empty dependency array to ensure this effect runs only once on mount

    // useEffect hook to save game data to local storage when it changes
    useEffect(() => {
        // Check if the size is not zero to avoid saving default/empty values
        if (!gameData.size == 0) {
            // Save updated game data to local storage
            localStorage.setItem('gameData', JSON.stringify(gameData));
            console.log('Game data saved to local storage 1', gameData);
        }

        // Dummy state update to ensure the latest state is always used - may not be necessary
        setGameData(prevGameData => prevGameData);
    }, [gameData]); // Dependency on gameData to trigger effect when it changes

    // Return the game data state and its setter function
    return {
        gameData,
        setGameData,
    };
}
