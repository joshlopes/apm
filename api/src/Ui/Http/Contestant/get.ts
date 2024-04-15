import { RequestHandler, Request, Response } from "express";
import {handleCommand} from "../handleCommandUtil";
import GetContestantCommand from "../../../Application/Query/Contestant/GetContestant/GetContestantCommand";
import Contestant from "../../../Domain/Contestant/Contestant";
import ContestantId from "../../../Domain/Contestant/ContestantId";
import RecordNotFound from "../../../Domain/RecordNotFound";
import ContestHasEnded from "../../../Domain/Contestant/ContestHasEnded";

export const get: RequestHandler = async (req: Request, resp: Response) => {
    await handleCommand(
        new GetContestantCommand(ContestantId.fromString(req.params.id)),
        resp,
        (contestant: Contestant) => {
            resp.status(200).send({
                id: contestant.id.toString(),
                name: contestant.name,
                video_url: contestant.videoUrl,
                verified_votes: contestant.verifiedVotes,
                has_ended: contestant.hasEnded,
                created_at: contestant.created_at,
                updated_at: contestant.updated_at,
            })
        },
        (error, resp): Promise<boolean> => {
            if (error instanceof ContestHasEnded) {
                resp.status(404).send({message: error.message});

                return Promise.resolve(true);
            }

            return Promise.resolve(false);
        }
    );
}
