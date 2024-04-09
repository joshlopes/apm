import {myContainer} from "../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../src/Domain/DependencyInjection/types";
import Contestant from "../../src/Domain/Contestant/Contestant";
import ContestantRepository from "../../src/Domain/Contestant/ContestantRepository";
import {uuidv7} from "uuidv7";
import {VoteRepository} from "../../src/Domain/Contestant/VoteRepository";
import Vote from "../../src/Domain/Contestant/Vote";
import VoteId from "../../src/Domain/Contestant/VoteId";
import ContestantId from "../../src/Domain/Contestant/ContestantId";
import Blacklist from "../../src/Domain/Blacklist/Blacklist";
import {BlacklistRepository} from "../../src/Domain/Blacklist/BlacklistRepository";

export const createContestant = async (): Promise<Contestant> => {
    return myContainer.get<ContestantRepository>(TYPES.ContestantRepository).upsert(
        new Contestant(
            ContestantId.create(),
            1,
            'name',
            'A',
            'http://video.url',
            'http://thumbnail.url',
            0
        )
    )
}

export const createVote = async(voteId: VoteId, contestant: Contestant): Promise<void> => {
    await myContainer.get<VoteRepository>(TYPES.VoteRepository).create(
        new Vote(
            voteId,
            '1.1.1.1',
            contestant
        )
    )
}

export const createBlacklist = async(ip: string): Promise<Blacklist> => {
    return await myContainer.get<BlacklistRepository>(TYPES.BlacklistRepository).create(
        new Blacklist(
            uuidv7().toString(),
            ip
        )
    )
}
