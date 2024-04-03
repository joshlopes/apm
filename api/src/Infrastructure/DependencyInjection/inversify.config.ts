import { Container } from 'inversify';
import CommandHandlerManager from '../CommandHandler/CommandHandlerManager';
import {TYPES} from '../../Domain/DependencyInjection/types';
import CommandHandler from '../../Domain/Command/CommandHandler';
import {PrismaClient} from '@prisma/client';
import ContestantRepository from "../../Domain/Contestant/ContestantRepository";
import GetContestantCommandHandler from "../../Application/Query/Contestant/GetContestant/GetContestantCommandHandler";
import ListAllContestantsCommandHandler
    from "../../Application/Query/Contestant/ListAllContestants/ListAllContestantsCommandHandler";
import {VoteRepository} from "../../Domain/Contestant/VoteRepository";
import OrmContestantRepository from "../Orm/Contestant/OrmContestantRepository";
import OrmVoteRepository from "../Orm/Contestant/OrmVoteRepository";
import VoteContestantCommandHandler
    from "../../Application/Write/Contestant/VoteContestant/VoteContestantCommandHandler";
import DeleteVoteCommandHandler from "../../Application/Write/Contestant/DeleteVote/DeleteVoteCommandHandler";

const myContainer = new Container();

// Repositories
myContainer.bind<PrismaClient>(TYPES.OrmClient).toConstantValue(new PrismaClient());
myContainer.bind<ContestantRepository>(TYPES.ContestantRepository).to(OrmContestantRepository);
myContainer.bind<VoteRepository>(TYPES.VoteRepository).to(OrmVoteRepository);

// Command handlers
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(GetContestantCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(ListAllContestantsCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(VoteContestantCommandHandler);
myContainer.bind<CommandHandler>(TYPES.CommandHandler).to(DeleteVoteCommandHandler);
myContainer.bind<CommandHandlerManager>(CommandHandlerManager).toSelf();

// Events
//myContainer.bind<EventHandler>(TYPES.EventHandler).to(MonitorStatusChangedHandler);
//myContainer.bind<EventDispatcherInterface>(TYPES.EventDispatcher).to(EventDispatcher);

// Factories

// Security

// Services

// Console Command
//myContainer.bind<CreateUser>(CreateUser).toSelf();

export { myContainer };
