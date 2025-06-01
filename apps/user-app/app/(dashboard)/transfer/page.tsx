import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransaction } from "../../../components/OnRampTransaction";

async function getBalance() {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);
    if (!userId) return { amount: 0, locked: 0 };
    const balance = await prisma.balance.findFirst({
        where: {
            userId: userId
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);
    if (!userId) return [];
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: userId
        }
    })
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function TransferPage() {
    const balance = await getBalance();
    const transaction = await getOnRampTransactions();

    // Defensive: ensure values are always numbers for hydration consistency
    const amount = typeof balance.amount === 'number' ? balance.amount : 0;
    const locked = typeof balance.locked === 'number' ? balance.locked : 0;

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoney />
            </div>
            <div>
                <BalanceCard amount={amount} locked={locked}/>
                <div className="pt-4">
                    <OnRampTransaction transactions={transaction} />
                </div>
            </div>
        </div>
    </div>
}