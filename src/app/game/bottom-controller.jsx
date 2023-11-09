
import Chips from '@/components/chips'
import StyledButton from '@/components/styled-button'
import { Switch } from '@headlessui/react'
import useSWR, { mutate } from 'swr'
import stateFetcher from '@/fetcher/state'
import { useState } from 'react'
import classNames from 'classnames'
import { useCurrentGameRoom } from '@/hooks/use-game-room'

function SelectableChips({ value, checked, setChecked }) {
  return (
    <Switch
      checked={checked}
      onChange={setChecked}
      className={classNames(
        'w-20 h-20 relative before:duration-300 before:transition-opacity before:opacity-0 before:bg-yellow-500 hover:before:opacity-100 before:rounded-full before:blur-sm before:absolute before:w-full before:h-full before:block',
        checked ? 'before:opacity-100 -translate-y-4' : '',
      )}
    >
      <Chips value={value} className='scale-[0.54] origin-top-left' />
    </Switch>
  )
}


function BlankChip({ index = 0, checked, setChecked }) {
  const gameServer = useCurrentGameRoom()
  const { data: listBetChips, mutate: listBetChipsMutate } = useSWR('local:listBetChips', stateFetcher)
  const { data: gameCurrentBetChips, mutate: gameCurrentBetChipsMutate } = useSWR('local:gameCurrentBetChips', stateFetcher)
  const { data: gameRoom, mutate: gameRoomMutate } = useSWR('local:gameRoom', stateFetcher)
  const { data: showChipPanel, mutate: showChipPanelMutate } = useSWR('local:showChipPanel', stateFetcher)
  const { data: currentChipIndex, mutate: currentChipIndexMutate } = useSWR('local:currentChipIndex', stateFetcher)

  const value = listBetChips?.[index]
  const allowControl = value > gameCurrentBetChips
  return (
    <div
      className={classNames(
        'cursor-pointer w-20 h-20 relative transition-transform before:duration-300 before:transition-opacity before:opacity-0 before:bg-yellow-500 hover:before:opacity-100 before:rounded-full before:blur-sm before:absolute before:w-full before:h-full before:block',
        'hover:before:opacity-100 hover:-translate-y-4',
        allowControl ? 'pointer-events-auto' : 'pointer-events-none grayscale'
      )}
      onClick={ () => {
        gameServer.send({
          type: 4,
          currRound: gameRoom.currRound,
          betChips: value,
        })
        stateFetcher('local:showChipPanel', false).then(showChipPanelMutate)
        stateFetcher('local:currentChipIndex', index).then(currentChipIndexMutate)
      }}
    >
      <div className='scale-[0.54] origin-top-left'>
        <div
          className={'bg-no-repeat relative bg-contain flex items-center justify-center font-black text-white text-5xl'}
          style={ {
            width: 148, height: 148,
            backgroundImage: `url("/chips-blank-${index+1}.png")`
          } }
        >{value}</div>
      </div>
    </div>
  )
}

export default function BottomController() {
  const gameServer = useCurrentGameRoom()

  const { data: gameRoom, mutate: gameRoomMutate } = useSWR('local:gameRoom', stateFetcher)
  const { data: gamePlayerInfo, mutate: gamePlayerInfoMutate } = useSWR('local:gamePlayerInfo', stateFetcher)
  const { data: gameCountdown, mutate: gameCountdownMutate } = useSWR('local:gameCountdown', stateFetcher)
  const { data: gameCurrentBetChips, mutate: gameCurrentBetChipsMutate } = useSWR('local:gameCurrentBetChips', stateFetcher)
  const { data: listBetChips, mutate: listBetChipsMutate } = useSWR('local:listBetChips', stateFetcher)
  const { data: allowPK, mutate: allowPKMutate } = useSWR('local:allowPK', stateFetcher)
  const { data: showChipPanel, mutate: showChipPanelMutate } = useSWR('local:showChipPanel', stateFetcher)

  
  const currentUserLocation = gamePlayerInfo?.location
  const allowControl = gameCountdown && gamePlayerInfo && gameCountdown.userId === gamePlayerInfo.userId

  return (
    <>
      <div className='absolute left-2 bottom-2 right-2 flex gap-2 items-center justify-center'>
        <div className='items-fold'>
          <StyledButton className='bg-red-600 mr-40'
            disabled={!(gameRoom?.state === 1 && gamePlayerInfo?.state === 2)}
            onClick={() => {
              gameServer.send({ type: 3, currRound: gameRoom.currRound, isAutoBet: gamePlayerInfo.isAutoBet })
            }}
          ><div className='h-10 inline-flex items-center'>FOLD</div></StyledButton>
        </div>
        <div>
          <StyledButton className={classNames('bg-[rgb(255,150,0)] transition-transform', showChipPanel ? 'translate-y-40' : 'translate-y-0')}
            onClick={ () => { stateFetcher('local:showChipPanel', true).then(showChipPanelMutate) } }
            disabled={gamePlayerInfo?.isAutoBet || !allowControl}
          ><div className='h-10 inline-flex items-center'>RAISE</div></StyledButton>
        </div>
        <div>
          <StyledButton className='bg-[rgb(1,145,186)]'
            onClick={ () => {
              stateFetcher('local:allowPK', !allowPK).then(allowPKMutate)
            } }
            disabled={gamePlayerInfo?.isAutoBet || !allowControl}
          ><div className='h-10 inline-flex items-center'>HEADS-UP { gameCurrentBetChips ? ` : ${gameCurrentBetChips}` : '' }</div></StyledButton>
        </div>
        {
          <div>
            <StyledButton className='bg-[#00bb5c]'
              onClick={ () => {
                gameServer.send({
                  type: 4,
                  currRound: gameRoom.currRound,
                  betChips: gameCurrentBetChips,
                })
              } }
              disabled={gamePlayerInfo?.isAutoBet || !allowControl}
            ><div className='h-10 inline-flex items-center'>CALL { gameCurrentBetChips ? ` : ${gameCurrentBetChips}` : '' }</div></StyledButton>
          </div>
        }

        {/* gameServer.send({ type: 2, currRound: gameRoom.currRound }) */}

        <div>
          <button
            className='grayscale-0 hover:brightness-125'
            onClick={ () => { gameServer.send({ type: 6, currRound: gameRoom.currRound, isAutoBet: !gamePlayerInfo.isAutoBet }) } }
          >
            <img className='inline-block' src={gamePlayerInfo?.isAutoBet ? '/robot-button-2.png' : '/robot-button.png' } />
          </button>
        </div>
      </div>


      <div className={classNames(
        'w-full h-full absolute -left-50 bottom-0 pb-2 transform-gpu transition-transform bg-no-repeat bg-bottom bg-[url("/table_bottom.png")] flex items-end justify-center gap-2',
        showChipPanel ? 'translate-y-0 pointer-events-auto' : 'translate-y-32 pointer-events-none'
      )}
      >
        <BlankChip index={0} />
        <BlankChip index={1} />
        <BlankChip index={2} />
        <BlankChip index={3} />
        <BlankChip index={4} />
        <BlankChip index={5} />
        <div className='cursor-pointer absolute bottom-[30px] right-[280px] bg-contain bg-[url("/close-icon-3.png")] w-[38px] h-[38px]'
          onClick={ () => { stateFetcher('local:showChipPanel', false).then(showChipPanelMutate) } }
        ></div>
      </div>
    </>
  )
}