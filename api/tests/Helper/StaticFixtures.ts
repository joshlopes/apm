import {myContainer} from "../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../src/Domain/DependencyInjection/types";
import Contestant from "../../src/Domain/Contestant/Contestant";
import ContestantRepository from "../../src/Domain/Contestant/ContestantRepository";
import {uuidv7} from "uuidv7";
import {VoteRepository} from "../../src/Domain/Contestant/VoteRepository";
import Vote from "../../src/Domain/Contestant/Vote";
import VoteId from "../../src/Domain/Contestant/VoteId";
import ContestantId from "../../src/Domain/Contestant/ContestantId";

export const createContestant = async (): Promise<Contestant> => {
    return myContainer.get<ContestantRepository>(TYPES.ContestantRepository).upsert(
        new Contestant(
            ContestantId.create(),
            'http://video.url',
            uuidv7()
        )
    )
}

export const createVote = async(contestant: Contestant): Promise<void> => {
    await myContainer.get<VoteRepository>(TYPES.VoteRepository).create(
        new Vote(
            VoteId.create(),
            '1.1.1.1',
            contestant
        )
    )
}
