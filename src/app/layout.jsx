// Importing the global CSS styles
import '@/styles/global.css'

// Metadata object to define the title and description of the application
export const metadata = {
  title: 'card poker', // Title of the application
  description: '...', // Description of the application, replace '...' with actual description
}

// The RootLayout component that will wrap around other components in your application
export default function RootLayout({
  children // Props passed to the component, typically the child components
}) {
  return (
    <html>
      <body className='bg-cover bg-[url("/bg.png")]'>
        {/* The children components will be rendered here. The body has a background cover with an image. */}
        {children}
      </body>
    </html>
  )
}
