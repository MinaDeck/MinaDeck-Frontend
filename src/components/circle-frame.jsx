export default function CircleFrame({ children }) {
  return (
    <div className='relative top-6 -translate-x-1/2 -translate-y-1/2 w-24 h-24 box-content p-0.5 border-2 border-black/80 bg-[rgb(50,50,50)] rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,.2),0_0_16px_rgba(0,0,0,.8)]'>
      <div className='rounded-full absolute inset-0 flex items-center justify-center' style={ { backgroundImage } }>
        <div className='relative overflow-hidden w-20 h-20 box-content p-0.5 border-2 border-black/80 bg-[rgb(50,50,50)] rounded-full shadow-[inset_0_3px_2px_rgba(255,255,255,.2),0_2px_1px_rgba(255,255,255,.2)]'>
          { avatarSet[iconName] }
        </div>
      </div>
    </div>
  )
}