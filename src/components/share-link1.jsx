import FrameBox from './frame-box'
import StyledButton from './styled-button'
import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export default function ShareLink1({ onClose }) {
  const [ url, setUrl ] = useState(null)
  const [ copyed, setCopyed ] = useState(false)

  useEffect(() => {
    const currentUrl = new URL(location.href)
    const shareUrl = new URL(location.pathname, location.origin)
    shareUrl.searchParams.set('gameId', currentUrl.searchParams.get('gameId'))
    setUrl(shareUrl.toString())
  }, [])

  return (
    <FrameBox
      title={<div className='bg-[url("/title-share.png")] bg-no-repeat bg-top h-[96px] -translate-y-1/2'></div>}
      onClose={onClose}
    >
      <div className='w-[540px] m-10 text-center text-white'>
        <h4 className='text-3xl font-black'>Match created!</h4>
        <p>Your match is ready to go!</p>
        <p>Share it with your friends using the link below.</p>
        <p><img className='inline-block' src='/share-link-icon.png'/></p>
        <p>Only players with this code are able <br/>to join the match.</p>
        <p className='text-[#fff000]'>
          <CopyToClipboard text={url}
            onCopy={() => { setCopyed(true); setTimeout(() => setCopyed(false), 3000) } }>
            <a className='underline cursor-pointer'>{url}</a>
          </CopyToClipboard>
        </p>
      </div>
      <div className='flex justify-center relative'>
        <CopyToClipboard text={url}
          onCopy={() => { setCopyed(true); setTimeout(() => setCopyed(false), 3000) } }>
          <StyledButton className='bg-[#ff9000] m-2' roundedStyle='rounded-full'><div className='text-2xl'>{copyed ? 'COPYED' : 'COPY LINK' }</div></StyledButton>
        </CopyToClipboard>
      </div>
    </FrameBox>
  )
}