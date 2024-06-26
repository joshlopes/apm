import {PrismaClient} from "@prisma/client";

export default class DatabaseUtil {
    public static async truncateAllTables(prismaClient: PrismaClient) {
        await prismaClient.$executeRaw`SET FOREIGN_KEY_CHECKS=0`;

        await prismaClient.$executeRaw`TRUNCATE TABLE contestant`;
        await prismaClient.$executeRaw`TRUNCATE TABLE vote`;
        await prismaClient.$executeRaw`TRUNCATE TABLE blacklisted`;

        await prismaClient.$executeRaw`SET FOREIGN_KEY_CHECKS=1`;
    }
}