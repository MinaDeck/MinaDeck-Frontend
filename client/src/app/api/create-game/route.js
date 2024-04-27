import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../util/db";

export async function POST(req) {
  const { gameId, size, lowBetChips, topBetChips, totalRounds } = await req.json();

  const response = await prisma.game.create({
    data: {
      tableSize: size,
      lowBetChips: lowBetChips,
      topBetChips: topBetChips,
      totalRounds: totalRounds,
      gameId: gameId,
    },
  });

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