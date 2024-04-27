import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../util/db";

export async function POST(req) {
    const { address } = await req.json();

    const response = await prisma.user.findMany({
        where: { address: address },
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