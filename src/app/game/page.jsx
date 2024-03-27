import { Suspense } from "react";
import Game from "@/components/game/game";

export default function Page(){
    return(
        <Suspense>
            <Game/>
        </Suspense>
    )
}