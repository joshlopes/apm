import { RequestHandler, Request, Response } from "express";
import {handleCommand} from "../handleCommandUtil";
import ListAllContestantsCommand
    from "../../../Application/Query/Contestant/ListAllContestants/ListAllContestantsCommand";
import Contestant from "../../../Domain/Contestant/Contestant";

export const list: RequestHandler = async (req: Request, resp: Response) => {
    await handleCommand(
        new ListAllContestantsCommand(),
        resp,
        (contestants: Contestant[]) => {
            resp.status(200).send({
                results: contestants.map((contestant: Contestant) => contestant.toArray())
            })
        }
    );
}
