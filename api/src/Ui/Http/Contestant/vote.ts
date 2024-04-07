import { RequestHandler, Request, Response } from "express";
import {handleCommand} from "../handleCommandUtil";
import VoteContestantCommand from "../../../Application/Write/Contestant/VoteContestant/VoteContestantCommand";
import VoteId from "../../../Domain/Contestant/VoteId";
import ContestantId from "../../../Domain/Contestant/ContestantId";

export const vote: RequestHandler = async (req: Request, resp: Response) => {
    const voteId = VoteId.create()
    const contestantId = ContestantId.fromString(req.params.id)

    await handleCommand(
        new VoteContestantCommand(
            voteId,
            contestantId,
            req.header('x-real-ip') ?? req.body.ip ?? req.ip ?? ''
        ),
        resp,
        () => resp.status(200).send({id: voteId.toString()})
    );
}
