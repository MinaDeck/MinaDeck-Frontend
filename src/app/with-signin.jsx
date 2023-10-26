'use client'
import StyledButton from '@/components/styled-button'
import { useRef, useEffect, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import aleoFetcher from '@/fetcher/aleo'
import WalletInfo from '@/components/wallet-info'
import useSWR from 'swr'

export default function WithSignined({
  children
}) {
  const [ userInfo, setUserInfo ] = useLocalStorageState('userinfo', { defaultValue: { id: -1 } })
  // const [ userInfo, setUserInfo ] = useState(null)
  const { data: walletAccount, mutate: walletAccountMutate } = useSWR('walletAccount', aleoFetcher)
  const { data: walletConnected, mutate: walletConnectedMutate } = useSWR('walletConnected', aleoFetcher)
  const [ autoConnect, setAutoConnect ] = useState(false)

  useEffect(() => {
    if(!walletConnected && autoConnect) {
      aleoFetcher('connect').then(walletAccountMutate)
      setAutoConnect(false)
    }
  }, [ walletConnected, autoConnect ])

  useEffect(() => {
    if(walletAccount?.address) {
      fetch('http://162.219.87.221/api/user/getSign', {
        method: 'POST',
        body: JSON.stringify({ address: walletAccount.address })
      }).then(async xxx => {
        const payload = await xxx.json()
        console.log(payload)
        if(payload.message === 'OK') {
          const signRes = await aleoFetcher('sign', { message: payload.data })
          console.log('signRes', signRes)
          if(typeof signRes !== 'string') {
            debugger
          }
          const signData = JSON.parse(signRes)
          if(signData.result) {
            const req = await fetch('http://162.219.87.221/api/user/verifySign', {
              method: 'POST',
              body: JSON.stringify({
                address: walletAccount.address,
                signature: signData.result
              })
            })
            const data = await req.json()
            if(data.message === 'OK') {
              setUserInfo({ ...data.data, walletAccount })
            }
            console.log(data)
            // setUserInfo(data.data)
          }
        }
      })

    }
  }, [ walletAccount?.address ])

  const dealerRef = useRef(null)

  useEffect(() => {
    const handler = event => {
      if(dealerRef.current) {
        const { pageX, pageY } = event
        const { innerWidth, innerHeight } = window
        dealerRef.current.style.transform = `translate3d(${
          Math.min(Math.max(-20, (pageX - innerWidth / 2) / 30), 20)
        }px, ${
          Math.min(Math.max(-5, (pageY - innerHeight / 2) / 50), 5)
        }px, 0px)`
      }
    }
    document.documentElement.addEventListener('mousemove', handler)
    return () => {
      document.documentElement.removeEventListener('mousemove', handler)
    }
  }, [ dealerRef.current ])

  if(userInfo?.token) {
    return (
      <div className='relative mt-36 w-[1280px] mx-auto'>
        {children(userInfo)}
        <WalletInfo />
      </div>
    )
  }

  return (
    <div className='bg-white w-[1280px] h-[720px] overflow-hidden mx-auto my-8 px-4 py-2 rounded-lg bg-cover bg-[url("/bg-2.jpg")] relative shadow-[0_0_20px_rgba(0,0,0,0.8)]'>
      {/* <div className='absolute top-5 left-5 w-40 h-40 bg-no-repeat bg-[url("/logo.png")]'></div> */}
      <div className='absolute inset-0 bg-no-repeat bg-[url("/table-1.png")]'></div>
      <div className='absolute left-8 -right-8 top-14 -bottom-14 bg-no-repeat bg-[url("/dealer.png")] transform-gpu' ref={ dealerRef }>
        <div className='absolute -left-8 right-8 -top-14 bottom-14 bg-no-repeat bg-[url("/card-0.png")] animate-floating'></div>
      </div>
      <div className='absolute top-0 left-1/2 right-0 bottom-0 pr-20 py-12'>
        {/* <svg width='471px' height='300px'>
          <defs>
            <filter id='Filter_0'>
              <feOffset dx='0' dy='0' />
              <feGaussianBlur stdDeviation='1' result='offset-blur' />
              <feComposite operator='out' in='SourceGraphic' in2='offset-blur' result='inverse' />
              <feComposite operator='out' in='SourceGraphic' result='inverse' />
            </filter>
          </defs>
          <g >
          <path fillRule='evenodd' fill='rgba(0,0,0,.2)'
            d='M454.001,5.000 L18.000,5.000 C11.371,5.000 5.997,10.373 5.997,17.000 L5.997,240.1000 C5.997,247.627 11.371,253.000 18.000,253.000 L84.373,253.000 C89.987,253.000 94.796,256.899 96.075,262.362 C100.309,280.495 116.577,294.000 135.999,294.000 L335.1000,294.000 C355.423,294.000 371.690,280.495 375.926,262.362 C377.201,256.899 382.016,253.000 387.624,253.000 L454.001,253.000 C460.626,253.000 465.1000,247.627 465.1000,240.1000 L465.1000,17.000 C465.1000,10.373 460.626,5.000 454.001,5.000 Z'/>
          </g>
        </svg> */}
        <div className='relative text-center flex justify-center'>
          <img src='/login-button-bg.png' />
          <StyledButton roundedStyle='rounded-full' className='absolute bg-[#ff9000] bottom-4 text-2xl left-1/2 -translate-x-1/2' onClick={() => { aleoFetcher('connect').then(walletAccountMutate) }}>Connect Wallet</StyledButton>
        </div>

        {/* <div className='w-full max-w-md space-y-8 text-white'>
          <div className='flex flex-col items-end'>
            <svg className='w-auto h-20' viewBox='0 0 440 80' xmlns='http://www.w3.org/2000/svg'>
            <text textAnchor='end' dominantBaseline='text-before-edge' x='440' y='0' stroke='rgb(10,58,26)' strokeWidth='8' fontWeight='900' fontSize='60' paintOrder='stroke' fill='white'>HELLO AGAIN</text>
            </svg>
            <h2 className='mt-6 text-3xl text-white font-bold text-right'>
              Good to see you back!<br/>
              Sign back in to play.
            </h2>
          </div>
          <form className='mt-8 space-y-6 pl-16' method='POST' onSubmit={
            async (e) => {
              e.preventDefault()
              const xxx = await fetch('http://162.219.87.221/api/user/login', {
                method: 'POST',
                body: JSON.stringify({
                  email: e.target.email.value,
                  password: e.target.password.value,
                })
              })
              const payload = await xxx.json()
              if(payload.message === 'OK') {
                setUserInfo(payload.data)
              }
            }
          }>
            <div className='text-2xl'>
              <div>
                <fieldset className='relative border border-black/80 text-right rounded-md px-4'>
                  <legend>
                    <label htmlFor='email-address' className='text-white mx-2'>
                      USERNAME
                    </label>
                  </legend>
                  <input
                    id='email-address'
                    name='email'
                    type='email'
                    autoComplete='email'
                    defaultValue={'0402liujun@163.com'}
                    list='emaillist'
                    required
                    className='text-xl relative textinline-block w-full ring-0 focus:ring-0 px-1 pt-0 border-0 bg-transparent text-right'
                    placeholder='Email address'
                  />
                  <datalist id='emaillist'>
                    <option value='0402liujun@163.com'/>
                    <option value='317911613@qq.com '/>
                  </datalist>
                </fieldset>
              </div>
              <div>
                <fieldset className='relative border border-black/80 text-right rounded-md px-4 mt-4'>
                  <legend>
                    <label htmlFor='password' className='text-white mx-2'>
                      PASSWORD
                    </label>
                  </legend>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    defaultValue={'1234567'}
                    autoComplete='current-password'
                    required
                    className='text-xl relative inline-block w-full ring-0 focus:ring-0 px-1 pt-0 border-0 bg-transparent text-right'
                    placeholder='Password'
                  />
                </fieldset>
              </div>
            </div>

            <div className='text-right h-24'>
              <StyledButton className='bg-[rgb(1,145,186)] text-3xl mt-4' type='submit'>
                <div className='[text-shadow:0_2px_0_rgba(0,0,0,1))] px-3 py-2'>SIGN IN</div>
              </StyledButton>
            </div>
          </form>
          <div className='text-right text-xl'>Don’t have an account yet? Create one here.</div>
        </div> */}
      </div>
    </div>
  )
}

/*



*/