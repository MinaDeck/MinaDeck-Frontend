import classNames from 'classnames'

export default function StyledButton({
  className = 'bg-red-600',
  roundedStyle = 'rounded-lg',
  children,
  ...props
}) {
  return (
    <button type='button' className={
      classNames(
        'group hover:brightness-110 disabled:filter-none inline-block pb-[6px] cursor-pointer select-none overflow-hidden',
        'shadow-[0_2px_6px_rgba(0,0,0,0.8)] duration-75 transition-[padding,transform,filter]',
        'translate-y-0 active:translate-y-1 disabled:translate-y-0 disabled:pb-[6px] disabled:bg-gray-600',
        roundedStyle,
        className,
      )} {...props}>
      <div className={
        classNames(
          'font-extrabold relative text-white px-8 py-1 bg-gradient-to-b from-white/30 to-white/0 shadow-[inset_0_0_3px_rgba(255,255,255,0.8),0_10px_0_0_rgba(0,0,0,0.6),0_-10px_0_rgba(0,0,0,0.6)] group-disabled:opacity-60',
          'before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.6),rgba(255,255,255,0))]',
          roundedStyle,
        )}
      >
      {children}
      </div>
    </button>
  )
}