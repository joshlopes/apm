import Contestant from "./Contestant";
import ContestantId from "./ContestantId";

export default interface ContestantRepository {
    /**
     * @throws RecordNotFound
     */
    get(id: ContestantId): Promise<Contestant>;

    upsert(contestant: Contestant): Promise<Contestant>;

    delete(id: ContestantId): Promise<void>;

    findAll(category?: string): Promise<Contestant[]>;
}
