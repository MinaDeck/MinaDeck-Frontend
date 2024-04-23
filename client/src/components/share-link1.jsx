import FrameBox from './frame-box'
import StyledButton from './styled-button'
import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

// ShareLink1 component - used for sharing a match link
export default function ShareLink1({ onClose }) {
  const [ url, setUrl ] = useState(null) // State to store the URL to be shared
  const [ copyed, setCopyed ] = useState(false) // State to track if the URL has been copied

  useEffect(() => {
    // Effect to set the URL when the component mounts
    const currentUrl = new URL(location.href)
    const shareUrl = new URL(location.pathname, location.origin)
    // Adding 'gameId' query parameter to the URL
    shareUrl.searchParams.set('gameId', currentUrl.searchParams.get('gameId'))
    setUrl(shareUrl.toString()) // Setting the formatted URL
  }, [])

  // Main return method that renders the share link UI
  return (
    <FrameBox
      title={<div className='title-styling'></div>} // Title bar with a background image
      onClose={onClose} // onClose prop for closing the component
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
            <a className='link'>{url}</a> {/* Displaying the match URL */}
          </CopyToClipboard>
        </p>
      </div>
      <div className='button-container'>
        {/* Button to copy the match link */}
        <CopyToClipboard text={url} onCopy={() => {
          setCopyed(true);
          setTimeout(() => setCopyed(false), 3000)
        }}>
          <StyledButton className='button-style'><div className='button-text'>{copyed ? 'COPYED' : 'COPY LINK' }</div></StyledButton>
        </CopyToClipboard>
      </div>
    </FrameBox>
  )
}
