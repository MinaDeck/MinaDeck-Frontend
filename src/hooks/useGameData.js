
'use client'
import { useState, useEffect } from 'react';

export function useGameData() {
    const [gameData, setGameData] = useState({ size: 0, lowBetChips: 0, topBetChips: 0, totalRounds: 0, gameId: '' });

    // Load data from local storage when the component mounts
    useEffect(() => {
        const storedGameData = localStorage.getItem('gameData');

        if (storedGameData) {
            setGameData(JSON.parse(storedGameData));
        }
    }, []);

    // Save data to local storage when it changes
    useEffect(() => {
        localStorage.setItem('gameData', JSON.stringify(gameData));
    }, [gameData]);

    return {
        gameData,
        setGameData,
    };
};
