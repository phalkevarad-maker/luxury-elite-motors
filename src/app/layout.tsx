import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "@/providers"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "Luxury Elite Motors | Drive Beyond Luxury",
  description: "Premium luxury car marketplace featuring Rolls Royce, Lamborghini, Ferrari, Porsche, Bentley, and more. Experience automotive excellence.",
  keywords: "luxury cars, supercars, rolls royce, lamborghini, ferrari, porsche, bentley, bugatti, mclaren, aston martin",
  openGraph: {
    title: "Luxury Elite Motors | Drive Beyond Luxury",
    description: "Premium luxury car marketplace featuring the world's finest automobiles.",
    type: "website",
    locale: "en_US",
    siteName: "Luxury Elite Motors"
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Elite Motors",
    description: "Premium luxury car marketplace"
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-luxury-black text-white antialiased">
        <Providers>
          <Navbar />
          <main className="relative">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
