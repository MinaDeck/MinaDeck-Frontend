import stateFetcher from '@/fetcher/state'
import useSWR from 'swr'
import Player from './player'
import StyledButton from './styled-button'
import { useCurrentGameRoom } from '@/hooks/useGameRoom'
import { useState } from 'react'
import { useGameData } from '@/hooks/useGameData'


export default function PlayerPanel() {
  const { data: gamePlayersCard } = useSWR('local:gamePlayersCard', stateFetcher)
  const { data: gamePlayerInfo, mutate: gamePlayerInfoMutate } = useSWR('local:gamePlayerInfo', stateFetcher)
  const { data: gameCountdown, mutate: gameCountdownMutate } = useSWR('local:gameCountdown', stateFetcher)
  const { gameData } = useGameData();


  const showPK = false
  const currentUserLocation = 0
  console.log(gamePlayerInfo)

  return (
    <div className='relative'>
      {gameData.size == 2 && (
        <>
          <Player1 />
          <Player showPK={showPK} user={gamePlayerInfo?.[(currentUserLocation + 3) % 5]} name='Player 2' point={100} avatar={3} cards={gamePlayersCard?.[gamePlayerInfo?.[(currentUserLocation + 3) % 5]?.userId]} style={{ left: 80, top: 120 }} />
        </>
      )}
      {gameData.size == 3 && (
        <>
          <Player1 />
          <Player showPK={showPK} user={gamePlayerInfo?.[(currentUserLocation + 3) % 5]} name='Player 2' point={100} avatar={3} cards={gamePlayersCard?.[gamePlayerInfo?.[(currentUserLocation + 3) % 5]?.userId]} style={{ left: 80, top: 120 }} />
          <Player showPK={showPK} user={gamePlayerInfo?.[(currentUserLocation + 2) % 5]} name='Player 3' point={100} avatar={4} cards={gamePlayersCard?.[gamePlayerInfo?.[(currentUserLocation + 2) % 5]?.userId]} style={{ right: 300, top: 120 }} rightSide />
        </>
      )}
      {gameData.size == 4 && (
        <>
          <Player1 />
          <Player showPK={showPK} user={gamePlayerInfo?.[(currentUserLocation + 3) % 5]} name='Player 2' point={100} avatar={3} cards={gamePlayersCard?.[gamePlayerInfo?.[(currentUserLocation + 3) % 5]?.userId]} style={{ left: 80, top: 120 }} />
          <Player showPK={showPK} user={gamePlayerInfo?.[(currentUserLocation + 2) % 5]} name='Player 3' point={100} avatar={4} cards={gamePlayersCard?.[gamePlayerInfo?.[(currentUserLocation + 2) % 5]?.userId]} style={{ right: 300, top: 120 }} rightSide />
          <Player showPK={showPK} user={gamePlayerInfo?.[(currentUserLocation + 4) % 5]} name='Player 4' point={100} avatar={5} cards={gamePlayersCard?.[gamePlayerInfo?.[(currentUserLocation + 4) % 5]?.userId]} style={{ left: 80, top: 300 }} />
        </>
      )}
      {gameData.size == 4 && (
        <>
          <Player1 />
          <Player showPK={showPK} user={gamePlayerInfo?.[(currentUserLocation + 3) % 5]} name='Player 2' point={100} avatar={3} cards={gamePlayersCard?.[gamePlayerInfo?.[(currentUserLocation + 3) % 5]?.userId]} style={{ left: 80, top: 120 }} />
          <Player showPK={showPK} user={gamePlayerInfo?.[(currentUserLocation + 2) % 5]} name='Player 3' point={100} avatar={4} cards={gamePlayersCard?.[gamePlayerInfo?.[(currentUserLocation + 2) % 5]?.userId]} style={{ right: 300, top: 120 }} rightSide />
          <Player showPK={showPK} user={gamePlayerInfo?.[(currentUserLocation + 4) % 5]} name='Player 4' point={100} avatar={5} cards={gamePlayersCard?.[gamePlayerInfo?.[(currentUserLocation + 4) % 5]?.userId]} style={{ left: 80, top: 300 }} />
          <Player showPK={showPK} user={gamePlayerInfo?.[(currentUserLocation + 1) % 5]} name='Player 5' point={100} avatar={7} cards={gamePlayersCard?.[gamePlayerInfo?.[(currentUserLocation + 1) % 5]?.userId]} style={{ right: 300, top: 300 }} rightSide />
        </>
      )}
    </div>

  )
}

function Player1() {
  const { data: gamePlayerInfo, mutate: gamePlayerInfoMutate } = useSWR('local:gamePlayerInfo', stateFetcher)
  const { data: gameRoom, mutate: gameRoomMutate } = useSWR('local:gameRoom', stateFetcher)
  const { data: gamePlayersCard, mutate: gamePlayerCardMutate } = useSWR('local:gamePlayersCard', stateFetcher)
  const { data: gameCountdown, mutate: gameCountdownMutate } = useSWR('local:gameCountdown', stateFetcher)

  const gameServer = useCurrentGameRoom()
  console.log(gamePlayerInfo)
  console.log("game user is :- ", gamePlayerInfo)
  const x = 360, y = 470
  return (
    <Player
      avatar={1}
      x={x} y={y}
      style={{ left: x, top: y }}
      user={gamePlayerInfo[0]}
      // user={gamePlayerInfo}
      isCurrentPlayer={true}
      cards={gamePlayersCard?.[gamePlayerInfo?.userId]}
    >
      {
        true && <div className='absolute top-12 left-20 px-6 py-1 text-center'>
          {
            [0, 3, 4, 5].includes(gamePlayerInfo?.state) && <StyledButton roundedStyle='rounded-full' className='bg-[#ff9000]' onClick={() => { gameServer.send({ type: 0, currRound: gameRoom.currRound }) }}>READY</StyledButton>
          }
          {
            gamePlayerInfo.isBanker && gamePlayerInfo.state === 0 && <StyledButton roundedStyle='rounded-full' disabled={!(gamePlayerInfo?.state === 1 && gamePlayerInfo.isBanker && gamePlayerInfo.filter(u => u.state === 1).length >= gameRoom.minimum - 1)} onClick={() => { gameServer.send({ type: 1, currRound: gameRoom.currRound }) }}>START</StyledButton>
          }
          {/* <StyledButton className='bg-[rgb(255,144,0)]' roundedStyle='rounded-full'
            onClick={ async () => { gameServer.send({ type: 2, currRound: gameRoom.currRound }) } }
            disabled={gameCountdown?.userId !== gamePlayerInfo?.userId}
          >CONTINUE</StyledButton> */}
          {gamePlayerInfo.state === 2 && !gamePlayerInfo.isLookCard &&
            <StyledButton className='bg-[rgb(1,145,186)]' roundedStyle='rounded-full'
              onClick={async () => { gameServer.send({ type: 2, currRound: gameRoom.currRound }) }}
            // disabled={gameCountdown?.userId !== gamePlayerInfo?.userId}
            >CHECK</StyledButton>
          }
        </div>

      }
    </Player>
  )
}
