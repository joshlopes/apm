import Command from "../../../../Domain/Command/Command";

export default class ListAllContestantsCommand implements Command {
    constructor(
        public readonly category?: string
    ){}
}
