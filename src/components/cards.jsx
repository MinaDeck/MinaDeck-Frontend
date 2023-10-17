import classNames from 'classnames';

// Initialize an empty object to store each card's JSX element
const cardSet = {};

// Create card elements for each suit and value
for (const [suitIndex, suit] of ['spade', 'heart', 'club', 'diamond'].entries()) {
  for (const [index, value] of '2,3,4,5,6,7,8,9,10,J,Q,K,A'.split(',').entries()) {
    cardSet[`${suit} ${value}`] = <div
      className='bg-no-repeat bg-[url("/poker_1280.png")]'
      style={{
        width: 96, height: 136,
        backgroundPositionX: -46 - (108 * index),
        backgroundPositionY: -46 - (148 * suitIndex),
      }}
    />
  }
}

// Add card backs to the set
for (const index of [0, 1, 2]) {
  cardSet[`back${index}`] = <div
    className='bg-no-repeat bg-[url("/poker_1280.png")]'
    style={{
      width: 96, height: 136,
      backgroundPositionX: -46 - (108 * index),
      backgroundPositionY: -46 - (148 * 4),
    }}
  />
}

// Create a map to store the mapping from card values to JSX elements
const cardMap = new Map();
const suits = ['diamond', 'club', 'heart', 'spade'];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

// Populate the map with 52 playing cards
while (cardMap.size < 52) {
  const index = cardMap.size;
  const suitIndex = index % 4;
  const baseIndex = Math.floor(index / 4);
  cardMap.set((baseIndex + 2) * 10 + suitIndex + 1, cardSet[`${suits[suitIndex]} ${values[baseIndex]}`]);
}

// Component to render a playing card
export default function PlayingCard({
  value,
  className,
  back = 'back0'
}) {
  const card = value ? cardMap.get(value) : cardSet[back];
  return (
    <div className={classNames(className)}>{card}</div>
  );
}