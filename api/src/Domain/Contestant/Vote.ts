import Contestant, {ContestantArray} from "./Contestant";
import VoteId from "./VoteId";

export type VoteArray = {
    id: string,
    ip: string,
    is_deleted: boolean,
    deleted_by?: string|null,
    contestant?: ContestantArray,
    created_at?: Date|undefined,
    updated_at?: Date|undefined
}

export default class Vote {
    constructor(
        public id: VoteId,
        public ip: string,
        public contestant?: Contestant,
        public is_deleted: boolean = false,
        public deleted_by?: string|null,
        public created_at?: Date,
        public updated_at?: Date
    ) {}

    static fromArray(array: VoteArray): Vote {
        return new Vote(
            VoteId.fromString(array.id),
            array.ip,
            array.contestant ? Contestant.fromArray(array.contestant) : undefined,
            array.is_deleted,
            array.deleted_by,
            array.created_at,
            array.updated_at
        );
    }

    toArray(): VoteArray {
        return {
            id: this.id.toString(),
            ip: this.ip,
            is_deleted: this.is_deleted,
            deleted_by: this.deleted_by,
            contestant: this.contestant?.toArray(),
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}