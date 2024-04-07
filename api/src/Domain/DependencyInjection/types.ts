export const TYPES = {
    // Generics
    CommandHandler: Symbol.for('CommandHandler'),
    EventHandler: Symbol.for('EventHandler'),
    EventDispatcher: Symbol.for('EventDispatcher'),

    // Clients
    OrmClient: Symbol.for('OrmClient'),

    // Repositories
    ContestantRepository: Symbol.for('ContestantRepository'),
    VoteRepository: Symbol.for('VoteRepository'),
    BlacklistRepository: Symbol.for('BlacklistRepository'),
}
