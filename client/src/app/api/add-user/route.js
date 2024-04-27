import { NextRequest, NextResponse } from "next/server";
import {prisma} from '../../../util/db'

export async function POST(req) {
  const { address, name, userName } = await req.json();

  const response = await prisma.user.create({
    data: {
        address: address,
        name: name,
        userName: userName
    },
  });

  return NextResponse.json({
    success: true,
    response: response,
  });
}