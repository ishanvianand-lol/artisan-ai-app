import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ArtisanAI - Empowering Indian Craftspeople',
  description: 'Connect traditional artisans with digital audiences using AI-powered storytelling and marketplace integration.',
  keywords: 'artisan, marketplace, AI, crafts, handmade, indian artisans, traditional crafts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}