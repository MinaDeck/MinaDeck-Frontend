// Enable client-side only features in Next.js
'use client'

// Importing necessary modules and components
import classNames from 'classnames'
import Link from 'next/link'
import WithSignined from '@/app/with-signin'
import { useRouter } from 'next/navigation'
import { displayAddress } from '@/util'

// Function component CircleFrame to create a circular frame with customizable style and content
function CircleFrame({
  className = 'w-20 h-20', // Default width and height set for the frame
  children, // Children elements to be rendered inside the frame
  ...prop // Rest of the properties
}) {
  return (
    // Combining given class names with default styling to create a styled circular frame
    <div className={classNames(
      'relative p-0.5 border-2 border-black/80 bg-[rgb(50,50,50)] rounded-full shadow styling',
      className
    )}>
      // Inner div with absolute positioning to contain the frame's content
      <div className='absolute overflow-hidden inset-1.5 border-2 border-black/80 bg-[rgb(50,50,50)] rounded-full shadow styling'>
        {children} // Rendering children components or elements inside the frame
      </div>
    </div>
  )
}

// Function component TextButton to create a button with text inside an SVG
function TextButton({
  children, // Children elements, typically text
  ...props // Rest of the properties
}) {
  return (
    // Div with default cursor and selection styling for button
    <div className='cursor-default select-none'>
      // SVG element to render text within a button-like design
      <svg className='w-30 h-10' viewBox='0 0 120 40' xmlns='http://www.w3.org/2000/svg'>
        // Text element within SVG with specific styling and properties
        <text textAnchor='middle' dominantBaseline='middle' x='60' y='20' stroke='black' strokeWidth='2' fontWeight='900' fontSize='1.00rem' paintOrder='stroke' fill='white' {...props}>{children}</text>
      </svg>
    </div>
  )
}

// Main functional component MinePage for the game interface
export default function MinePage() {
  const router = useRouter() // Hook to use the Next.js router for navigation

  return (
    // Main container div with specific styling for the game page
    <div className='bg-white w-[1280px] h-[720px] mx-auto my-8 px-4 py-2 bg-cover bg-[url("/bg-1.jpg")] relative rounded-xl overflow-hidden shadow styling'>
      // Background images for the game interface
      <div className='absolute inset-0 bg-no-repeat bg-[url("/dealer.png")]'></div>
      <div className='absolute inset-0 bg-no-repeat bg-[url("/table-0.png")]'>
        // Container for game options and user interface elements
        <div className='absolute bottom-0 left-0 right-0 px-32 flex items-end'>
          // Game options are structured in a flex container
          // Each option is placed in a flex column with specific positioning and styling
          // CircleFrame and TextButton components are used for styling the game options
          <div className='basis-1/5 flex flex-col items-center -translate-y-11'>
            <CircleFrame className='w-20 h-20'><button className='button styling' /></CircleFrame>
            <TextButton>Rules</TextButton>
            <div className='font-black'></div>
          </div>
          // Similar structure for other game options
          
          // Display of user information with specific styling and positioning
          <div className='user info display'>
            <div className='user info styling'>{displayAddress(userInfo?.address)}</div>
            <div className='account chips styling'>
              {userInfo?.accountBetChips}
            </div>
          </div>

        </div>
      </div>
      // Buttons for creating or joining a game with hover effects and specific styling
      <div className='game action buttons'>
        <button className='create game button' onClick={() => router.push('/create')}></button>
        <button className='join game button'></button>
      </div>
      // Back button with specific styling for navigation
      <button className='back button styling'></button>
    </div>
  )
}
