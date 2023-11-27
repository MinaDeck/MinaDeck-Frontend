import Chips from './chips'
import { Switch } from '@headlessui/react'

// Component to display selectable chips with a hover effect
function SelectableChips({
  value // Value prop that represents the chip's value
}) {
  // Renders a chip with a hover effect
  return (
    <div className='w-20 h-20 relative before:duration-300 before:transition-opacity before:opacity-0 before:bg-yellow-500 hover:before:opacity-100 before:rounded-full before:blur-sm before:absolute before:w-full before:h-full before:block'>
      // Chips component scaled down to fit within the container
      <Chips value={value} className='scale-[0.54] origin-top-left' />
    </div>
  )
}

// Main component to display a panel of chips
export default function ChipsPanel() {
  // Renders a panel with multiple selectable chips
  return (
    <div className='w-full h-full absolute bottom-[28px] -left-20 bg-no-repeat bg-bottom bg-[url("/table_bottom.png")] flex items-end justify-center'>
      // List of SelectableChips components with different values
      <SelectableChips value={50} />
      <SelectableChips value={100} />
      <SelectableChips value={200} />
      <SelectableChips value={500} />
      <SelectableChips value={1000} />
      <SelectableChips value={5000} />
      // ... More chips with different values ...
    </div>
  )
}
