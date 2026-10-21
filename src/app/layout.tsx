import type { Metadata } from 'next'
import { DM_Mono, Schibsted_Grotesk } from 'next/font/google'
import ThemeProvider from '@/components/ThemeProvider'
import './globals.css'

const schibsted = Schibsted_Grotesk({ variable: '--font-schibsted', subsets: ['latin'] })
const dmMono = DM_Mono({ variable: '--font-dm-mono', subsets: ['latin'], weight: ['400', '500'] })

export const metadata: Metadata = {
  title: { default: 'Kantet', template: '%s | Kantet' },
  description: 'Web design and development agency',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${schibsted.variable} ${dmMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans transition-colors duration-200">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
