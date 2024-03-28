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
import { useState } from "react";
import AddFundPopUp from "./AddFund";

export default function TokenInfoBar({ account }) {

    const [open, setOpen] = useState(false)
    const [accounts, setAccounts] = useState(null);

    const openHandler = () => {
        setOpen(false)
    }

    return (
        <div className={`w-[100%] xl:max-w-[1280px] flex justify-between items-center mx-auto pt-5`}>
            <h2 className="font-extrabold text-[24px] text-white">
                MINA DECK
            </h2>
            <div className="flex gap-4 items-center">
                <Dialog open={open} onOpenChange={(state) => setOpen(state)}>
                    <DialogTrigger asChild>
                        <StyledButton className='bg-[#c69532] text-xl'>Add Fund </StyledButton>
                    </DialogTrigger>
                    <DialogContent className=" w-fit">
                        <AddFundPopUp openHandler={openHandler} accounts={accounts} />
                    </DialogContent>
                </Dialog>
                <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/8.x/notionists/svg?seed=${account}`} alt="@user" />
                    <AvatarFallback>MD</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}