import {VoteRepository} from "../../../Domain/Contestant/VoteRepository";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import Vote from "../../../Domain/Contestant/Vote";
import VoteId from "../../../Domain/Contestant/VoteId";

@injectable()
export default class OrmVoteRepository implements VoteRepository {
    constructor(
        @inject(TYPES.OrmClient) private ormClient: PrismaClient
    ) {
    }

    async get(id: VoteId): Promise<Vote> {
        const vote = await this.ormClient.vote.findUnique({
            where: {
                id: id.toString()
            },
            include: {
                contestant: true
            }
        });

        if (vote === null) {
            throw new Error('Vote not found');
        }

        return Vote.fromArray(vote)
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

    async delete(id: VoteId, ip: string): Promise<void> {
        await this.ormClient.vote.update({
            where: {
                id: id.toString()
            },
            data: {
                is_deleted: true,
                deleted_by: ip,
                deleted_at: new Date()
            }
        });
    }
}