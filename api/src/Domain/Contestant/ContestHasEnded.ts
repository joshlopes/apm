export default class ContestHasEnded extends Error {
    constructor() {
        super('The contest has ended.');
    }
}
