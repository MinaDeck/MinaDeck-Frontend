'use client'
// This marks the component as client-side only

import { useSearchParams } from 'next/navigation'
// Get access to the search params from the URL

import GameRoom from './room'
// Import the GameRoom component 

import { useGameData } from '@/hooks/useGameData';
// Custom hook to get game data

export default function GamePage() {

  const searchParams = useSearchParams();
  // Get the search params object
  
  const gameId = searchParams.get('gameId');
  // Get the gameId from the search params
  
  const { gameData } = useGameData();
  // Get game data from custom hook
  
  console.log("gameData on game page:", gameData);
  // Log the game data

  if (!gameId || !/^[a-f\d]{8}$/i.test(gameId)) {
    // Validate gameId format
    
    return <div className='text-white'>Illegal Room Number {gameId}</div>;
  }

  // If valid, render the GameRoom component
  return <GameRoom gameId={gameId} />; 

}
