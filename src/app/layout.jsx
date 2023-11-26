// Importing global CSS styles to ensure consistent styling across the application
import '@/styles/global.css'

// Metadata object defining essential details of the application for better SEO and user understanding
export const metadata = {
  title: 'Card Poker', // Title of the application, displayed in browser tabs and search results
  description: 'A thrilling and immersive online card poker game experience.', // A brief description of the application's purpose and features
}

// The RootLayout component acts as the main wrapper for all other components in the application.
// This pattern is useful for applying consistent layout or styles across various pages or components.
export default function RootLayout({
  children // Children props, representing the components nested inside RootLayout
}) {
  return (
    <html>
      <body className='bg-cover bg-[url("/bg.png")]'>
        {/* Here, the children components are rendered inside the body tag.
             The body is styled with a full cover background image,
             providing a visually appealing base for the application's content. */}
        {children}
      </body>
    </html>
  )
}
