import useSWR from 'swr'
import stateFetcher from '@/fetcher/state'
import { useGameData } from '@/hooks/useGameData';

// Component to display game information
export default function GameInfo() {
  // Retrieves game data from a custom hook
  const { gameData } = useGameData();
  const { data: gameRoom, mutate: gameRoomMutate } = useSWR('local:gameRoom', stateFetcher)
  const { data: gameUsers, mutate: gameUsersMutate } = useSWR('local:gameUsers', stateFetcher)
  const { data: gamePlayerInfo, mutate: gamePlayerInfoMutate } = useSWR('local:gamePlayerInfo', stateFetcher)
  const { data: gameMessages, mutate: gameMessagesMutate } = useSWR('local:gameMessages', stateFetcher)
  const { data: gamePlayersCard, mutate: gamePlayersCardMutate } = useSWR('local:gamePlayersCard', stateFetcher)
  const { data: gameCountdown, mutate: gameCountdownMutate } = useSWR('local:gameCountdown', stateFetcher)
  const { data: gamePK, mutate: gamePKMutate } = useSWR('local:gamePK', stateFetcher)
  const { data: tabledChips, mutate: tabledChipsMutate } = useSWR('local:tabledChips', stateFetcher)
  const { data: roundResult, mutate: roundResultMutate } = useSWR('local:roundResult', stateFetcher)
  const { data: gameCurrentBetChips, mutate: gameCurrentBetChipsMutate } = useSWR('local:gameCurrentBetChips', stateFetcher)
  const { data: roundWinner, mutate: roundWinnerMutate } = useSWR('local:roundWinner', stateFetcher)

  return (
    // Outer container for game info
    <div className='absolute top-0 w-full font-bold text-gray-700 left-0 text-center'>
      <div className='betting-chips-container'>

        <div className='bet-info'>LOW: {gameData?.lowBetChips}</div>
        <div className='bet-info'>TOP: {gameData?.topBetChips}</div>

        <div className='tabled-chips-info'>

          {
            tabledChips?.reduce?.((t, { value }) => t + value, 0).toString().padStart(4, '0').split('').map((c, i) => {
              // Each digit of the total chips is rendered here
              return <div key={`c_${i}`} className='chip-digit'>{c}</div>
            })
          }
        </div>
      </div>
      <div className='game-level-info'>
        <div className='progress-bar'>

          <div className='progress' style={{ width: `${gameRoom?.currRound / gameRoom?.totalRounds * 100}%` }}></div>
          <span className='level-text'>LEVEL: 1/{gameData?.totalRounds}</span>
        </div>
      </div>
    </div>
  )
}
