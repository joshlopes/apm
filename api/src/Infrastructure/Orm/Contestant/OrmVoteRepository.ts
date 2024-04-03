import {VoteRepository} from "../../../Domain/Contestant/VoteRepository";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import Vote from "../../../Domain/Contestant/Vote";

@injectable()
export default class OrmVoteRepository implements VoteRepository {
    constructor(
        @inject(TYPES.OrmClient) private ormClient: PrismaClient
    ) {
    }

    async create(vote: Vote): Promise<void> {
        if (vote.contestant === undefined || !vote.contestant.id) {
            throw new Error('Contestant id is required');
        }

        await this.ormClient.vote.create({
            data: {
                id: vote.id.toString(),
                ip: vote.ip,
                contestant_id: vote.contestant.id.toString()
            }
        });
    }
}