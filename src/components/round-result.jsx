import FrameBox from './frame-box'
import StyledButton from './styled-button'
import useSWR from 'swr'
import stateFetcher from '@/fetcher/state'
import { useCurrentGameRoom } from '@/hooks/use-game-room'
import { displayAddress } from '@/util'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'


export default function RoundResult({ onClose }) {
  const { data: gameRoom, mutate: gameRoomMutate } = useSWR('local:gameRoom', stateFetcher)
  const { data: gamePlayerInfo, mutate: gamePlayerInfoMutate } = useSWR('local:gamePlayerInfo', stateFetcher)
  const { data: gamePlayersCard, mutate: gamePlayersCardMutate } = useSWR('local:gamePlayersCard', stateFetcher)
  const { data: gamePK, mutate: gamePKMutate } = useSWR('local:gamePK', stateFetcher)
  const { data: roundResult, mutate: roundResultMutate } = useSWR('local:roundResult', stateFetcher)
  const { data: roundWinner, mutate: roundWinnerMutate } = useSWR('local:roundWinner', stateFetcher)

  const gameServer = useCurrentGameRoom()
  const router = useRouter()

  if(roundResult?.isGameOver && roundResult?.records) {
    return (
      <FrameBox title={<div className='bg-[url("/title-gameover.png")] bg-no-repeat bg-top h-[260px] -translate-y-2/3'></div>} onClose={onClose} showClose={false}>
        <div className='w-[540px] m-10 mt-24 text-center text-white font-black flex flex-col gap-2'>
          {roundResult.records?.map((record, i) => {
            return (
              <div key={`record_${i}`} className={classNames(
                'flex justify-between items-center rounded-full',
                i === 0 ? 'text-2xl' : 'text-xl',
                gamePlayerInfo.userId === record.userId ? 'text-yellow-400 bg-black/50' : 'bg-black/20'
              )}>
                <div>
                { i === 0 && <img className='inline mr-2' src='/gameover-no1.png' /> }
                { i === 1 && <img className='inline mr-2' src='/gameover-no2.png' /> }
                { i === 2 && <img className='inline mr-2' src='/gameover-no3.png' /> }
                { i > 2 && <span className='inline-flex my-1 ml-1 mr-4 w-9 h-9 rounded-full bg-white/20 items-center justify-center'>{i+1}</span> }
                  {displayAddress(record.address)}</div>
                <div className='mr-4'><img className='inline mr-2' src='/chips-icon.png' />{record.amount > 0 ? '+' : '-'} {Math.abs(record.amount)}</div>
              </div>
            )
          })}
        </div>
        <div className='flex justify-center'>
          <StyledButton className='bg-[#ff9000] m-2' roundedStyle='rounded-full' onClick={ () => {
            globalThis.location.replace('/')
          } }>
            <div className='text-2xl' >PLAY AGAIN</div>
          </StyledButton>
        </div>
      </FrameBox>
    )
  }

  if(!gamePK && !roundWinner && roundResult?.records) {
    const title = roundResult.userId === gamePlayerInfo.userId
      ? <div className='bg-[url("/title-gamewin.png")] bg-no-repeat bg-top h-[148px] -translate-y-2/3'></div>
      : <div className='bg-[url("/title-gamelose.png")] bg-no-repeat bg-top h-[148px] -translate-y-2/3'></div>
    return (
      <FrameBox title={title} onClose={onClose} showClose={false}>
        <div className='w-[540px] m-10 mt-14 text-center text-white font-black flex flex-col gap-2'>
          {roundResult.records?.map((record, i) => {
            return (
              <div key={`record_${i}`} className={classNames(
                'flex justify-between px-4 py-2 rounded-full',
                gamePlayerInfo.userId === record.userId ? 'text-yellow-400 text-2xl bg-black/50' : 'text-xl bg-black/20'
              )}>
                <div>{displayAddress(record.address)}</div>
                <div><img className='inline mr-2' src='/chips-icon.png' />{record.amount > 0 ? '+' : '-'} {Math.abs(record.amount)}</div>
              </div>
            )
          })}
        </div>
        <div className='flex justify-center'>
          <StyledButton className='bg-[#ff9000] m-2' roundedStyle='rounded-full' onClick={ () => {
            // gameServer.send({ type: 0, currRound: gameRoom.currRound })
            stateFetcher('local:roundResult', {}).then(roundResultMutate)
          } }>
            <div className='text-2xl' >CLOSE</div>
          </StyledButton>
        </div>
      </FrameBox>
    )
  }

  return null
}