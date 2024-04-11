import {Response} from 'supertest';
import request = require("supertest");
import {server} from "../../../../../src/Infrastructure/Http/Server";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {PrismaClient} from "@prisma/client";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import {createContestant} from "../../../../Helper/StaticFixtures";

describe('GET /api/contestants/:id', () => {
    const prismaClient: PrismaClient = myContainer.get(TYPES.OrmClient);

    beforeEach(async () => {
        await DatabaseUtil.truncateAllTables(prismaClient)
    });

    it('should return the record', async () => {
        const contestant = await createContestant();

        // Send request
        const response: Response = await request(server)
            .get('/api/contestants/' + contestant.id)

        expect(response.status).toEqual(200);

        // Assert
        expect(response.body.id).toBe(contestant.id.toString())
        expect(response.body.name).toBe(contestant.name)
        expect(response.body.verified_votes).toBe(0)
    });
});