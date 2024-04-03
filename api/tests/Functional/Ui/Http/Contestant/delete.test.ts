import {Response} from 'supertest';
import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {PrismaClient} from "@prisma/client";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import {createContestant, createVote} from "../../../../Helper/StaticFixtures";
import VoteId from "../../../../../src/Domain/Contestant/VoteId";

describe('DELETE /api/contestants/:id/vote/:voteId', () => {
    const prismaClient: PrismaClient = myContainer.get(TYPES.OrmClient);

    beforeEach(async () => {
        await DatabaseUtil.truncateAllTables(prismaClient)
    });

    it('should return the record', async () => {
        const contestant = await createContestant();
        const voteId = VoteId.create();
        await createVote(voteId, contestant);

        expect(prismaClient.vote.findUniqueOrThrow({where: {id: voteId.toString()}})).not.toBeNull();

        // Send request
        const response: Response = await request(server)
            .delete('/api/contestants/' + contestant.id + '/vote/' + voteId)

        expect(response.status).toEqual(200);

        // Check if the record was deleted
        expect(prismaClient.vote.findUnique({where: {id: voteId.toString()}})).toBeNull();
    });
});