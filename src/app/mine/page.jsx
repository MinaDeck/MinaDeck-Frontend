// Enable client-side only features in Next.js
'use client'

// Import required modules and components
import classNames from 'classnames'
import Link from 'next/link'
import WithSignined from '@/app/with-signin'
import { useRouter } from 'next/navigation'
import { displayAddress } from '@/util'

// CircleFrame component: renders a circular frame with content
function CircleFrame({
  className = 'w-20 h-20', // Default width and height
  children, // Children elements to be rendered inside the frame
  ...prop // Rest of the properties
}) {
  return (
    // Combining provided class names with default styling for the circular frame
    <div className={classNames(
      'relative p-0.5 border-2 border-black/80 bg-[rgb(50,50,50)] rounded-full shadow styling',
      className
    )}>
      // Inner div to hold the content with absolute positioning and specific styling
      <div className='absolute overflow-hidden inset-1.5 border-2 border-black/80 bg-[rgb(50,50,50)] rounded-full shadow styling'>
        {children} // Rendering children components or elements
      </div>
    </div>
  )
}

// TextButton component: renders a button with text inside an SVG
function TextButton({
  children, // Children elements, typically text
  ...props // Rest of the properties
}) {
  return (
    // Div with default cursor and selection styling
    <div className='cursor-default select-none'>
      // SVG element to render text within a button-like design
      <svg className='svg styling' viewBox='0 0 120 40' xmlns='http://www.w3.org/2000/svg'>
        // Text element within SVG with specific positioning and styling
        <text text styling and props {...props}>{children}</text>
      </svg>
    </div>
  )
}

// MinePage component: main page layout for the game
export default function MinePage() {
  const router = useRouter() // Hook to use the Next.js router

  return (
    // Main container with specific styling for the page
    <div className='main container styling'>
      // Background images for the page with absolute positioning
      <div className='background image styling'></div>
      <div className='background image styling'>
        // Section to display game options and information
        <div className='game options section'>
          // Mapping different game options with CircleFrame and TextButton components
          // Each option has specific positioning and styling
          <div className='game option styling'>
            <CircleFrame className='styling'><button className='button styling' /></CircleFrame>
            <TextButton>Rules</TextButton>
            <div className='additional styling'></div>
          </div>
          // ... (similar structure for other game options)
          
          // User info display with specific positioning and styling
          <div className='user info display'>
            // Custom styling and display of user information
            <div className='user info styling'>{displayAddress(userInfo?.address)}</div>
            // Display of user's account chips with unique styling
            <div className='account chips styling'>
              {userInfo?.accountBetChips}
            </div>
          </div>

        </div>
      </div>
      // Buttons for creating or joining a game with hover effects
      <div className='game action buttons'>
        <button className='create game button' onClick={() => router.push('/create')}></button>
        <button className='join game button'></button>
      </div>
      // Button to go back with specific styling
      <button className='back button styling'></button>
    </div >
  )
}
