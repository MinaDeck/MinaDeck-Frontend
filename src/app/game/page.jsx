'use client'

import GameRoom from './room';
import { useRef, useEffect, useState } from 'react'
import { useUserData } from '@/hooks/useUserData';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react';

export default function ConnectWallet() {

    const [walletConnected, setWalletConnected] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [accounts, setAccounts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false)

    const { userData, setUserData } = useUserData();

    const dealerRef = useRef(null);
    const router = useRouter()

    const searchParams = useSearchParams();
    // Get the search params object

    const gameId = searchParams.get('gameId');

    useEffect(() => {
        const delay = 2000;
        const timeout = setTimeout(() => {
            setLoading(false);
        }, delay);

        return () => clearTimeout(timeout);
    }, [userData]);

    useEffect(() => {
        if (!loading && (userData.id == "" || userData == null || userData == undefined)) {
            router.push(`/game/check?gameId=${gameId}`);
        }
    }, [loading, userData]);

    if (!gameId || !/^[a-f\d]{8}$/i.test(gameId)) {
        // Validate gameId format
        return <div className='text-white'>Illegal Room Number {gameId}</div>;
    }

    return (
        <Suspense>
            <GameRoom gameId={gameId} />
        </Suspense>
    )
}