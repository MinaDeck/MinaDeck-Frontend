import FrameBox from './frame-box';

// GameRule component - displays the rules of the game
export default function GameRule({ onClose }) {
  // Renders a FrameBox component which acts as a container for the game rules
  return (
    <FrameBox onClose={onClose}> {/* FrameBox used for presenting the content, with a prop to handle closure */}
      <div className='w-[540px] m-10 text-center text-white'> {/* Styling for the container of the game rules content */}
        {/* Image tag used to display the game rules. The source of the image is '/maxresdefault.jpg' */}
        <img className='w-[640px] h-[320px] bg-transparent' src='/maxresdefault.jpg' />
      </div>
    </FrameBox>
  );
}
