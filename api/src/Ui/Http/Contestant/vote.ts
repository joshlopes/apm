import { uuidv7 } from "uuidv7";
import { RequestHandler, Request, Response } from "express";
import {handleCommand} from "../handleCommandUtil";
import VoteContestantCommand from "../../../Application/Write/Contestant/VoteContestant/VoteContestantCommand";
import VoteId from "../../../Domain/Contestant/VoteId";
import ContestantId from "../../../Domain/Contestant/ContestantId";

export const vote: RequestHandler = async (req: Request, resp: Response) => {
    await handleCommand(
        new VoteContestantCommand(
            VoteId.create(),
            ContestantId.fromString(req.params.id),
            req.body.ip
        ),
        resp,
        () => {
            resp.status(201).send()
        }
    );
}
