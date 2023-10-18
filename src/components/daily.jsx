import FrameBox from './frame-box'
import StyledButton from './styled-button'

export default function Daily({ onClose }) {
  return (
    <FrameBox
      title={<div className='bg-[url("/title-dialy.png")] bg-no-repeat bg-top h-[96px] -translate-y-1/2'></div>}
      onClose={onClose}
    >
      <div className='w-[540px] m-10 text-center text-white'>
        
      </div>
      <div className='flex justify-center'>

      </div>
    </FrameBox>
  )
}