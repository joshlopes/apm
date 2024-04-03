import {list} from "../../../Ui/Http/Contestant/list";
import {get} from "../../../Ui/Http/Contestant/get";
import express from 'express'
import {vote} from "../../../Ui/Http/Contestant/vote";
import {deleteVote} from "../../../Ui/Http/Contestant/deleteVote";

const ContestantRouter = express.Router()

ContestantRouter.get('/', list)
ContestantRouter.get('/:id', get)
ContestantRouter.post('/:id/vote', vote)
ContestantRouter.delete('/:id/vote/:voteId', deleteVote)

export default ContestantRouter
