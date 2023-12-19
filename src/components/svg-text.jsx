import { useEffect, useRef } from 'react';

// SVGText component: Renders text within an SVG for enhanced styling and effects
export default function SVGText({
  children,
  fontSize = '1.25rem', // Default font size for the text
  ...props
}) {
  const textRef = useRef(null); // useRef hook to reference the text element
  const svgRef = useRef(null); // useRef hook to reference the SVG element

  useEffect(() => {
    // Adjusts the SVG size to match the size of the text
    if (textRef.current) {
      const { width, height } = textRef.current.getBoundingClientRect();
      // Dynamically sets the SVG dimensions based on text size
      svgRef.current.style.cssText += `;width:${width}px;height:${height}px;`;
    }
  }, [textRef.current]); // Effect runs when the text element reference updates

  return (
    <svg ref={svgRef} viewBox='0 0 120 40' xmlns='http://www.w3.org/2000/svg'>
      {/* Text element within SVG, customizable via props */}
      <text ref={textRef} textAnchor='left' dominantBaseline='hanging' x='0' y='0' stroke='white' strokeWidth='2' fontSize={fontSize} fontWeight='900' paintOrder='stroke' fill='currentColor' {...props}>
        {children} {/* Displaying children elements or text */}
      </text>
    </svg>
  );
}
