'use client'

import GameRoom from './room';
import { useRef, useEffect, useState } from 'react'
import { useUserData } from '@/hooks/useUserData';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'

export default function ConnectWallet() {

    const [walletConnected, setWalletConnected] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [accounts, setAccounts] = useState(null);
    const [profile, setProfile] = useState(false);
    const [open, setOpen] = useState(false)

    const { userData, setUserData } = useUserData();

    const dealerRef = useRef(null);
    const router = useRouter()

    const searchParams = useSearchParams();
    // Get the search params object

    const gameId = searchParams.get('gameId');

    useEffect(() => {
        if (userData.id == "" || userData == null || userData == undefined) {
            router.push(`/game/check?gameId=${gameId}`)
        }
    },[])

    const openHandler = () => {
        setOpen(false)
    }

    if (!gameId || !/^[a-f\d]{8}$/i.test(gameId)) {
        // Validate gameId format
        return <div className='text-white'>Illegal Room Number {gameId}</div>;
    }

    return (
        <GameRoom gameId={gameId} />
    )
}