'use client'

import StyledButton from '@/components/styled-button'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link';
import { checkAddress } from '@/util/databaseFunctions';

export default function ConnectWallet() {

    const [walletConnected, setWalletConnected] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [accounts, setAccounts] = useState(null);
    const [profile, setProfile] = useState(false);

    const dealerRef = useRef(null);

    const connectWallet = async () => {
        try {
            const collectAccounts = await window.mina.requestAccounts()
            setAccounts(collectAccounts);
            console.log(collectAccounts)
            if (collectAccounts) {
                setWalletConnected(true)
                console.log("check address", checkAddress(collectAccounts))
                checkAddress(collectAccounts).then((res) => {
                    console.log("res:", res);
                    if (res) {
                        setProfile(true)
                    }
                }
                );
            }

        } catch (error) {
            console.log(error.message, error.code)
        }
    }

    return (
        <div className='relative w-full h-[720px] overflow-hidden mx-auto mt-4 px-4 py-2 rounded-lg bg-cover bg-[url("/bg-2.jpg")] shadow-[0_0_20px_rgba(0,0,0,0.8)]'>
            <div className='absolute inset-0 bg-no-repeat bg-[url("/table-1.png")]'></div>
            <div className='absolute left-8 -right-8 top-14 -bottom-14 bg-no-repeat bg-[url("/dealer.png")] transform-gpu' ref={dealerRef}>
                <div className='absolute -left-8 right-8 -top-14 bottom-14 bg-no-repeat bg-[url("/card-0.png")] animate-pulse'></div>
            </div>
            <div className='absolute top-0 left-1/2 right-0 bottom-0 pr-20 py-12'>
                <div className='relative text-center flex justify-center'>
                    <img src='/login-button-bg.png' />
                    <StyledButton roundedStyle='rounded-full' className='absolute bg-[#ff9000] bottom-4 text-2xl left-1/2 -translate-x-1/2' data-testid="connect" onClick={connectWallet}>Connect Wallet</StyledButton>
                </div>
                {accounts &&
                    <div className='w-full flex flex-col items-center'>
                        <span className='text-white mt-2 text-lg shadow-lg'>
                            Address: {accounts.toString().slice(0, 5) + '...' + accounts.toString().slice(-5)}
                        </span>
                        {/* profile */}
                        <div>
                            <Link href='/play'>
                                <StyledButton className='bg-[#00b69a] bottom-4 text-2xl mt-8'>Start the Game </StyledButton>
                            </Link>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}