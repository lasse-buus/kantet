import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import ThemeProvider from '@/components/ThemeProvider'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'Kantet', template: '%s | Kantet' },
  description: 'Web design and development agency',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-white text-stone-950 dark:bg-stone-950 dark:text-stone-100 transition-colors duration-200">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
