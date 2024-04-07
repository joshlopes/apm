import Blacklist from "../../../Domain/Blacklist/Blacklist";
import {BlacklistRepository} from "../../../Domain/Blacklist/BlacklistRepository";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../Domain/DependencyInjection/types";
import {PrismaClient} from "@prisma/client";

@injectable()
export default class OrmBlacklistRepository implements BlacklistRepository {
    constructor(
        @inject(TYPES.OrmClient) private ormClient: PrismaClient,
    ) {
    }

    async create(blacklist: Blacklist): Promise<Blacklist> {
        return Blacklist.fromArray(await this.ormClient.blacklisted.create({
            data: blacklist.toArray()
        }))
    }

    async findByIp(ip: string): Promise<Blacklist | null> {
        const result = await this.ormClient.blacklisted.findFirst({
            where: {
                ip
            }
        });

        return result ? Blacklist.fromArray(result) : null;
    }

}