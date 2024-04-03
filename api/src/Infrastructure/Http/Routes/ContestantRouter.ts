import {list} from "../../../Ui/Http/Contestant/list";
import {get} from "../../../Ui/Http/Contestant/get";
import express from 'express'
import {vote} from "../../../Ui/Http/Contestant/vote";

const ContestantRouter = express.Router()

ContestantRouter.get('/', list)
ContestantRouter.get('/:id', get)
ContestantRouter.post('/:id/vote', vote)

export default ContestantRouter
