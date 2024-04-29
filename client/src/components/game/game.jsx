'use client'

import GameRoom from '@/app/game/room';
import { useRef, useEffect, useState } from 'react'
import { useUserData } from '@/hooks/useUserData';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import { IoArrowBack } from "react-icons/io5";
import TokenInfoBar from '../TokenBar';
import Link from 'next/link';

export default function Game() {

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
        return (
            <section className='h-screen flex flex-col items-center justify-center'>
                <div className='text-white p-10 rounded-lg bg-gray-800/70 font-bold text-3xl'>
                    Illegal Room Number {gameId}
                </div>
                <Link href="/play" className='text-white text-md hover:underline flex gap-1 hover:gap-3 transition-all items-center'><IoArrowBack /> {" "} <span>Go back to play page</span></Link>
            </section>
        )
    }

    return (
        <div>
            <TokenInfoBar />
            <GameRoom gameId={gameId} />
        </div>
    )
}