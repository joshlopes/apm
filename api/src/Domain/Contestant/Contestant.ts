import Vote, {VoteArray} from "./Vote";
import ContestantId from "./ContestantId";

export type ContestantArray = {
    id: string,
    sequence: number,
    name: string,
    category: string,
    video_url: string,
    thumbnail_url: string,
    verified_votes: number,
    has_ended: boolean,
    votes?: VoteArray[]
    created_at?: Date|undefined,
    updated_at?: Date|undefined
}

export default class Contestant {
    constructor(
        public id: ContestantId,
        public sequence: number,
        public name: string,
        public category: string,
        public videoUrl: string,
        public thumbnailUrl: string,
        public verifiedVotes: number,
        public hasEnded: boolean,
        public votes?: Vote[],
        public created_at?: Date,
        public updated_at?: Date
    ) {}

    static fromArray(array: ContestantArray): Contestant {
        return new Contestant(
            ContestantId.fromString(array.id),
            array.sequence,
            array.name,
            array.category,
            array.video_url,
            array.thumbnail_url,
            array.verified_votes,
            array.has_ended,
            array.votes ? array.votes.map(vote => Vote.fromArray(vote)) : [],
            array.created_at,
            array.updated_at
        );
    }

    toArray(): ContestantArray {
        return {
            id: this.id.toString(),
            sequence: this.sequence,
            name: this.name,
            category: this.category,
            video_url: this.videoUrl,
            thumbnail_url: this.thumbnailUrl,
            verified_votes: this.verifiedVotes,
            has_ended: this.hasEnded,
            votes: this.votes?.map(vote => vote.toArray()),
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}