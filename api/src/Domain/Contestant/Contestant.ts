import Vote, {VoteArray} from "./Vote";
import ContestantId from "./ContestantId";

export type ContestantArray = {
    id: string,
    name: string,
    category: string,
    video_url: string,
    thumbnail_url: string,
    votes?: VoteArray[]
    created_at?: Date|undefined,
    updated_at?: Date|undefined
}

export default class Contestant {
    constructor(
        public id: ContestantId,
        public name: string,
        public category: string,
        public videoUrl: string,
        public thumbnailUrl: string,
        public votes?: Vote[],
        public created_at?: Date,
        public updated_at?: Date
    ) {}

    static fromArray(array: ContestantArray): Contestant {
        return new Contestant(
            ContestantId.fromString(array.id),
            array.name,
            array.category,
            array.video_url,
            array.thumbnail_url,
            array.votes ? array.votes.map(vote => Vote.fromArray(vote)) : [],
            array.created_at,
            array.updated_at
        );
    }

    toArray(): ContestantArray {
        return {
            id: this.id.toString(),
            name: this.name,
            category: this.category,
            video_url: this.videoUrl,
            thumbnail_url: this.thumbnailUrl,
            votes: this.votes?.map(vote => vote.toArray()),
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}