import classNames from 'classnames';

// Initialize an empty object to store each chip's JSX element
const chipsSet = {};

// Create chip elements for each value
for (const [chipsIndex, chipsValue] of [50, 100, 200, 500, 1000, 5000].entries()) {
  chipsSet[chipsValue] = <div
    className='bg-no-repeat bg-[url("/chips.png")] relative'
    style={{
      width: 148, height: 152,
      backgroundPositionX: -16 - (164 * chipsIndex),
      backgroundPositionY: -24,
    }}
  />
}

// Component to render a chip with a specific value
export default function Chips({
  className = '',
  value = 50,
  ...props
}) {
  // Return the JSX element for the chip with the specified value
  return (
    <div className={classNames(className)} {...props}>{chipsSet[value]}</div>
  );
}