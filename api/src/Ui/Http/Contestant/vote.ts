import { RequestHandler, Request, Response } from "express";
import {handleCommand} from "../handleCommandUtil";
import VoteContestantCommand from "../../../Application/Write/Contestant/VoteContestant/VoteContestantCommand";
import VoteId from "../../../Domain/Contestant/VoteId";
import ContestantId from "../../../Domain/Contestant/ContestantId";
import GetContestantCommand from "../../../Application/Query/Contestant/GetContestant/GetContestantCommand";
import Contestant from "../../../Domain/Contestant/Contestant";

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
        async () => {
            return await handleCommand(
                new GetContestantCommand(contestantId),
                resp,
                (contestant: Contestant) => {
                    return resp.status(200).send({
                        id: voteId.toString(),
                        contestant: contestant.toArray()
                    })
                }
            )
        }
    );
}
