import { Poppins } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../context/AuthContext'

const poppins = Poppins(
  {
    weight: "500"
    
  }
)

export const metadata = {
  title: 'ArtisanAI - Empowering Indian Craftspeople',
  description: 'Connect traditional artisans with digital audiences using AI-powered storytelling and marketplace integration.',
  keywords: 'artisan, marketplace, AI, crafts, handmade, indian artisans, traditional crafts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}