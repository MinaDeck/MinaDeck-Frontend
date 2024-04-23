import { Suspense } from "react";
import CheckProfile from "@/components/game/check";

export default function Page(){

    return(
        <Suspense>
            <CheckProfile />
        </Suspense>
    )
}