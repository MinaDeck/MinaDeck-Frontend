import FrameBox from './frame-box'
import StyledButton from './styled-button'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'

export default function ShareLink({ onClose, link }) {
  const router = useRouter()
  const [ url, setUrl ] = useState(null)
  const [ copyed, setCopyed ] = useState(false)

  useEffect(() => {
    const currentUrl = new URL(link, location.origin)

    setUrl(currentUrl.toString())
  }, [])
  return (
    <FrameBox
      title={<div className='bg-[url("/title-share.png")] bg-no-repeat bg-top h-[96px] -translate-y-1/2'></div>}
      onClose={onClose}
      showClose={false}
    >
      <div className='w-[560px] m-10 text-center text-white'>
        <h4 className='text-3xl font-black'>Match created!</h4>
        <p>Your match is ready to go!</p>
        <p>Share it with your friends using the link below.</p>
        <p><img className='inline-block' src='/share-link-icon.png'/></p>
        <p>Only players with this code are able <br/>to join the match.</p>
        <p className='text-[#fff000] cursor-pointer'>
          <CopyToClipboard text={url}
            onCopy={() => { setCopyed(true); setTimeout(() => setCopyed(false), 3000) } }>
            <a className='relative underline'>
              {url}
              { copyed && <DocumentDuplicateIcon className='absolute -right-5 top-1 w-4 h-4' /> }
            </a>
          </CopyToClipboard>
        </p>
      </div>
      <div className='flex justify-center'>
        <StyledButton className='bg-[#ff9000] m-2' roundedStyle='rounded-full' onClick={ () => { router.push(link) } }>
          <div className='text-2xl' >LET'S GO</div>
        </StyledButton>
      </div>
    </FrameBox>
  )
}