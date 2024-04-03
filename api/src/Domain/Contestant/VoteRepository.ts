import Vote from "./Vote";

export interface VoteRepository {
    create(vote: Vote): Promise<void>
}