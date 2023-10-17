import classNames from 'classnames'

const chipsSet = {}

for(const [ chipsIndex, chipsValue ] of [ 50, 100, 200, 500, 1000, 5000 ].entries()) {
  chipsSet[chipsValue] = <div
      className='bg-no-repeat bg-[url("/chips.png")] relative'
      style={ {
        width: 148, height: 152,
        backgroundPositionX: -16 - (164 * chipsIndex),
        backgroundPositionY: -24,
      } }
    />
}


export default function Chips({
  className = '',
  value = 50,
  ...props
}) {
  return (
    <div className={classNames(className)} {...props}>{ chipsSet[value] }</div>
  )
}