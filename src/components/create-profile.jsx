import FrameBox from './frame-box'
import StyledButton from './styled-button'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'

// ShareLink component - used for sharing a match link
export default function CreateProfilePopUp({ onClose, link }) {
  const router = useRouter()
  const [url, setUrl] = useState(null)
  const [copyed, setCopyed] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    inviteCode: "",
  });

  useEffect(() => {
    // On component mount, the URL is constructed and set
    const currentUrl = new URL(link, location.origin)
    setUrl(currentUrl.toString())
  }, [])
  
  // Main return method that renders the share link UI
  return (
    <FrameBox
      title={<div className='bg-no-repeat bg-top h-[96px] -translate-y-1/2'></div>}
      onClose={onClose} // onClose prop for closing the component
      showClose={true} // Option to hide the close button
    >
      <div className='w-[560px] m-10 text-center text-white'>
        <h4 className='text-3xl font-black'>Create Your Profile</h4>
        <p>Welcome To MinaPoker</p>
        {/* <p><img className='icon' src='/share-link-icon.png' /></p> */}
        <p>Information about the match accessibility.</p>
        <p className='text-[#fff000] cursor-pointer'>
          {/* Copy to clipboard functionality for the match URL */}
          <CopyToClipboard text={url}
            onCopy={() => { setCopyed(true); setTimeout(() => setCopyed(false), 3000) }}>
            <a className='relative underline'>
              {url}
              {copyed && <DocumentDuplicateIcon className='absolute -right-5 top-1 w-4 h-4' />}
            </a>
          </CopyToClipboard>
        </p>
      </div>
      <div className='flex justify-center'>
        <StyledButton className='bg-[#ff9000] m-2' roundedStyle='rounded-full' onClick={() => { router.push(link) }}>
          <div className='text-2xl' >LET'S GO</div>
        </StyledButton>
      </div>
    </FrameBox>
  )
}
