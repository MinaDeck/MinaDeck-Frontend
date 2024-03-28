import FrameBox from './frame-box'
import StyledButton from './styled-button'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { addPlayerData } from '@/util/databaseFunctions'
import { FaStarOfLife } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";


// ShareLink component - used for sharing a match link
export default function AddFundPopUp({ openHandler, accounts }) {
    const router = useRouter()
    const [amount, setAmount] = useState(0)
    const [copyed, setCopyed] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        userName: "",
        inviteCode: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await addPlayerData(accounts[0], formData);
            console.log("form data", formData, accounts[0]);
            // router.push("/dashboard"); // Redirect to dashboard on success
            alert("Player data added successfully!"); // Success message
        } catch (error) {
            console.error("Error adding player data:", error);
            alert("An error occurred while adding player data. Please try again later.");
        }
    };

    const handleClick = (event) => {
        const value = parseInt(event.target.getAttribute('data-value'));
        const total = amount + value
        setAmount(total);
    };


    console.log(amount)
    // Main return method that renders the share link UI
    return (
        <FrameBox
            title={<div className='bg-no-repeat bg-top h-[96px] -translate-y-1/2'></div>}
            onClose={openHandler} // onClose prop for closing the component
            showClose={true} // Option to hide the close button
        >
            <div className='w-[560px] m-10 text-center flex flex-col justify-center text-white'>
                <h4 className='text-3xl font-black'>Add Tokens to Your Fund</h4>
                <p>Boost Your Stack, Elevate Your Game: Add Funds with Ease at Minadeck!</p>
                <section className='flex gap-8 w-fit mx-auto mt-4'>
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
            </div>
            <div className='flex justify-center'>

            </div>
        </FrameBox>
    )
}