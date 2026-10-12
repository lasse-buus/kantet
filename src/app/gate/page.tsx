import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function authenticate(formData: FormData) {
  'use server'
  const password = formData.get('password')
  if (password === process.env.SITE_PASSWORD) {
    const cookieStore = await cookies()
    cookieStore.set('site-auth', process.env.SITE_PASSWORD!, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === 'production',
    })
    redirect('/')
  }
  redirect('/gate?error=1')
}

interface Props {
  searchParams: Promise<{ error?: string }>
}

export default async function GatePage({ searchParams }: Props) {
  const { error } = await searchParams
  return (
    <main className="min-h-svh flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="eyebrow text-muted mb-4">Kantet</p>
        <h1 className="display text-4xl font-medium mb-2">Coming soon</h1>
        <p className="text-muted text-sm mb-8">Enter the password to preview the site.</p>
        <form action={authenticate} className="flex flex-col gap-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoFocus
            className="bg-transparent border-b border-line py-3 text-lg outline-none placeholder:text-subtle focus:border-ink transition-colors"
          />
          {error && (
            <p className="text-red-500 text-sm -mt-2">Incorrect password.</p>
          )}
          <button
            type="submit"
            className="bg-ink text-paper px-6 py-3 rounded-[4px] text-sm hover:opacity-85 transition-opacity"
          >
            Enter
          </button>
        </form>
      </div>
    </main>
  )
}
