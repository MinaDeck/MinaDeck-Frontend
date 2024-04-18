const { Field, SmartContract, state, method, proofSystem } = require('o1js');

export class ShuffleContract extends SmartContract {
  constructor() {
    super();
    this.deck = state(Array(Field), Array.from({ length: 52 }, (_, i) => new Field(i + 1)));
    this.shuffled = state(Array(Field), []);
  }

  @method shuffle() {
    const deck = this.deck.get();
    const shuffled = deck.slice();

    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    this.shuffled.set(shuffled);
  }

  @method getShuffledDeck() {
    return this.shuffled.get();
  }

}