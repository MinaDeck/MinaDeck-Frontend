import stateFetcher from '@/fetcher/state'
import useSWR from 'swr'
import classNames from 'classnames'
import Avatar from './avatar'
import PlayingCard from './cards'
import { displayAddress } from '@/util'
import { useCurrentGameRoom } from '@/hooks/use-game-room'


export default function Player({
  avatar = 0,
  user = {},
  isCurrentPlayer = false,
  cards = [],
  rightSide = false,
  children,
  showPK = false,
  showAuto = true,
  showBitChips = true,
  style,
}) {
  const { data: gameCountdown, mutate: gameCountdownMutate } = useSWR('local:gameCountdown', stateFetcher)
  const showCountdown = user.userId === gameCountdown?.userId

  const { data: gamePK, mutate: gamePKMutate } = useSWR('local:gamePK', stateFetcher)
  const { data: gamePlayerInfo, mutate: gamePlayerInfoMutate } = useSWR('local:gamePlayerInfo', stateFetcher)
  const { data: gameCurrentBetChips, mutate: gameCurrentBetChipsMutate } = useSWR('local:gameCurrentBetChips', stateFetcher)

  const gameServer = useCurrentGameRoom()
  const { data: gameRoom, mutate: gameRoomMutate } = useSWR('local:gameRoom', stateFetcher)
  const { data: allowPK, mutate: allowPKMutate } = useSWR('local:allowPK', stateFetcher)


  return (
    <div className='absolute inline-flex min-w-min h-2 bg-white' style={style}>
      <div className={
        classNames(
          'flex absolute min-w-[210px] h-16 border-2 left-0 top-0 p-2 rounded-lg',
          user.userId ? 'border-black/80 bg-[rgb(50,50,50)] bg-gradient-to-b from-white/10 to-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,.2),0_0_16px_rgba(0,0,0,.8)]' : 'border-transparent',
          rightSide ? 'flex-row-reverse' : 'flex-row',
          user.userId ? '': 'invisible'
          )
        }>
        <div className={
          classNames(
            'flex grow flex-col h-full',
            rightSide ? 'pl-16' : 'pr-16',
          )
        }>
          <div className='basis-1/2 font-extrabold text-white text-sm [text-shadow:0_0_4px_rgba(0,0,0,.4))]'>{displayAddress(user.address)}</div>
          <div className='basis-1/2 mt-1 font-extrabold bg-[rgb(23,23,23)] rounded-full text-[rgb(252,255,0)] text-xs
            relative pl-6 pr-2 inline-flex items-center
            before:absolute before:left-px before:top-px before:p-px before:w-[18px] before:h-[18px] before:bg-no-repeat before:bg-cover before:bg-[url("/chips-icon2.png")]
          '>
            {user.accountBetChips}
          </div>
        </div>
        <div className='flex-none w-0'>
          <Avatar showAuto={showAuto} user={user} userId={user.userId} headPic={user.headPic} iconName={ user.userId ? avatar : 0 } dealer={user.isBanker}
            showCountdown={showCountdown} startTime={gameCountdown?.startTime} endTime={gameCountdown?.endTime}
          >
          {
            user.userId && <>
              { showBitChips && <div className='absolute flex -bottom-8 left-0 right-0 justify-center items-center'>
                <div className='inline-block px-2.5 py-0.5 font-extrabold rounded-full bg-black/40 shadow-[inset_0_0_4px_rgb(0,0,0,0.6),0_1px_1px_rgb(255,255,255,0.4)]
                  text-xs text-[rgb(0,255,128)]
                '>
                  {user.totalBetChips}
                </div>
              </div> }
              <div className='absolute flex -top-8 left-0 right-0 justify-center items-center whitespace-nowrap'>
                {/* 玩家状态: {user.state} */}
                {/* {showPK && <button className='rounded-full px-2 py-1 bg-white font-black text-xs hover:brightness-125'
                  onClick={()=>{
                    gameServer.send({
                      type: 5,
                      currRound: gameRoom.currRound,
                      compareId: user.userId,
                      betChips: gameCurrentBetChips,
                    })
                  }}
                >PK</button> } */}
              </div>
            </>
          }
          </Avatar>
        </div>
      </div>
      {
        user.userId && <div className={classNames('absolute -top-8', rightSide ? '-left-52' : 'left-64')}>
          <div className={classNames('flex scale-75 pointer-events-none', user.state === 0 || gameRoom.state === 0 ? 'invisible2' : '')}>
            <PlayingCard value={cards?.[0]} back={ user.userId ? 'back0' : 'back2' } className={classNames('', isCurrentPlayer ? '' : 'w-10')} />
            <PlayingCard value={cards?.[1]} back={ user.userId ? 'back0' : 'back2' } className={classNames('', isCurrentPlayer ? '' : 'w-10')} />
            <PlayingCard value={cards?.[2]} back={ user.userId ? 'back0' : 'back2' } className={classNames('', isCurrentPlayer ? '' : 'w-10')} />
          </div>
          { allowPK && showPK && <div className='absolute cursor-pointer border-[#00ffcc] text-[#00ffcc] font-black animate-pulse -inset-x-5 inset-y-0 rounded-3xl border-[6px] translate-x-5'
            onClick={ () => {
              // user.state === 0 || gameRoom.state === 0
              gameServer.send({
                type: 5,
                currRound: gameRoom.currRound,
                compareId: user.userId,
                betChips: gameCurrentBetChips,
              })
              stateFetcher('local:allowPK', false).then(allowPKMutate)
            } }
          ><div className='relative w-full text-center -top-8'>PK</div></div> }
          <div className='absolute inset-0 flex items-center justify-center translate-x-5 pointer-events-none'>
            {/* { user.state === 0 && <PlayerStateText fill='rgb(255,0,0)'>JOINED</PlayerStateText> } */}
            { user.state === 1 && <PlayerStateText fill='rgb(255,0,0)'>READY</PlayerStateText> }
            { user.state === 2 && user.isLookCard && <PlayerStateText fill='rgb(255,128,0)'>CHECK</PlayerStateText> }
            { user.state === 3 && <PlayerStateText fill='rgb(255,0,0)'>FOLD</PlayerStateText> }
            { user.state === 4 && <PlayerStateText fill='rgb(255,0,0)'>PK LOSE</PlayerStateText> }
            { user.state === 5 && <PlayerStateText fill='rgb(255,150,0)'>WIN</PlayerStateText> }
            { user.state === 6 && <PlayerStateText fill='rgb(255,150,0)'>CHECK</PlayerStateText> }
          </div>
          {children}
        </div>
      }
    </div>
  )
}

function PlayerStateText({
  children,
  ...props
}) {
  return (
    <div className='[background-image:linear-gradient(to_right,rgba(0,0,0,0)_0%,rgba(0,0,0,.3)_30%,rgba(0,0,0,.3)_70%,rgba(0,0,0,0)_100%)]'>
      <svg className='w-30 h-10' viewBox='0 0 120 40' xmlns='http://www.w3.org/2000/svg'>
        <text textAnchor='middle' dominantBaseline='middle' x='60' y='20' stroke='white' strokeWidth='2' fontWeight='900' fontSize='1.25rem' paintOrder='stroke' fill='currnetColor' {...props}>{children}</text>
      </svg>
    </div>
  )
}