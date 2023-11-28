import FrameBox from './frame-box'
import StyledButton from './styled-button'

// Daily component, likely used to show daily content or offers
export default function Daily({ onClose }) {
  // Returns a FrameBox component with content for daily features
  return (
    // FrameBox component is used for layout and styling
    <FrameBox
      title={
        // Title bar with a background image
        <div className='bg-[url("/title-dialy.png")] bg-no-repeat bg-top h-[96px] -translate-y-1/2'></div>
      }
      onClose={onClose} // onClose prop - a function to handle closing the FrameBox
    >
      // Main content area of the Daily component
      <div className='w-[540px] m-10 text-center text-white'>
        // Content to be displayed goes here
      </div>
      // Footer area of the component
      <div className='flex justify-center'>
        // Additional elements or buttons can be placed here
      </div>
    </FrameBox>
  )
}
