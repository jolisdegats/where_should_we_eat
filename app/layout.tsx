import '@/styles/globals.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return ( 
    <html lang="en">
      <body className="flex justify-center items-center flex-col w-full min-h-screen bg-gradient-to-tr from-blue-900 via-blue-600 to-green-400">
        {children}
      </body>
    </html>
  )
} 