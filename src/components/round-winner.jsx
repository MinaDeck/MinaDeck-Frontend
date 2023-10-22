import useSWR from 'swr'
import stateFetcher from '@/fetcher/state'
import { useCurrentGameRoom } from '@/hooks/use-game-room'
import { useState, useEffect } from 'react'
import Player from './player'
import classNames from 'classnames'

export default function RoundWinner() {
  const { data: gamePlayersCard, mutate: gamePlayersCardMutate } = useSWR('local:gamePlayersCard', stateFetcher)
  const { data: roundWinner, mutate: roundWinnerMutate } = useSWR('local:roundWinner', stateFetcher)
  const { data: gameUsers, mutate: gameUsersMutate } = useSWR('local:gameUsers', stateFetcher)

  useEffect(() => {
    if(roundWinner) {
      setTimeout(() => {
        stateFetcher('local:roundWinner', null).then(roundWinnerMutate)
      }, roundWinner?.animationSecond || 6000)
    }
  }, [ roundWinner ])

  const winner = gameUsers?.find(u => u.userId === roundWinner?.userId)

  return (
    <div className={classNames(
      'absolute inset-0 z-[3] bg-[url("/round-winner.png")] bg-black/50 bg-no-repeat bg-[0_50px]',
      winner ? 'opacity-100' : 'opacity-0',
      winner ? 'pointer-events-auto' : 'pointer-events-none'
    )}>
      {roundWinner && <Player
        style={{left:360, top:330}}
        showAuto={false}
        showBitChips={false}
        user={winner}
        isCurrentPlayer={true}
        cards={gamePlayersCard?.[winner?.userId]}
      />}
    </div>
  )
}