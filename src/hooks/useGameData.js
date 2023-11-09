'use client'
import { useState, useEffect } from 'react';

export function useGameData() {
    const [gameData, setGameData] = useState({ size: 0, lowBetChips: 0, topBetChips: 0, totalRounds: 0, gameId: '' });

    // Load data from local storage when the component mounts
    useEffect(() => {
        const storedGameData = localStorage.getItem('gameData');

        if (storedGameData) {
            setGameData(prevGameData => ({ ...prevGameData, ...JSON.parse(storedGameData) }));
            console.log('Game data loaded from local storage 2', JSON.parse(storedGameData));
        }
    }, []);

    // Save data to local storage when it changes
    useEffect(() => {
        if (!gameData.size == 0) {
            localStorage.setItem('gameData', JSON.stringify(gameData));
            console.log('Game data saved to local storage 1', gameData);
        }

        // Use the callback version of setGameData to ensure you're working with the latest state
        setGameData(prevGameData => prevGameData);
    }, [gameData]);

    return {
        gameData,
        setGameData,
    };
}