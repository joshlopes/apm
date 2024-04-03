import CommandHandler from "../../../../Domain/Command/CommandHandler";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../Domain/DependencyInjection/types";
import {VoteRepository} from "../../../../Domain/Contestant/VoteRepository";
import DeleteVoteCommand from "./DeleteVoteCommand";

@injectable()
export default class DeleteVoteCommandHandler implements CommandHandler {
    constructor(
        @inject(TYPES.VoteRepository) private voteRepository: VoteRepository,
    ) {
    }

    async handle(command: DeleteVoteCommand): Promise<any> {
        const vote = await this.voteRepository.get(command.id);
        if (!vote.contestant?.id.equals(command.contestantId)) {
            throw new Error('Vote not found')
        }

        return await this.voteRepository.delete(command.id);
    }

}