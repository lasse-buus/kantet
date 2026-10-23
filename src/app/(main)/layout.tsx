import { Analytics } from '@vercel/analytics/next'
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'

// Analytics lives here (not the root layout) so /studio and /gate aren't tracked
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
      <Analytics />
    </>
  )
}
