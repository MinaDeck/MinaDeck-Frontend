import useSWR from 'swr'
import stateFetcher from '@/fetcher/state'
import { useGameData } from '@/hooks/useGameData';

// Component to display game information
export default function GameInfo() {
  // Retrieves game data from a custom hook
  const { gameData } = useGameData();

  // Fetching various game-related data using SWR (stale-while-revalidate)
  const { data: gameRoom } = useSWR('local:gameRoom', stateFetcher);
  const { data: gameUsers } = useSWR('local:gameUsers', stateFetcher);
  // ... more data fetching for different aspects of the game ...

  // Main return method that renders the game information UI
  return (
    // Outer container for game info
    <div className='absolute top-0 w-full font-bold text-gray-700 left-0 text-center'>
      // Container for betting chips information
      <div className='betting-chips-container'>
        // Displaying low and top betting chips information
        <div className='bet-info'>LOW: {gameData?.lowBetChips}</div>
        <div className='bet-info'>TOP: {gameData?.topBetChips}</div>
        // Displaying the total of tabled chips
        <div className='tabled-chips-info'>
          // Logic to display each number of the total chips
          {
            tabledChips?.reduce?.((t, { value }) => t + value, 0).toString().padStart(4, '0').split('').map((c, i) => {
              // Each digit of the total chips is rendered here
              return <div key={`c_${i}`} className='chip-digit'>{c}</div>
            })
          }
        </div>
      </div>
      // Container for displaying the game's current level
      <div className='game-level-info'>
        <div className='progress-bar'>
          // Dynamic style for progress bar based on current and total rounds
          <div className='progress' style={{ width: `${gameRoom?.currRound/gameRoom?.totalRounds * 100}%` }}></div>
          <span className='level-text'>LEVEL: 1/{gameData?.totalRounds}</span>
        </div>
      </div>
    </div>
  )
}
