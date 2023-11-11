'use client'
// import WithSignined from '../with-signin'
import { useSearchParams } from 'next/navigation'
import GameRoom from './room'
import { useGameData } from '@/hooks/useGameData';


export default function GamePage() {
  const searchParams = useSearchParams(); 
  const gameId = searchParams.get('gameId');
  const { gameData } = useGameData();
  console.log("gameData on game page:", gameData);


  if (!gameId || !/^[a-f\d]{8}$/i.test(gameId)) {
    return <div className='text-white'>Illegal Room Number {gameId}</div>;
  }

  return <GameRoom gameId={gameId} />;
}
