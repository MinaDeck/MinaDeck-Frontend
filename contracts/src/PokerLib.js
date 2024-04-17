export { deck, cardValues, evaluateHand, findWinner };

// Initialize a standard deck of cards
const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const deck = [];

for (const suit of suits) {
    for (const value of values) {
        deck.push({ suit, value });
    }
}

// Define card values for comparison
const cardValues = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14,
};

// Evaluate a poker hand to determine its strength and type
function evaluateHand(hand) {
    const valuesCount = {};
    const suitsCount = {};
    let hasStraight = false;
    let hasFlush = false;

    for (const card of hand) {
        // Count the number of occurrences of each card value and suit
        valuesCount[card.value] = (valuesCount[card.value] || 0) + 1;
        suitsCount[card.suit] = (suitsCount[card.suit] || 0) + 1;
    }

    // Check for flush (five cards of the same suit)
    for (const suit in suitsCount) {
        if (suitsCount[suit] >= 5) {
            hasFlush = true;
            break;
        }
    }

    // Check for straight (five consecutive card values)
    const sortedCardValues = Object.keys(valuesCount).sort((a, b) => cardValues[a] - cardValues[b]);
    for (let i = 0; i < sortedCardValues.length - 4; i++) {
        if (cardValues[sortedCardValues[i + 4]] - cardValues[sortedCardValues[i]] === 4) {
            hasStraight = true;
            break;
        }
    }

    if (hasFlush && hasStraight) {
        console.log('Card Evaluation:', { strength: 9, type: 'Straight Flush' });
        return 9;
    }

    // Check for four of a kind
    for (const value in valuesCount) {
        if (valuesCount[value] === 4) {
            console.log('Card Evaluation:', { strength: 8, type: 'Four of a Kind' });
            return 8;
        }
    }

    // Check for full house (three of a kind and a pair)
    let hasThreeOfAKind = false;
    let hasPair = false;
    for (const value in valuesCount) {
        if (valuesCount[value] === 3) {
            hasThreeOfAKind = true;
        }
        if (valuesCount[value] === 2) {
            hasPair = true;
        }
    }
    if (hasThreeOfAKind && hasPair) {
        console.log('Card Evaluation:', { strength: 7, type: 'Full House' });
        return 7;
    }

    if (hasFlush) {
        console.log('Card Evaluation:', { strength: 6, type: 'Flush' });
        return 6;
    }

    if (hasStraight) {
        console.log('Card Evaluation:', { strength: 5, type: 'Straight' });
        return 5;
    }

    // Check for three of a kind
    if (hasThreeOfAKind) {
        console.log('Card Evaluation:', { strength: 4, type: 'Three of a Kind' });
        return 4;
    }

    // Check for two pair
    if (Object.values(valuesCount).filter(count => count === 2).length === 2) {
        console.log('Card Evaluation:', { strength: 3, type: 'Two Pair' });
        return 3;
    }

    // Check for one pair
    if (hasPair) {
        console.log('Card Evaluation:', { strength: 2, type: 'One Pair' });
        return 2;
    }

    // High card
    const sortedCardValuesHighCard = sortedCardValues.reverse();
    console.log('Card Evaluation:', { strength: 1, type: 'High Card' });
    return 1;

}


// Compare two hands to find the winner
function findWinner(player1Hand, player2Hand) {
    const player1Strength = evaluateHand(player1Hand);
    const player2Strength = evaluateHand(player2Hand);
    console.log("player1Strength", player1Strength, "player2Strength", player2Strength);

    if (player1Strength > player2Strength) {
        console.log('Player 1 wins!');
        return 1;
    } else if (player1Strength < player2Strength) {
        console.log('Player 2 wins!');
        return 2;
    } else {
        // Comparing individual card ranks starting from the highest

        const player1CardValues = player1Hand.map(card => cardValues[card.value]);
        const player2CardValues = player2Hand.map(card => cardValues[card.value]);

        // Sort card values in descending order
        player1CardValues.sort((a, b) => b - a);
        player2CardValues.sort((a, b) => b - a);

        for (let i = 0; i < player1CardValues.length; i++) {
            if (player1CardValues[i] > player2CardValues[i]) {
                console.log('Player 1 wins!');
                return 1;
            } else if (player1CardValues[i] < player2CardValues[i]) {
                console.log('Player 2 wins!');
                return 2;
            }
        }
        // If all card values are equal, it's a tie
        console.log('It\'s a tie!');
        return 3;
    }
}
