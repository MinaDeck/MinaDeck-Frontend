import FrameBox from './frame-box'
import StyledButton from './styled-button'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'

// ShareLink component - used for sharing a match link
export default function ShareLink({ onClose, link }) {
  const router = useRouter()
  const [ url, setUrl ] = useState(null)
  const [ copyed, setCopyed ] = useState(false)

  useEffect(() => {
    // On component mount, the URL is constructed and set
    const currentUrl = new URL(link, location.origin)
    setUrl(currentUrl.toString())
  }, [])

  // Main return method that renders the share link UI
  return (
    <FrameBox
      title={<div className='title-styling'></div>} // Title bar with a background image
      onClose={onClose} // onClose prop for closing the component
      showClose={false} // Option to hide the close button
    >
      <div className='content-container'>
        <h4 className='heading'>Match created!</h4>
        <p>Instructions for sharing the match.</p>
        <p><img className='icon' src='/share-link-icon.png'/></p>
        <p>Information about the match accessibility.</p>
        <p className='share-link'>
          {/* Copy to clipboard functionality for the match URL */}
          <CopyToClipboard text={url} onCopy={() => {
            setCopyed(true); 
            setTimeout(() => setCopyed(false), 3000) // Reset the copied state after 3 seconds
          }}>
            <a className='link'>
              {url} {/* Displaying the match URL */}
              { copyed && <DocumentDuplicateIcon className='icon' /> } {/* Icon changes when URL is copied */}
            </a>
          </CopyToClipboard>
        </p>
      </div>
      <div className='button-container'>
        {/* Button to start the game or go to the match */}
        <StyledButton className='button-style' onClick={ () => { router.push(link) } }>
          <div className='button-text'>LET'S GO</div>
        </StyledButton>
      </div>
    </FrameBox>
  )
}
