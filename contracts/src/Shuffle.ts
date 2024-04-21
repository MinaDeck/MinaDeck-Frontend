import { Field, SmartContract, state, State, method } from 'o1js';

export class ShuffleContract extends SmartContract {

  @state(Field) shuffled = State<Field[]>();

  init() {
    super.init();
  }

  @method async shuffle(): Promise<void> {
    const deck = Array.from({ length: 52 }, (_, i) => new Field(i + 1));
    const shuffled = deck.slice();

    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    this.shuffled.set(shuffled);
  }

  getShuffledDeck(): Field[] {
    return this.shuffled.get();
  }

}