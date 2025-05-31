import { PrismaClient } from "@prisma/client";

const PrismaClientSingleton = () => {
    return new PrismaClient()
}

declare global {
    var prismaGloble: undefined | ReturnType<typeof PrismaClientSingleton>
}

const prisma: ReturnType<typeof PrismaClientSingleton> = globalThis.prismaGloble ??
PrismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGloble = prisma