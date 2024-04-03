import { RequestHandler, Request, Response } from "express";
import {handleCommand} from "../handleCommandUtil";
import GetContestantCommand from "../../../Application/Query/Contestant/GetContestant/GetContestantCommand";
import Contestant from "../../../Domain/Contestant/Contestant";
import ContestantId from "../../../Domain/Contestant/ContestantId";

export const get: RequestHandler = async (req: Request, resp: Response) => {
    await handleCommand(
        new GetContestantCommand(ContestantId.fromString(req.params.id)),
        resp,
        (contestant: Contestant) => {
            resp.status(200).send({
                id: contestant.id,
                name: contestant.name,
                video_url: contestant.videoUrl,
                votes: contestant.votes?.length || 0,
                created_at: contestant.created_at,
                updated_at: contestant.updated_at
            })
        }
    );
}
