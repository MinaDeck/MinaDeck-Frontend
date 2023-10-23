import FrameBox from './frame-box';

export default function GameRule({ onClose }) {
  return (
    <FrameBox onClose={onClose}>
      {/* Container for the game rule content */}
      <div className='w-[540px] m-10 text-center text-white'>
        {/* Image representing the game rules */}
        <img className='w-[640px] h-[320px] bg-transparent' src='/maxresdefault.jpg' />
      </div>
    </FrameBox>
  );
}