import classNames from 'classnames';

// Initialize an object to store JSX elements for each card
const cardSet = {};

// Loop over each suit and card value to create card elements
for (const [suitIndex, suit] of ['spade', 'heart', 'club', 'diamond'].entries()) {
  for (const [index, value] of '2,3,4,5,6,7,8,9,10,J,Q,K,A'.split(',').entries()) {
    // Assign a div element for each card with a unique background position
    cardSet[`${suit} ${value}`] = <div
      className='bg-no-repeat bg-[url("/poker_1280.png")]'
      style={{
        width: 96, height: 136,
        backgroundPositionX: -46 - (108 * index), // Calculate X position based on card value
        backgroundPositionY: -46 - (148 * suitIndex), // Calculate Y position based on card suit
      }}
    />
  }
}

// Add different card backs to the card set
for (const index of [0, 1, 2]) {
  cardSet[`back${index}`] = <div
    className='bg-no-repeat bg-[url("/poker_1280.png")]'
    style={{
      width: 96, height: 136,
      backgroundPositionX: -46 - (108 * index), // Position for card back variation
      backgroundPositionY: -46 - (148 * 4), // Position on sprite sheet for card backs
    }}
  />
}

// Map to store the mapping from numerical values to card JSX elements
const cardMap = new Map();
const suits = ['diamond', 'club', 'heart', 'spade'];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

// Populate the map with 52 playing cards
while (cardMap.size < 52) {
  const index = cardMap.size;
  const suitIndex = index % 4; // Determine the suit based on the index
  const baseIndex = Math.floor(index / 4); // Determine the card value based on the index
  // Map the numerical value to the corresponding JSX element
  cardMap.set((baseIndex + 2) * 10 + suitIndex + 1, cardSet[`${suits[suitIndex]} ${values[baseIndex]}`]);
}

console.log(cardSet)

// Component to render a playing card
export default function PlayingCard({
  value, // Numerical value representing the card
  className, // Additional class names for styling
  back = 'back0' // Default card back if no value is provided
}) {
  // Determine the card to be displayed based on the value or show the back
  const card = value ? cardMap.get(value) : cardSet[back];
  return (
    <div className={classNames(className)}>{card}</div>
  );
}