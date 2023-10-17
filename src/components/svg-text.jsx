import { useEffect, useRef } from 'react'

export default function SVGText({
  children,
  fontSize = '1.25rem',
  ...props
}) {
  const textRef = useRef(null)
  const svgRef = useRef(null)

  useEffect(() => {
    if(textRef.current) {
      const { width, height } = textRef.current.getBoundingClientRect()
      console.log()
      svgRef.current.style.cssText += `;width:${width}px;height:${height}px;`
    }
  }, [ textRef.current ])

  return (
    <svg ref={svgRef} viewBox='0 0 120 40' xmlns='http://www.w3.org/2000/svg'>
      <text ref={textRef} textAnchor='left' dominantBaseline='hanging' x='0' y='0' stroke='white' strokeWidth='2' fontSize={fontSize} fontWeight='900' paintOrder='stroke' fill='currnetColor' {...props}>{children}</text>
    </svg>
  )
}