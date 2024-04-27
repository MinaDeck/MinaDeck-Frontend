import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../util/db";

export async function POST(req) {
    const { gameId } = await req.json();

    const response = await prisma.game.findMany({
        where: { gameId: gameId },
    })

    if (response) {
        return NextResponse.json({
            success: true,
            response: response,
        });
    } else {
        return NextResponse.json({
            success: false,
            response: {},
        });
    }

}