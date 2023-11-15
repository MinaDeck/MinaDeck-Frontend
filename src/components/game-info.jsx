import useSWR from 'swr'
import stateFetcher from '@/fetcher/state'
import { useGameData } from '@/hooks/useGameData';


export default function GameInfo() {
  const { gameData } = useGameData();
  const { data: gameRoom, mutate: gameRoomMutate } = useSWR('local:gameRoom', stateFetcher)
  const { data: tabledChips, mutate: tabledChipsMutate } = useSWR('local:tabledChips', stateFetcher)
  
  return (
    <div className='absolute top-0 w-full font-bold text-gray-700 left-0 text-center'>
      <div className='relative inline-flex items-center border-2 rounded-br-lg bg-gradient-to-b from-white/10 to-transparent rounded-bl-lg shadow-[inset_0_1px_1px_rgba(255,255,255,.2),0_0_16px_rgba(0,0,0,.8)] border-[rgb(63,23,24)] bg-no-repeat bg-[#6c322a]'>
        <div className='py-1.5 px-3 border-r border-black/20 shadow-[1px_0_0_rgba(255,255,255,.2)] text-[#e59f95]'>LOW: {gameData?.lowBetChips}</div>
        <div className='py-1.5 px-3 border-r border-black/20 shadow-[1px_0_0_rgba(255,255,255,.2)] text-[#e59f95]'>TOP: {gameData?.topBetChips}</div>
        <div className='relative text-[#ffea00] whitespace-nowrap flex py-1 pr-1 pl-11
          before:absolute before:left-2 before:top-0 before:w-9 before:bg-no-repeat before:h-9 before:bg-[length:auto_75%] before:bg-[center_left_3px] before:bg-[url("/chips-icon.png")]
        '>
          {
            tabledChips?.reduce?.((t, { value }) => t + value, 0).toString().padStart(4, '0').split('').map((c, i) => {
              return <div key={`c_${i}`} className='px-1 py-px rounded bg-[#4a2823] m-px shadow-[inset_0_0_4px_rgba(0,0,0,.6),0_1px_1px_rgba(255,255,255,.1)]'>{c}</div>
            })
          }
        </div>

      </div>
      <div className='mt-2 flex relative justify-center items-center'>
        <div className='relative rounded-full bg-black/40 border border-black/40
        shadow-[inset_0_0_4px_rgba(0,0,0,.6),0_1px_0_rgba(255,255,255,.4)] overflow-hidden min-h-[18px] min-w-[100px]'>
          <div className='top-0 left-0 absolute bg-[#0a633a] h-full bg-gradient-to-b from-white/40 to-white/0' style={{ width: `${gameRoom?.currRound/gameRoom?.totalRounds * 100}%` }}></div>
          <span className='relative px-6 py-1 flex items-center justify-center text-sm text-white'>LEVEL: 1/{gameData?.totalRounds}</span>
        </div>
      </div>
    </div>
  )
}
