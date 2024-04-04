import { RequestHandler, Request, Response } from "express";
import {handleCommand} from "../handleCommandUtil";
import ListAllContestantsCommand
    from "../../../Application/Query/Contestant/ListAllContestants/ListAllContestantsCommand";
import Contestant from "../../../Domain/Contestant/Contestant";

export const list: RequestHandler = async (req: Request, resp: Response) => {
    const category = req.query.category;

    await handleCommand(
        new ListAllContestantsCommand(typeof category === 'string' && category !== 'undefined' ? category : undefined),
        resp,
        (contestants: Contestant[]) => {
            resp.status(200).send({
                results: contestants.map((contestant: Contestant) => {
                    return {
                        id: contestant.id.toString(),
                        name: contestant.name,
                        category: contestant.category,
                        video_url: contestant.videoUrl,
                        thumbnail_url: contestant.thumbnailUrl,
                        votes: contestant.votes?.length || 0,
                        created_at: contestant.created_at
                    }
                })
            })
        }
    );
}
