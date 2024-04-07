import { RequestHandler, Request, Response } from "express";
import {handleCommand} from "../handleCommandUtil";
import VoteId from "../../../Domain/Contestant/VoteId";
import ContestantId from "../../../Domain/Contestant/ContestantId";
import DeleteVoteCommand from "../../../Application/Write/Contestant/DeleteVote/DeleteVoteCommand";

export const deleteVote: RequestHandler = async (req: Request, resp: Response) => {
    console.log(req.ip, req.ips)

    console.log(req.headers)

    await handleCommand(
        new DeleteVoteCommand(
            VoteId.fromString(req.params.voteId),
            ContestantId.fromString(req.params.id),
            req.header('x-real-ip') ?? req.ip ?? ''
        ),
        resp,
        () => {
            resp.status(200).send()
        }
    );
}
