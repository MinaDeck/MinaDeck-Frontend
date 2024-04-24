import { Field, SmartContract, state, State, method, Poseidon } from 'o1js';
import { evaluateHand } from './PokerLib';

export class ShuffleContract extends SmartContract {

  @state(Field) shuffled = State<Field[]>();
  @state(Field) boardCards = State<Field[]>();
  @state(Field) playerHands = State<{ [playerId: string]: Field[] }>();
  @state(Field) winner = State<String>();

  init() {
    super.init();
  }

  @method async shuffle() {
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const deck: Field[] = [];

    for (const suit of suits) {
      for (const value of values) {
        const card = new Field(Poseidon.hash([new Field(suits.indexOf(suit)), new Field(values.indexOf(value))]));
        deck.push(card);
      }
    }

    const shuffled = deck.slice();

    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    this.shuffled.set(shuffled);
  }

  @method async allocateCards(playerIds: Field[]) {
    const shuffledDeck = this.shuffled.get();
    const tempPlayerHands: { [playerId: string]: Field[] } = {};
    const tempBoardCards: Field[] = [];

    // Deal two cards to each player
    for (let i = 0; i < playerIds.length; i++) {
      const playerId = Poseidon.hash(playerIds[i].toFields()).toString();
      tempPlayerHands[playerId] = [shuffledDeck.pop()!, shuffledDeck.pop()!];
    }

    // Deal the board cards
    for (let i = 0; i < 5; i++) {
      tempBoardCards.push(shuffledDeck.pop()!);
    }

    this.playerHands.set(tempPlayerHands);
    this.boardCards.set(tempBoardCards);
  }

  @method async revealWinner() {
    const playerHands = this.playerHands.get();
    const boardCards = this.boardCards.get();
    const evaluatedHands: { [playerId: string]: Field } = {};

    for (const playerId in playerHands) {
      const hand = playerHands[playerId];
      const combinedHand = [...hand, ...boardCards];
      evaluatedHands[playerId] = new Field(evaluateHand(combinedHand));
    }

    const winnerPlayerId = Object.keys(evaluatedHands).reduce((maxPlayerId, playerId) => {
      return evaluatedHands[playerId].greaterThan(evaluatedHands[maxPlayerId]) ? playerId : maxPlayerId;
    });

    this.winner.set(winnerPlayerId);
  }
}