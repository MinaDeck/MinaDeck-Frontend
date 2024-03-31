import { cardNumber, shuffleCard } from "@/constants";

describe('cardNumber', () => {
    it('should return an array of numbers from 1 to 52', () => {
        expect(cardNumber()).toEqual(Array.from({ length: 52 }, (_, i) => i + 1));
    });
});

describe('shuffleCard', () => {
    it('should return an array of shuffled numbers from 1 to 52', () => {
        const shuffled = shuffleCard();
        expect(shuffled).toEqual(expect.arrayContaining(Array.from({ length: 52 }, (_, i) => i + 1)));
        expect(shuffled).not.toEqual(Array.from({ length: 52 }, (_, i) => i + 1));
    });
});