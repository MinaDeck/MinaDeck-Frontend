import classNames from 'classnames';

// Initialize an object to store JSX elements for each chip value
const chipsSet = {};

// Loop over each chip value to create chip elements
for (const [chipsIndex, chipsValue] of [50, 100, 200, 500, 1000, 5000].entries()) {
  // Assign a div element for each chip with a unique background position
  chipsSet[chipsValue] = <div
    className='bg-no-repeat bg-[url("/chips.png")] relative'
    style={{
      width: 148, height: 152,
      backgroundPositionX: -16 - (164 * chipsIndex), // X position for each chip value
      backgroundPositionY: -24, // Y position is constant for all chips
    }}
  />
}

// Chips component to render a chip with a specific value
export default function Chips({
  className = '', // Additional class names passed as props
  value = 50, // Default value of the chip
  ...props
}) {
  // Render the JSX element for the chip with the specified value
  return (
    <div className={classNames(className)} {...props}>{chipsSet[value]}</div>
  );
}
