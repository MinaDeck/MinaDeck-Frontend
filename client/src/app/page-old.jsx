'use client' // Indicates that this code should run on the client side only in a Next.js application

import classNames from 'classnames' // Utility function for conditionally joining class names together
import Link from 'next/link' // Next.js Link component for client-side transitions between routes
import WithSignined from '@/app/with-signin' // Custom component or hook for handling signed-in user state
import { useRouter } from 'next/navigation' // Next.js hook for router object to handle navigation
import { displayAddress } from '@/util' // Utility function to display a formatted address

// CircleFrame is a component that renders a circular frame for icons or images
function CircleFrame({
  className = 'w-20 h-20', // Default width and height for the frame as a base style
  children, // Child elements to be displayed within the frame
  ...prop // Spread operator for other props passed to the component
}) {
  // Returning a div with class names combined from props and default styles, creating a circular frame
  return (
    <div className={classNames(
      'relative p-0.5 border-2 border-black/80 bg-[rgb(50,50,50)] rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,.2),0_0_16px_rgba(0,0,0,.8)]',
      className
    )}>
      {/* Inner div with absolute positioning to ensure content is centered and styled within the frame */}
      <div className='absolute overflow-hidden inset-1.5 border-2 border-black/80 bg-[rgb(50,50,50)] rounded-full shadow styling'>
        {children} // Rendering children passed to CircleFrame within this inner div
      </div>
    </div>
  )
}

// TextButton is a component that renders a text inside an SVG, making it look like a button
function TextButton({
  children, // Text or elements to be displayed inside the button
  ...props // Spread operator for other props passed to the component
}) {
  // Returning a div that wraps an SVG element with a text node inside it
  return (
    <div className='cursor-default select-none'>
      {/* SVG to provide a scalable button design */}
      <svg className='w-30 h-10' viewBox='0 0 120 40' xmlns='http://www.w3.org/2000/svg'>
        {/* Text element styled to be centered within the SVG and to look like a button label */}
        <text textAnchor='middle' dominantBaseline='middle' x='60' y='20' stroke='black' strokeWidth='2' fontWeight='900' fontSize='1.00rem' paintOrder='stroke' fill='white' {...props}>
          {children}
        </text>
      </svg>
    </div>
  )
}

// MinePage is the main functional component that serves as the layout for the Mine game page
export default function MinePage() {
  const router = useRouter() // Hook for using the Next.js router

  // Main container for the Mine game page with applied styles for background and shadow effects
  return (
    <div className='bg-white w-[1280px] h-[720px] mx-auto my-8 px-4 py-2 bg-cover bg-[url("/bg-1.jpg")] relative rounded-xl overflow-hidden shadow styling'>
      {/* Absolute positioned elements acting as background layers for the game interface */}
      <div className='absolute inset-0 bg-no-repeat bg-[url("/dealer.png")]'></div>
      <div className='absolute inset-0 bg-no-repeat bg-[url("/table-0.png")]'>
        {/* Flex container for the bottom part of the game interface, containing buttons and player info */}
        <div className='absolute bottom-0 left-0 right-0 px-32 flex items-end'>
          {/* Flex items representing different sections of the game interface, including rules and player options */}
          <div className='basis-1/5 flex flex-col items-center -translate-y-11'>
            <CircleFrame className='w-20 h-20'><button className='button styling' /></CircleFrame>
            <TextButton>Rules</TextButton>
            <div className='font-black'></div>
          </div>
          {/* ... Other game interface sections ... */}

          {/* Displaying user information with custom utility function `displayAddress` */}
          <div className='user info display'>
            <div className='user info styling'>{displayAddress(userInfo?.address)}</div>
            <div className='account chips styling'>{userInfo?.accountBetChips}</div>
          </div>
        </div>
      </div>
      {/* Buttons for creating or joining a game with hover effects */}
      <div className='game action buttons'>
        <button className='create game button' onClick={() => router.push('/create')}></button>
        <button className='join game button'></button>
      </div>
      {/* Back button for navigation */}
      <button className='back button styling'></button>
    </div>
  )
}

