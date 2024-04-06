import { uuidv7 } from "uuidv7";
import { RequestHandler, Request, Response } from "express";
import {handleCommand} from "../handleCommandUtil";
import VoteId from "../../../Domain/Contestant/VoteId";
import ContestantId from "../../../Domain/Contestant/ContestantId";
import DeleteVoteCommand from "../../../Application/Write/Contestant/DeleteVote/DeleteVoteCommand";

export const deleteVote: RequestHandler = async (req: Request, resp: Response) => {
    await handleCommand(
        new DeleteVoteCommand(
            VoteId.fromString(req.params.voteId),
            ContestantId.fromString(req.params.id),
            req.body.ip ?? ''
        ),
        resp,
        () => {
            resp.status(200).send()
        }
    );
}
