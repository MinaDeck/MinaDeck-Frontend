import '@/styles/global.css'

export const metadata = {
  title: 'card poker',
  description: '...',
}

export default function RootLayout({
  children
}) {
  return (
    <html>
      <body className='bg-cover bg-[url("/bg.png")]'>{children}</body>
    </html>
  )
}