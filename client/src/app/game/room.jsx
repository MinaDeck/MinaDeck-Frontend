'use client'
import PlayerPanel from '@/components/player-panel'
import useSWR from 'swr'
import { animated, useSpring, to } from '@react-spring/web'
import stateFetcher from '@/fetcher/state'
import { useEffect, useRef, useState, useCallback } from 'react'
import PK from '@/components/pk'
import classNames from 'classnames'
import { useGameRoom } from '@/hooks/useGameRoom'
import BottomController from './bottom-controller'
import NavigationToolbar from '@/components/navigation-toolbar'
import RoundResult from '@/components/round-result'
import RoundWinner from '@/components/round-winner'
import GlobalTips from '@/components/global-tips'
import GameInfo from '@/components/game-info'
import { useGameData } from '@/hooks/useGameData';
import { useUserData } from '@/hooks/useUserData'

export default function GameRoom({ gameId }) {
  const { gameData } = useGameData();
  console.log("gameData on room:", gameData);

  const { data: gameRoom, mutate: gameRoomMutate } = useSWR('local:gameRoom', stateFetcher)
  // const { data: gameUsers, mutate: gameUsersMutate } = useSWR('local:gameUsers', stateFetcher)
  const [gameUsers, gameUsersMutate] = useState(gameData?.size)
  const { data: gamePlayerInfo, mutate: gamePlayerInfoMutate } = useSWR('local:gamePlayerInfo', stateFetcher)
  const { data: gameMessages, mutate: gameMessagesMutate } = useSWR('local:gameMessages', stateFetcher)
  const { data: gamePlayersCard, mutate: gamePlayersCardMutate } = useSWR('local:gamePlayersCard', stateFetcher)
  const { data: gameCountdown, mutate: gameCountdownMutate } = useSWR('local:gameCountdown', stateFetcher)
  const { data: gamePK, mutate: gamePKMutate } = useSWR('local:gamePK', stateFetcher)
  const { data: tabledChips, mutate: tabledChipsMutate } = useSWR('local:tabledChips', stateFetcher)
  const { data: roundResult, mutate: roundResultMutate } = useSWR('local:roundResult', stateFetcher)
  const { data: listBetChips, mutate: listBetChipsMutate } = useSWR('local:listBetChips', stateFetcher)
  const { data: gameCurrentBetChips, mutate: gameCurrentBetChipsMutate } = useSWR('local:gameCurrentBetChips', stateFetcher)
  const { data: roundWinner, mutate: roundWinnerMutate } = useSWR('local:roundWinner', stateFetcher)
  const { data: currentChipIndex, mutate: currentChipIndexMutate } = useSWR('local:currentChipIndex', stateFetcher)
  const { data: allowPK, mutate: allowPKMutate } = useSWR('local:allowPK', stateFetcher)
  const [loading, setLoading] = useState(true);

  const { userData, setUserData } = useUserData();

  let gameServer = useGameRoom(gameId)

  useEffect(() => {
    if (gameServer.data) {
      gameServer.send(JSON.stringify({ state: "read data" }));
    }
  }, [gameServer.data]);

  useEffect(() => {
    const delay = 2000;
    const timeout = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => clearTimeout(timeout);
  }, [userData]);

  useEffect(() => {
    const state = gameServer?.data ?? {}
    console.log(state)

    if (!loading) {
      stateFetcher('local:gamePlayerInfo', state[0]?.user).then(gamePlayerInfoMutate)
    }

  }, [gameServer.data, loading])

  console.log(gamePlayerInfo)

  return (
    <>
      <div className='hidden scale-[0.975]'></div>
      <div className='game-panel transition-transform relative w-[1280px] h-[720px] m-20 mt-10 mx-auto bg-[url("/bg-3.jpg")] select-none rounded-3xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.8)]'
        onTransitionEnd={e => {
          e.target.classList.remove('scale-[0.975]')
        }}
        data-testid="game room"
      >
        <NavigationToolbar />
        <GameInfo />

        <BottomController></BottomController>
        <PlayerPanel></PlayerPanel>
        <div className='chips-tabled-panel absolute top-[125px] left-1/2 w-[220px] h-[220px] -translate-x-1/2 pointer-events-none'>
          <div className='flex items-center justify-center h-full'>
            {tabledChips?.map?.(({ from, to, value, colorIndex }, index) => <ValuedChips key={`table_chips_${index}`} from={from} to={to} value={value} colorIndex={colorIndex} />)}
          </div>
        </div>
        <PK />
      </div>
      <RoundResult />
      <RoundWinner />
      <GlobalTips />
    </>
  )
}


function ValuedChips({
  className,
  value = '',
  from = { x: 0, y: 0 },
  to: positionTo = { x: 0, y: 0 },
  colorIndex = 0,
}) {
  const styles = useSpring(
    {
      from: { x: from.x, y: from.y },
      to: { x: positionTo.x, y: positionTo.y },
      duration: 10000,
    }
  )

  return (
    <animated.div className='absolute w-12 h-12' style={{ transform: to([styles.x, styles.y], (x, y) => `translate(${x}px,${y}px`) }}>
      <div className='absolute inset-0 bg-black/60 rounded-full blur-[2px] translate-y-0.5' />
      <animated.div className={
        classNames(
          'absolute inset-0 bg-cover bg-no-repeat bg-[url("/chips-blank-2.png")] flex items-center justify-center font-black text-white',
          value < 1000 ? 'text-base' : 'text-xs',
        )
      } style={{ transform: to(styles.x, x => `rotate(${x * 2}deg)`), backgroundImage: `url("/chips-blank-${colorIndex + 1}.png")` }}>{value}</animated.div>
    </animated.div>
  )
}