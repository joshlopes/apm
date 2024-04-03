import CommandHandler from "../../../../Domain/Command/CommandHandler";
import VoteContestantCommand from "./VoteContestantCommand";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../Domain/DependencyInjection/types";
import {VoteRepository} from "../../../../Domain/Contestant/VoteRepository";
import Vote from "../../../../Domain/Contestant/Vote";
import ContestantRepository from "../../../../Domain/Contestant/ContestantRepository";

@injectable()
export default class VoteContestantCommandHandler implements CommandHandler {
    constructor(
        @inject(TYPES.ContestantRepository) private contestantRepository: ContestantRepository,
        @inject(TYPES.VoteRepository) private repository: VoteRepository,
    ) {
    }

    async handle(command: VoteContestantCommand): Promise<void> {
        const contestant = await this.contestantRepository.get(command.contestantId);

        return this.repository.create(new Vote(command.id, command.ip, contestant));
    }

}