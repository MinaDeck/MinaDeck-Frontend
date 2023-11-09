import FrameBox from './frame-box'
import StyledButton from './styled-button'
import useSWR from 'swr'
import useLocalStorageState from 'use-local-storage-state'
import { useState, useEffect } from 'react'
import classNames from 'classnames'

async function fetcher(url) {
  if(url) {
    const payload = await (await fetch(url, {
      method: 'POST',
      // credentials: 'include',
    })).json()
    return payload
  }
  return null
}

export default function ChangeAvatar({ onClose }) {
  const [ user ] = useLocalStorageState('userinfo', { defaultValue: { id: -1 } })

  const { data: userInfo, mutate: userInfoMutate } = useSWR(user.token ? `http://162.219.87.221/api/user/getUserInfo?token=${user.token}` : '', fetcher)
  const { data: headList } = useSWR(user.token ? `http://162.219.87.221/api/user/headList?token=${user.token}` : '', fetcher)
  const [ selectPic, setSelectPic ] = useState(null)

  useEffect(() => {
    if(userInfo?.data?.headPic) { setSelectPic(userInfo.data.headPic) }
  }, [ userInfo?.data?.headPic ])
  
  return (
    <FrameBox
      title={<div className='bg-[url("/title-avatar-selector.png")] bg-no-repeat bg-top h-[96px] -translate-y-1/2'></div>}
      onClose={onClose}
    >
      <div className='w-[560px] mx-10 my-24 text-center text-white'>
        <div className='flex flex-wrap gap-2 justify-center items-center'>
          { headList?.data?.map((pic, i) => {
              return (
                <div
                  className={classNames(
                    'w-24 h-24 relative overflow-hidden box-content p-0.5 border-2 border-black/80 bg-[rgb(50,50,50)] rounded-full hover:shadow-[0_0_10px_#fff000]',
                    selectPic === pic ? 'shadow-[0_0_10px_#fff000]' : ''
                  )}
                  key={`${i}_${pic}`}
                  onClick={() => { setSelectPic(pic) }}
                >
                  <div className='absolute inset-0 bg-no-repeat bg-center flex justify-center items-center bg-cover cursor-pointer shadow-[inset_0_3px_2px_rgba(255,255,255,.2),0_2px_1px_rgba(255,255,255,.2)]'
                    style={{backgroundImage: `url("${pic}")`}}
                  >
                    { selectPic === pic && <img src='/tick-icon.png' /> }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='flex justify-center'>
        <StyledButton className='bg-[#ff9000] m-2' roundedStyle='rounded-full' disabled={selectPic === userInfo?.data?.headPic}
          onClick={ async () => {
            const url = new URL(`http://162.219.87.221/api/user/updateHeadPic`)
            url.searchParams.set('token', user.token)
            const payload = await (await fetch(url, {
              method: 'POST',
              body: JSON.stringify({ headPic: selectPic })
            })).json()
            if(payload.message === 'OK') {
              userInfoMutate({
                ...userInfo,
                data: {
                  ...userInfo.data,
                  headPic: selectPic
                }
              })
            }
          }}
        >
          <div className='text-2xl'>CHANGE</div>
        </StyledButton>
      </div>
    </FrameBox>
  )
}