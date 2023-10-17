import stateFetcher from "@/fetcher/state"
import { useSpringRef, useTransition } from "@react-spring/web"
import { useState, useEffect, useDeferredValue } from 'react'
import useSWR from 'swr'
const avatarSet = {}

for(let i = 0; i <= 20; i++) {
  const w = (i + 1) % 8
  const h = Math.floor((i + 1) / 8)
  avatarSet[i] = (
    <div className='absolute inset-0 bg-[url("/avatars.png")] bg-no-repeat rounded-full' style={ {
      backgroundPositionX: -26 - (136 * w),
      backgroundPositionY: -26 - (136 * h),
    } } />
  )
}

// function Dealer() {
//   return (
//     <div
//       className='bg-no-repeat absolute -top-4 -right-2 bg-[url("/avatars.png")]'
//       style={ {
//         width: 124, height: 124,
//         backgroundPositionX: - (136 * 6),
//         backgroundPositionY: - (136 * 2),
//       } }
//     >
//     </div>
//   )
// }

export default function Avatar({
  userId,
  user,
  headPic = '',
  dealer = false,
  showCountdown = false,
  startTime = 1,
  endTime = 0,
  hiascent = false,
  showAuto = true,
  children,
}) {
  const duration = endTime - startTime
  const [ remain, setRemain ] = useState(duration)
  const vvv = useDeferredValue(remain)
  const p = (1 - vvv / duration) * 100
  const backgroundImage = showCountdown ? `conic-gradient(transparent ${p}%, rgb(234,179,8) ${p}%, rgb(22,163,74) 100%)` : 'none'
  
  useEffect(() => {
    if(showCountdown) {
      requestAnimationFrame(() => {
        const now = Date.now()
        if(endTime > now) {
          setRemain(endTime - now)
        } else {
          setRemain(0)
          // stateFetcher('local:gameCountdown', {}).then(gameCountdownMutate)
        }
      })
    }
  }, [vvv, showCountdown, duration, endTime, startTime])

  return (
    <div data-user-id={userId} className='relative top-6 -translate-x-1/2 -translate-y-1/2 w-24 h-24 box-content p-0.5 border-2 border-black/80 bg-[rgb(50,50,50)] rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,.2),0_0_16px_rgba(0,0,0,.8)]'>
      <div className='rounded-full absolute inset-0 flex items-center justify-center' style={ { backgroundImage } }>
        <div className='relative overflow-hidden w-20 h-20 box-content p-0.5 border-2 border-black/80 bg-[rgb(50,50,50)] rounded-full shadow-[inset_0_3px_2px_rgba(255,255,255,.2),0_2px_1px_rgba(255,255,255,.2)]'>
          { headPic ? <div className='absolute inset-0 bg-center bg-cover bg-no-repeat rounded-full' style={ { backgroundImage: `url("${headPic}")` } } /> : null }
        </div>
      </div>
      { user?.isAutoBet && showAuto && <img className='absolute -left-2 -top-2 w-8 h-auto' src='/avatar-robot.png' /> }
      { dealer && <img className='absolute -right-2 -top-2' src='/dealer-icon.png' /> }
      { hiascent && <img className='absolute top-0 left-0' src='hiascent.png' /> }
      { children }
    </div>
  )
}