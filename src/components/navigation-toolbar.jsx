import StyledButton from './styled-button'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import ShareLink1 from './share-link1'
import ShareLink from './share-link'
import GameRule from './gamerule'
import ChangeAvatar from './change-avatar'
import classNames from 'classnames'

export default function NavigationToolbar() {
  const [ dialog, setDialog ] = useState(null)
  const pathname = usePathname()
  const inGame = pathname.startsWith('/game')
  return (
    <>
      <div className={classNames('absolute flex justify-end gap-3 z-[3]', inGame ? 'top-4 right-4' : 'top-2 right-2')}>
        <div className='cursor-pointer' onClick={ () => { setDialog(<GameRule onClose={ () => setDialog(null) } />) } }>
          <img src={inGame ? '/nav-daily-icon-s.png' : '/nav-daily-icon.png'} />
        </div>
        { inGame && <div className='cursor-pointer' onClick={ () => { setDialog(<ShareLink1 onClose={ () => setDialog(null) } />) } }>
          <img src={inGame ? '/nav-share-icon-s.png' : '/nav-share-icon.png'} />
        </div> }
        <div className='cursor-pointer' onClick={ () => { setDialog(<ChangeAvatar onClose={ () => setDialog(null) } />) } }>
          <img src={inGame ? '/nav-avatar-icon-s.png' : '/nav-avatar-icon.png'} />
        </div>
        <div className='cursor-pointer' onClick={ () => { setDialog(<GameRule onClose={ () => setDialog(null) } />) } }>
          <img src={inGame ? '/nav-gamerule-icon-s.png' : '/nav-gamerule-icon.png'} />
        </div>
      </div>
      {dialog}
    </>
  )
}
