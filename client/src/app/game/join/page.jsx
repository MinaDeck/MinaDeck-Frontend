import { Suspense } from "react";
import JoinGame from "@/components/game/join";

export default function Page(){

    return(
        <Suspense>
            <JoinGame />
        </Suspense>
    )
}