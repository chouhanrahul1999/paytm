import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { amount } = await req.json();
    if (!amount || isNaN(Number(amount))) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }
    // Create OnRampTransaction
    const txn = await prisma.onRampTransaction.create({
      data: {
        userId: Number(session.user.id),
        amount: Number(amount),
        status: "Success",
        provider: "Manual",
        token: Math.random().toString(36).slice(2),
        startTime: new Date(),
      },
    });
    // Update or create balance
    await prisma.balance.upsert({
      where: { userId: Number(session.user.id) },
      update: { amount: { increment: Number(amount) } },
      create: { userId: Number(session.user.id), amount: Number(amount), locked: 0 },
    });
    return NextResponse.json({ success: true, txn });
  } catch (e) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
