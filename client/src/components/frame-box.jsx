// FrameBox Component: A customizable modal/popup component
export default function FrameBox({
  children, // Children elements to be rendered inside the FrameBox
  showClose = true, // Prop to control the visibility of the close button
  title, // Title of the FrameBox
  onClose, // Function to be called when the close button is clicked
}) {
  return (
    <div className='bg-black/50 z-50 flex justify-center items-center'>
      {/* Overlay that covers the entire screen with a semi-transparent background */}

      <div className='rounded-xl relative'>
        {/* Container for the FrameBox with rounded corners and positioned relative for absolute children */}

        {/* Box content area with dynamic sizing, custom background, border, and shadow */}
        <div className='min-w-[300px] max-w-[1100px] min-h-[10px] max-h-[480px] bg-[url("/table.png")] bg-[center_-20px]
          border-[#edc281] border-4
          overflow-hidden rounded-xl shadow-[0_6px_0_0_#c1862d]'>
          {children}
          {/* Render the children elements passed to the FrameBox */}
        </div>

        {/* Title display area, non-interactive */}
        <div className='absolute top-0 left-0 w-full pointer-events-none'>
          {title}
          {/* Display the title of the FrameBox */}
        </div>

        {/* Conditional rendering of the close button */}
        {showClose && (
          <div 
            className='absolute -right-7 -top-7 w-14 h-14 cursor-pointer bg-no-repeat bg-center bg-[url("/close-icon.png")]'
            onClick={onClose}
            // Close button with custom icon, positioned outside the top-right corner of the FrameBox
          ></div>
        )}
      </div>
    </div>
  );
}