import Command from "../../../../Domain/Command/Command";
import VoteId from "../../../../Domain/Contestant/VoteId";
import ContestantId from "../../../../Domain/Contestant/ContestantId";

export default class DeleteVoteCommand implements Command {
    constructor(
        public id: VoteId,
        public contestantId: ContestantId,
    ) {}
}