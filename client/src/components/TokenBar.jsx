import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import StyledButton from "./styled-button";
import { useEffect, useState } from "react";
import AddFundPopUp from "./AddFund";
import { useUserData } from "@/hooks/useUserData";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";

export default function TokenInfoBar() {

    const [open, setOpen] = useState(false)
    const [accounts, setAccounts] = useState(null);
    const [balance, setBalance] = useState(0)

    const openHandler = () => {
        setOpen(false)
    }

    const ISSERVER = typeof window === "undefined";

    const [tokenAmount, setTokenAmount] = useState(0);

    useEffect(() => {
        // Retrieve game data from local storage
        if (!ISSERVER) {
            const storedUserData = localStorage.getItem('amount');

            if (storedUserData) {
                setTokenAmount(storedUserData);
            }
        }

    }, [balance]);

    return (
        <div className={`w-[100%] xl:max-w-[1280px] flex justify-between items-center mx-auto pt-5`}>
            <Link href="/">
                <h2 className="font-extrabold text-[24px] text-white cursor-pointer">
                    MINA DECK
                </h2>
            </Link>
            <div className="flex gap-4 items-center">
                <Link href="/play" className="text-white font-semibold text-lg shadow-md hover:underline p-1 rounded-md cursor-pointer">Play</Link >
                <Link href="/create" className="text-white font-semibold text-lg shadow-md hover:underline p-1 rounded-md cursor-pointer">Create</Link >
                <Link href="/game/join" className="text-white font-semibold text-lg shadow-md hover:underline p-1 rounded-md cursor-pointer">Join</Link >
                <span className="flex items-center gap-3 border-[1px] p-2 px-4 rounded-xl">
                    <div className="text-white font-semibold text-lg">{tokenAmount} MINA</div>
                    <Dialog open={open} onOpenChange={(state) => setOpen(state)}>
                        <DialogTrigger asChild>
                            <StyledButton className='bg-[#c69532] text-xs'><span className="flex items-center gap-3"><IoMdAdd />Add Fund</span> </StyledButton>
                        </DialogTrigger>
                        <DialogContent className=" w-fit">
                            <AddFundPopUp openHandler={openHandler} accounts={accounts} balance={balance} setBalance={setBalance} />
                        </DialogContent>
                    </Dialog>
                </span>
                <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/8.x/notionists/svg`} alt="@user" />
                    <AvatarFallback>MD</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}