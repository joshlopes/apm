import Vote from "./Vote";
import VoteId from "./VoteId";

export interface VoteRepository {
    create(vote: Vote): Promise<void>

    delete(id: VoteId, ip: string): Promise<void>

    get(id: VoteId): Promise<Vote>
}