import Blacklist from "./Blacklist";

export interface BlacklistRepository {
    findByIp(ip: string): Promise<Blacklist|null>;

    create(blacklist: Blacklist): Promise<Blacklist>;
}