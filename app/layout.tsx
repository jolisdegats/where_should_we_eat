import '@/styles/globals.scss'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Where Should We Eat Today',
  description: 'A fun way to decide where to eat with your team, featuring celebrity hosts like The Rock, Chuck Norris, and more!',
  keywords: ['food choice', 'team lunch', 'restaurant picker', 'lunch wheel', 'dinner spinner'],
  authors: [{ name: 'Juliette Solomon' }],
  manifest: '/manifest.json',
  themeColor: '#7400B8',
  openGraph: {
    type: 'website',
    title: 'Where Should We Eat Today',
    description: 'A fun way to decide where to eat with your team, featuring celebrity hosts like The Rock, Chuck Norris, and more!',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Where Should We Eat Today',
    description: 'A fun way to decide where to eat with your team, featuring celebrity hosts like The Rock, Chuck Norris, and more!',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body className="flex justify-center items-center flex-col w-full min-h-screen bg-gradient-to-tr from-blue-900 via-blue-600 to-green-400">
        {children}
      </body>
    </html>
  )
} 