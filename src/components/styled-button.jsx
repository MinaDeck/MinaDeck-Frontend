import classNames from 'classnames';

// Defines the StyledButton functional component with default props for styling
export default function StyledButton({
  // Sets default background color class to red and border radius to large
  className = 'bg-red-600',
  roundedStyle = 'rounded-lg',
  children, // React children prop to display anything inside the button
  ...props // Spreads any additional props passed to the button
}) {
  // Returns a button element with combined class names for styling
  return (
    <button 
      type='button' // Specifies the button type
      className={classNames(
        // General styles including padding, cursor, overflow, shadow, transitions
        'group hover:brightness-110 disabled:filter-none inline-block pb-[6px] cursor-pointer select-none overflow-hidden',
        'shadow-[0_2px_6px_rgba(0,0,0,0.8)] duration-75 transition-[padding,transform,filter]',
        // Active and disabled state styles
        'translate-y-0 active:translate-y-1 disabled:translate-y-0 disabled:pb-[6px] disabled:bg-gray-600',
        // Additional class styles passed as props
        roundedStyle,
        className,
      )} 
      {...props} // Spreads any additional props onto the button element
    >
      {/* Inner div for visual effects like gradient and shadow */}
      <div className={classNames(
        // Font styling and positioning, gradient background for effect
        'font-extrabold relative text-white px-8 py-1 bg-gradient-to-b from-white/30 to-white/0 shadow-[inset_0_0_3px_rgba(255,255,255,0.8),0_10px_0_0_rgba(0,0,0,0.6),0_-10px_0_rgba(0,0,0,0.6)] group-disabled:opacity-60',
        // Adds a pseudo-element for additional visual effects
        'before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.6),rgba(255,255,255,0))]',
        // Rounded style for the inner div matching the button's border radius
        roundedStyle,
      )}>
        {children} 
      </div>
    </button>
  );
}
