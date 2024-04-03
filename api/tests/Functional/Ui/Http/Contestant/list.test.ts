import request = require("supertest");
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {PrismaClient} from "@prisma/client";
import {server} from "../../../../../src/Infrastructure/Http/Server";
import {TYPES} from "../../../../../src/Domain/DependencyInjection/types";
import {createContestant} from "../../../../Helper/StaticFixtures";

describe('GET /api/contestants', () => {
    const prismaClient: PrismaClient = myContainer.get(TYPES.OrmClient);

    beforeAll(async () => {
        await DatabaseUtil.truncateAllTables(prismaClient);
    })

    it('should return a list of records', async () => {
        const contestant1 = await createContestant()
        const contestant2 = await createContestant()

        const response = await request(server)
            .get('/api/contestants')
            .expect(200)

        expect(response.body.results).toHaveLength(2)
        expect(response.body.results[0].id).toBe(contestant1.id.toString())
        expect(response.body.results[0].name).toBe(contestant1.name)
        expect(response.body.results[0].video_url).toBe(contestant1.videoUrl)
        expect(response.body.results[1].id).toBe(contestant2.id.toString())
        expect(response.body.results[1].name).toBe(contestant2.name)
        expect(response.body.results[1].video_url).toBe(contestant2.videoUrl)
    });
})