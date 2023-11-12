// Importing necessary libraries and components
import useSWR from 'swr'
import aleoFetcher from '@/fetcher/aleo'
import { useEffect, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'

// Function to display the address in a readable format
function displayAddress(address) {
 if(address) {
   return address.length > 10 ? address.slice(0, 4) + '....' + address.slice(-4) : address
 }
 return ''
}

// Component to display wallet information
export default function WalletInfo() {
 // Fetching wallet account data using SWR
 const { data: walletAccount, mutate: walletAccountMutate } = useSWR('walletAccount', aleoFetcher)
 // Getting user info from local storage
 const [ userInfo, setUserInfo ] = useLocalStorageState('userinfo')

 // Returning the JSX for the component
 return (
   <div className='absolute right-0 -top-3 h-12 -translate-y-full flex'>
     <div className='bg-[#8170bb] rounded-xl mr-2 relative pl-12 shadow-[0_0_10px_0_rgba(0,0,0,.8),inset_0_1px_1px_0_rgba(255,255,255,.2)]'>
       <div className='bg-[url("/wallet-icon.png")] absolute -left-8 -top-6 w-20 h-20'></div>
       <div className='flex justify-center items-center p-1.5 gap-2'>
         // Displaying the balance of the wallet account
         <div className='text-white'>${walletAccount?.balance ?? userInfo?.walletAccount?.balance}</div>
         <div className='bg-[#7564ad] relative flex items-center h-9 pr-12 pl-5 rounded-full shadow-[0_1px_0_0_rgba(255,255,255,.1),inset_0_0_6px_0_rgba(255,255,255,.1)]
           after:bg-[url("/wallet-icon2.png")] after:bg-no-repeat after:h-full after:w-8 after:absolute after:right-0.5 after:top-0.5
         '>
           // Displaying the user's address in a readable format
           {displayAddress(userInfo?.address)}
         </div>
       </div>
     </div>
     // Logout button
     <button className='bg-[#e43b3b] h-full rounded-xl py-2 pl-10 pr-4 text-white font-black
       bg-[url("/icon-logout.png")] bg-no-repeat bg-[1rem_center] shadow-[0_0_10px_0_rgba(0,0,0,.8),inset_0_1px_1px_0_rgba(255,255,255,.2)]
     '
       onClick={ () => {
         // Logging out the user by setting the user info to null
         setUserInfo({ id: -1 })
         // Disconnecting the wallet account
         aleoFetcher('disConnect').then(walletAccountMutate)
       } }
     >Logout</button>
   </div>
 )
}
