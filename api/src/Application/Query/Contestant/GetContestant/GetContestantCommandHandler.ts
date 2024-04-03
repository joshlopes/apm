import {inject, injectable} from "inversify";
import GetContestantCommand from "./GetContestantCommand";
import CommandHandler from "../../../../Domain/Command/CommandHandler";
import ContestantRepository from "../../../../Domain/Contestant/ContestantRepository";
import Contestant from "../../../../Domain/Contestant/Contestant";
import {TYPES} from "../../../../Domain/DependencyInjection/types";

@injectable()
export default class GetContestantCommandHandler implements CommandHandler {
    constructor(
        @inject(TYPES.ContestantRepository) private repository: ContestantRepository
    ) {}

    async handle(command: GetContestantCommand): Promise<Contestant> {
        return await this.repository.get(command.id);
    }
}