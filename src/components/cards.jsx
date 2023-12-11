import classNames from 'classnames';

// Card elements mapped by name
const cardSet = {}; 

// Add suit and value cards
['spade', 'heart', 'club', 'diamond'].forEach((suit, i) => {
  '2,3,4,5,6,7,8,9,10,J,Q,K,A'.split(',').forEach((value, j) => {
    cardSet[`${suit} ${value}`] = (
      <div 
        className="card-image"
        style={{  
          // Position based on value and suit indexes          
        }}
      />
    );
  });
});

// Add different card back images 
[0, 1, 2].forEach(i => {
  cardSet[`back${i}`] = (
    <div 
      className="card-back"
      style={{
         // Position for back image
      }}
    />
  );
});

// Map values 1-52 to card elements
const cardMap = new Map();

// Add cards to map
[...Array(52)].forEach((_, i) => {
  // Get suit and value indexes from card index
  const suitIndex = i % 4;
  const valueIndex = Math.floor(i / 4);

  // Generate value from indexes
  const value = (valueIndex + 2) * 10 + suitIndex + 1; 
  
  // Add to map
  cardMap.set(value, cardSet[`${suits[suitIndex]} ${values[valueIndex]}`]);
});

// Card component
export default function PlayingCard({
  value, 
  className,
  back = 'back0'
}) {
  // Show value card or default back
  const card = value ? cardMap.get(value) : cardSet[back];

  return (
    <div className={classNames(className)}>{card}</div>
  );
}
