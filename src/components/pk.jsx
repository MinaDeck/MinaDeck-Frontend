import useSWR from 'swr'
import stateFetcher from '@/fetcher/state'
import { useEffect } from 'react'
import Avatar from './avatar'
import PlayingCard from './cards'
import classNames from 'classnames'
import { displayAddress } from '@/util'

export default function PK() {
  const { data: gamePlayerInfo, mutate: gamePlayerInfoMutate } = useSWR('local:gamePlayerInfo', stateFetcher)
  const { data: gamePK, mutate: gamePKMutate } = useSWR('local:gamePK', stateFetcher)
  const { data: gamePlayersCard } = useSWR('local:gamePlayersCard', stateFetcher)
  const { data: gameUsers, mutate: gameUsersMutate } = useSWR('local:gameUsers', stateFetcher)

  const user0 = gameUsers?.find(u => u.userId === gamePK?.userId)
  const user1 = gameUsers?.find(u => u.userId === gamePK?.compareId)
  // type: 4, userId: 7, WinUserId: 7, compareId: 2, betChips: 4
  useEffect(() => {
    if(gamePK?.userId) {
      setTimeout(() => {
        stateFetcher('local:gamePK', null).then(gamePKMutate)
      }, gamePK?.animationSecond ? gamePK.animationSecond * 1000 : 6000)
    }
  }, [ gamePK ])

  return (
    <div tabIndex={1} className={classNames(
      'group absolute transition-opacity inset-0 flex items-center justify-center overflow-hidden select-none',
      gamePK?.userId ? 'opacity-100' : 'opacity-0',
      gamePK?.userId ? 'pointer-events-auto' : 'pointer-events-none'
    )}>
      <div
        className='transition-transform duration-300 delay-200 -translate-x-full group-[.opacity-100]:translate-x-0 absolute top-0 left-0 w-full h-full bg-no-repeat bg-[url("/pk.png")] flex items-center justify-start'>
        <div className='flex relative left-48 top-2'>
          <div className='relative top-4 left-10'>
            <Avatar hiascent={user0?.userId !== gamePK?.WinUserId} user={user0} userId={gamePlayerInfo?.userId} headPic={user0?.headPic} dealer={user0?.isBanker} />
            <div className='absolute -left-16 bottom-8 w-32 text-center font-extrabold text-white text-sm [text-shadow:1px_1px_0_rgb(0,0,0),-1px_-1px_0_rgb(0,0,0),1px_-1px_0_rgb(0,0,0),-1px_1px_0_rgb(0,0,0)]'>{displayAddress(gamePlayerInfo?.address)}</div>
          </div>
          <div className='flex scale-75 relative -top-4'>
            <PlayingCard className='mr-1' value={gamePlayersCard?.[user0?.userId]?.[0]} />
            <PlayingCard className='mr-1' value={gamePlayersCard?.[user0?.userId]?.[1]} />
            <PlayingCard className='mr-1' value={gamePlayersCard?.[user0?.userId]?.[2]} />
          </div>
        </div>
      </div>

      <div
        style={ { backgroundPositionY: -720 } }
        className='transition-transform duration-300 delay-200 translate-x-full group-[.opacity-100]:translate-x-0 absolute top-0 left-0 w-full h-full bg-no-repeat bg-[url("/pk.png")] bg-right-top flex items-center justify-end'>
        <div className='flex relative right-60 top-4'>
          <div className='flex scale-75 w-44 relative'>
            <PlayingCard className='mr-1' value={gamePlayersCard?.[user1?.userId]?.[0]} />
            <PlayingCard className='mr-1' value={gamePlayersCard?.[user1?.userId]?.[1]} />
            <PlayingCard className='mr-1' value={gamePlayersCard?.[user1?.userId]?.[2]} />
          </div>
          <div className='relative top-6 left-36'>
            <Avatar hiascent={user1?.userId !== gamePK?.WinUserId} user={user1} userId={user1?.userId} headPic={user1?.headPic} dealer={user1?.isBanker}  />
            <div className='absolute top-2/3 right-1/3 w-32 bottom-3 text-center font-extrabold text-white text-sm [text-shadow:1px_1px_0_rgb(0,0,0),-1px_-1px_0_rgb(0,0,0),1px_-1px_0_rgb(0,0,0),-1px_1px_0_rgb(0,0,0)]'>{displayAddress(gamePlayerInfo?.address)}</div>
          </div>
        </div>
      </div>
      <div className='relative transition-[opacity,transform] delay-500 opacity-0 scale-[10] group-[.opacity-100]:opacity-100 group-[.opacity-100]:scale-100 w-52 h-52 bg-no-repeat bg-[url("/pk.png")]' style={ { backgroundPositionY: -1440 } }
        onTransitionEnd={(e) => {
          const showed = e.target.closest('.group.opacity-100')
          if(showed) {
            e.target.closest('.game-panel')?.classList.add('scale-[0.975]')
          }
        }}
      ></div>
      {/* <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/100 from-0% to-30%'>
        <svg className='w-full h-full' viewBox='0 0 1280 720' xmlns='http://www.w3.org/2000/svg'>
          <linearGradient id='lg0'>
            <stop offset='0%' stopColor='rgb(0,0,0)' stopOpacity={0.5} />
            <stop offset='100%' stopColor='rgb(37,99,235)' stopOpacity={0.5}/>
          </linearGradient>
          <path d='M0 0 H880 L400 720 H0 z' fill='url(#lg0)' />
        </svg>
      </div>
      <div className='absolute top-0 left-0 w-full h-full'>
        <svg className='w-full h-full' viewBox='0 0 1280 720' xmlns='http://www.w3.org/2000/svg'>
          <linearGradient id='lg1'>
            <stop offset='0%' stopColor='rgb(220,38,38)' stopOpacity={0.5} />
            <stop offset='100%' stopColor='rgb(0,0,0)' stopOpacity={0.5} />
          </linearGradient>
          <path d='M1280 0 H880 L400 720 H1280 z' fill='url(#lg1)' />
        </svg>
      </div> */}
    </div>
  )
}