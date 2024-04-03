import CommandHandler from "../../../../Domain/Command/CommandHandler";
import ListAllContestantsCommand from "./ListAllContestantsCommand";
import {inject, injectable} from "inversify";
import Contestant from "../../../../Domain/Contestant/Contestant";
import ContestantRepository from "../../../../Domain/Contestant/ContestantRepository";
import {TYPES} from "../../../../Domain/DependencyInjection/types";

@injectable()
export default class ListAllContestantsCommandHandler implements CommandHandler {
    constructor(
        @inject(TYPES.ContestantRepository) private repository: ContestantRepository
    ){}

    async handle(command: ListAllContestantsCommand): Promise<Contestant[]> {
        return this.repository.findAll();
    }
}
