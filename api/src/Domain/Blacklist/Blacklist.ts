export type BlacklistArray = {
    id: string,
    ip: string,
    created_at: Date,
    updated_at: Date,
}

export default class Blacklist {
    constructor(
        public readonly id: string,
        public readonly ip: string,
        public readonly createdAt: Date = new Date(),
        public readonly updatedAt: Date = new Date(),
    ) {}

    static fromArray(blacklistArray: BlacklistArray): Blacklist {
        return new Blacklist(
            blacklistArray.id,
            blacklistArray.ip,
            blacklistArray.created_at,
            blacklistArray.updated_at
        );
    }

    toArray(): BlacklistArray {
        return {
            id: this.id,
            ip: this.ip,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        };
    }
}