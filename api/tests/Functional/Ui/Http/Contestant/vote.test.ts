import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {PrismaClient} from "@prisma/client";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {createContestant} from "../../../../Helper/StaticFixtures";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import Vote from "../../../../../src/Domain/Contestant/Vote";

describe('POST /api/contestants/:id/vote', () => {
    const prismaClient: PrismaClient = myContainer.get(TYPES.OrmClient);

    beforeEach(async () => {
        await DatabaseUtil.truncateAllTables(prismaClient)
    });

    it('should create a new record', async () => {
        const contestant = await createContestant();

        // Send POST request
        const response = await request(server)
            .post('/api/contestants/' + contestant.id + '/vote')
            .send({
                ip: '123.123.123.123'
            })
            .expect(200);

        // Assert response

        expect(response.body).toBeDefined();
        expect(response.body.id).toBeDefined();
        expect(response.body.contestant).toBeDefined();
        expect(response.body.contestant.id).toBe(contestant.id.toString());

        // Query the database
        const vote = await prismaClient.vote.findFirst({include: {contestant: true}});

        // Assert that created
        expect(vote).toBeDefined();
        if (vote instanceof Vote) {
            expect(vote.contestant?.id).toBe(contestant.id.toString());
            expect(vote.ip).toBe('123.123.123.123');
        }
    });
});