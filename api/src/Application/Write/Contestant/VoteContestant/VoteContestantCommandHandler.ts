import CommandHandler from "../../../../Domain/Command/CommandHandler";
import VoteContestantCommand from "./VoteContestantCommand";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../Domain/DependencyInjection/types";
import {VoteRepository} from "../../../../Domain/Contestant/VoteRepository";
import Vote from "../../../../Domain/Contestant/Vote";
import ContestantRepository from "../../../../Domain/Contestant/ContestantRepository";
import {BlacklistRepository} from "../../../../Domain/Blacklist/BlacklistRepository";

@injectable()
export default class VoteContestantCommandHandler implements CommandHandler {
    constructor(
        @inject(TYPES.ContestantRepository) private contestantRepository: ContestantRepository,
        @inject(TYPES.VoteRepository) private repository: VoteRepository,
        @inject(TYPES.BlacklistRepository) private blacklistRepository: BlacklistRepository,
    ) {
    }

    async handle(command: VoteContestantCommand): Promise<void> {
        if (await this.blacklistRepository.findByIp(command.ip)) {
            throw new Error(`IP ${command.ip} is blacklisted!`);
        }

        const contestant = await this.contestantRepository.get(command.contestantId);

        return this.repository.create(new Vote(command.id, command.ip, contestant));
    }

}