import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

async function main() {
    const alice = await prisma.user.upsert({
        where: { number: '9999999999'},
        update: {},
        create: {
            number: '9999999999',
            password: 'alice',
            name: 'alice',
            OnRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "Success",
                    amount: 20000,
                    token: "122",
                    provider: "HDFC Bank"
                }
            }
        }
    })

    const bob = await prisma.user.upsert({
        where: { number: '9999999999'},
        update: {},
        create: {
            number: '9999999999',
            password: 'bob',
            name: 'bob',
            OnRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "Failure",
                    amount: 20000,
                    token: "123",
                    provider: "HDFC Bank"
                }
            }
        }
    })
    console.log({ alice, bob })
}

main()
.then(async(e) => {
    await prisma.$disconnect()
})
.catch(async(e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})