import { Suspense } from "react";
import CheckProfile from "@/components/game/join";

export default function Page(){

    return(
        <Suspense>
            <CheckProfile />
        </Suspense>
    )
}