import { useEffect, useRef } from 'react';

export default function SVGText({
  children,
  fontSize = '1.25rem', // Default font size
  ...props
}) {
  const textRef = useRef(null); // Reference for the text element
  const svgRef = useRef(null); // Reference for the SVG element

  useEffect(() => {
    // Adjust the size of the SVG to match the text size
    if (textRef.current) {
      const { width, height } = textRef.current.getBoundingClientRect();
      svgRef.current.style.cssText += `;width:${width}px;height:${height}px;`;
    }
  }, [textRef.current]); // Dependency on the text element reference

  return (
    <svg ref={svgRef} viewBox='0 0 120 40' xmlns='http://www.w3.org/2000/svg'>
      {/* Text element with customizable properties */}
      <text ref={textRef} textAnchor='left' dominantBaseline='hanging' x='0' y='0' stroke='white' strokeWidth='2' fontSize={fontSize} fontWeight='900' paintOrder='stroke' fill='currentColor' {...props}>
        {children}
      </text>
    </svg>
  );
}