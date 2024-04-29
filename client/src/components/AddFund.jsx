import FrameBox from './frame-box'
import StyledButton from './styled-button'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

// ShareLink component - used for sharing a match link
export default function AddFundPopUp({ openHandler, balance, setBalance }) {
    const router = useRouter()
    const [amount, setAmount] = useState(0)


    const handleClick = (event) => {
        const value = parseInt(event.target.getAttribute('data-value'));
        const total = amount + value;
        console.log(total)
        setAmount(total)
    };

    const ISSERVER = typeof window === "undefined";

    const [tokenAmount, setTokenAmount] = useState(0);

    useEffect(() => {
        if (!ISSERVER) {
            // Retrieve game data from local storage
            const storedUserData = localStorage.getItem('amount');

            if (storedUserData) {
                setTokenAmount(storedUserData);
            }
        }
    }, [balance]);

    const BuyToken = () => {
        if (!ISSERVER) {
            setBalance(amount)
            const previousAmount = localStorage.getItem('amount')
            if (previousAmount) {
                localStorage.setItem('amount', parseInt(previousAmount) + amount);
            } else {
                localStorage.setItem('amount', amount);
            }
        }
    }

    return (
        <FrameBox
            title={<div className='bg-no-repeat bg-top h-[96px] -translate-y-1/2'></div>}
            onClose={openHandler} // onClose prop for closing the component
            showClose={true} // Option to hide the close button
        >
            <div className='w-[560px] m-10 text-center flex flex-col justify-center text-white' data-testid="add fund">
                <h4 className='text-3xl font-black'>Add Tokens to Your Fund</h4>
                <p>Boost Your Stack, Elevate Your Game: Add Funds with Ease at Minadeck!</p>
                <section className='flex gap-8 w-fit mx-auto mt-4 mb-4'>
                    <button onClick={(event) => handleClick(event)}>
                        <img src="/chips-blank-1.png" data-value="10" />
                        <p>$ 10</p>
                    </button>
                    <button onClick={(event) => handleClick(event)}>
                        <img src="/chips-blank-2.png" data-value="100" />
                        <p>$ 100</p>
                    </button>
                    <button onClick={(event) => handleClick(event)}>
                        <img src="/chips-blank-3.png" data-value="1000" />
                        <p>$ 1000</p>
                    </button>
                    <button onClick={(event) => handleClick(event)}>
                        <img src="/chips-blank-4.png" data-value="10000" />
                        <p>$ 10000</p>
                    </button>
                    <button onClick={(event) => handleClick(event)}>
                        <img src="/chips-blank-5.png" data-value="100000" />
                        <p>$ 100000</p>
                    </button>
                </section>
                <div className='flex bg-black/20 justify-between items-center text-white font-semibold rounded-lg' style={{ padding: "10px 20px" }}>
                    <div className='bg-black/30 rounded-lg flex items-center justify-between' style={{ padding: "5px 20px", width: "66%" }}><span>{amount}</span> {amount != 0 && <button onClick={() => setAmount(0)}><RxCross2 /></button>}</div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <StyledButton onClick={BuyToken}>Buy Token</StyledButton>
                        </DialogTrigger>
                        <DialogContent className="p-6 w-fit">
                            <DialogHeader>
                                <DialogTitle>Success 🎉</DialogTitle>
                                <DialogDescription className="text-lg">
                                    <img className='m-auto animate-bounce' src="/avatar-robot.png" />
                                    Your Token have been successfully added to your Balance
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className='mt-2 text-gray-200'>select tokens you want to buy</div>
            </div>
        </FrameBox>
    )
}