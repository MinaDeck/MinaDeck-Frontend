// Importing the global CSS file to apply common styles throughout the application
import '@/styles/global.css'

// Setting up metadata for the application to improve search engine optimization (SEO)
// and provide meaningful information in browser tabs and search results
export const metadata = {
  title: 'Card Poker', // The title of the application
  description: 'A thrilling and immersive online card poker game experience.', // Short description of the application
}

// The RootLayout functional component acts as a container for all child components
// that will be rendered within the application's body
export default function RootLayout({
  children // React children prop for rendering nested components
}) {
  return (
    // The HTML structure of the RootLayout component
    <html>
      {/* The body tag contains the application's global background and displays all child components */}
      <body className='bg-cover bg-[url("/bg.png")]'>{children}</body>
    </html>
  )
}
