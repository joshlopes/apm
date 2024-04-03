import Contestant from "../../../Domain/Contestant/Contestant";
import ContestantRepository from "../../../Domain/Contestant/ContestantRepository";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../Domain/DependencyInjection/types";
import { PrismaClient } from "@prisma/client";
import ContestantId from "../../../Domain/Contestant/ContestantId";

@injectable()
export default class OrmContestantRepository implements ContestantRepository {
    constructor(
        @inject(TYPES.OrmClient) private ormClient: PrismaClient
    ) {
    }

    async get(id: ContestantId): Promise<Contestant> {
        const contestant = await this.ormClient.contestant.findUnique({
            where: {
                id: id.toString()
            },
            include: {
                votes: true
            }
        });
        if (!contestant) {
            throw new Error(`Contestant with id ${id} not found`);
        }

        return Contestant.fromArray(contestant);
    }

    async upsert(contestant: Contestant): Promise<Contestant> {
        const data = {
            name: contestant.name,
            category: contestant.category,
            video_url: contestant.videoUrl,
            updated_at: new Date(),
        };

        const contestantData = await this.ormClient.contestant.upsert(
        {
                where: {id: contestant.id.toString()},
                create: {
                    id: contestant.id.toString(),
                    name: contestant.name,
                    category: contestant.category,
                    video_url: contestant.videoUrl,
                    created_at: new Date()
                },
                update: {
                    ...data
                },
                include: {
                    votes: true
                }
            },
        )

        return Contestant.fromArray(contestantData);
    }

    async delete(id: ContestantId): Promise<void> {
        await this.ormClient.contestant.delete({
            where: {
                id: id.toString()
            }
        });
    }

    async findAll(category?: string): Promise<Contestant[]> {
        const whereData = category ? { category: category } : undefined;
        const contestants = await this.ormClient.contestant.findMany({
            where: {
                ...whereData,
            },
            include: {
                votes: true
            }
        });

        return contestants.map((contestant: any) => Contestant.fromArray(contestant));
    }

}