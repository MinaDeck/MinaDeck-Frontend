'use client'
import classNames from 'classnames'
import Link from 'next/link'
import useLocalStorageState from 'use-local-storage-state'
import WithSignined from '@/app/with-signin'
import { useRouter } from 'next/navigation'
import { displayAddress } from '@/util'

function CircleFrame({
  className = 'w-20 h-20',
  children,
  ...prop
}) {
  return (
    <div className={classNames(
      'relative p-0.5 border-2 border-black/80 bg-[rgb(50,50,50)] rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,.2),0_0_16px_rgba(0,0,0,.8)]',
      className
    )}>
      <div className='absolute overflow-hidden inset-1.5 border-2 border-black/80 bg-[rgb(50,50,50)] rounded-full shadow-[inset_0_3px_2px_rgba(255,255,255,.2),0_2px_1px_rgba(255,255,255,.2)]'>
        {children}
      </div>
    </div>
  )
}

function TextButton({
  children,
  ...props
}) {
  return (
    <div className='cursor-default select-none'>
      <svg className='w-30 h-10' viewBox='0 0 120 40' xmlns='http://www.w3.org/2000/svg'>{/* 1,148,77 */}
        <text textAnchor='middle' dominantBaseline='middle' x='60' y='20' stroke='black' strokeWidth='2' fontWeight='900' fontSize='1.00rem' paintOrder='stroke' fill='white' {...props}>{children}</text>
      </svg>
    </div>
  )
}

export default function MinePage() {
  const router = useRouter()
  return (
    <div className='bg-white w-[1280px] h-[720px] mx-auto my-8 px-4 py-2 bg-cover bg-[url("/bg-1.jpg")] relative rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.8)]' >
      <div className='absolute inset-0 bg-no-repeat bg-[url("/dealer.png")]'></div>
      <div className='absolute inset-0 bg-no-repeat bg-[url("/table-0.png")]'>
        <div className='absolute bottom-0 left-0 right-0 px-32 flex items-end'>
          <div className='basis-1/5 flex flex-col items-center -translate-y-11'>
            <CircleFrame className='w-20 h-20'><button className='w-full h-full bg-no-repeat bg-cover bg-[url("/icon-mine-2.png")]' /></CircleFrame>
            <TextButton>Rules</TextButton>
            <div className='font-black'></div>
          </div>
          <div className='basis-1/5 flex flex-col items-center -translate-y-20'>
            <CircleFrame className='w-20 h-20'><button className='w-full h-full bg-no-repeat bg-cover bg-[url("/icon-mine-3.png")]' /></CircleFrame>
            <TextButton>Ranking</TextButton>
          </div>
          <div className='basis-1/5 flex flex-col items-center -translate-y-14'>
            <CircleFrame className='w-24 h-24' />
            <div className={
              classNames(
                'min-w-[160px] h-16 border-2 left-0 top-0 p-2 rounded-lg mt-1',
                'border-black/80 bg-[rgb(50,50,50)] bg-gradient-to-b from-white/10 to-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,.2),0_0_16px_rgba(0,0,0,.8)]',
              )
            }
            >
              <div className='flex grow flex-col h-full'>
                <div className='basis-1/2 font-extrabold text-white text-sm [text-shadow:0_0_4px_rgba(0,0,0,.4))]'>{displayAddress(userInfo?.address)}</div>
                <div className='basis-1/2 mt-1 font-extrabold bg-[rgb(23,23,23)] rounded-full text-[rgb(252,255,0)] text-xs
                      relative pl-6 pr-2 inline-flex items-center
                      before:absolute before:left-px before:top-px before:p-px before:w-[18px] before:h-[18px] before:bg-no-repeat before:bg-cover before:bg-[url("/chips-icon2.png")]
                    '>
                  {userInfo?.accountBetChips}
                </div>
              </div>
            </div>

          </div>
          <div className='basis-1/5 flex flex-col items-center -translate-y-20'>
            <CircleFrame className='w-20 h-20'><button className='w-full h-full bg-no-repeat bg-cover bg-[url("/icon-mine-4.png")]' /></CircleFrame>
            <TextButton>Reward</TextButton>
          </div>
          <div className='basis-1/5 flex flex-col items-center -translate-y-11'>
            <CircleFrame className='w-20 h-20'><button className='w-full h-full bg-no-repeat bg-cover bg-[url("/icon-mine-5.png")]' /></CircleFrame>
            <TextButton>Set up</TextButton>
          </div>
        </div>
      </div>
      <div className='absolute left-1/2 top-28 flex gap-8'>
        <button className='hover:brightness-125 w-[200px] h-[280px] bg-no-repeat bg-cover bg-[url("/create.png")]' onClick={() => router.push('/create')}></button>
        <button className='hover:brightness-125 w-[200px] h-[280px] bg-no-repeat bg-cover bg-[url("/join.png")]'></button>
      </div>
      <button className='hover:brightness-125 absolute top-5 left-5 w-16 h-16 bg-black/60 rounded-full bg-no-repeat bg-cover bg-[url("/back.png")]'></button>
    </div >
  )
}