import Command from "../../../../Domain/Command/Command";
import ContestantId from "../../../../Domain/Contestant/ContestantId";

export default class GetContestantCommand implements Command {
    constructor(public id: ContestantId) {}
}
