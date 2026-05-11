export default function GatePage() {
  return (
    <main className="min-h-svh flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">Coming soon</h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">Enter the password to preview the site.</p>
        <form action="/api/auth" method="POST" className="flex flex-col gap-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoFocus
            className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
          />
          <button
            type="submit"
            className="bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 px-6 py-3 rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Enter
          </button>
        </form>
      </div>
    </main>
  )
}
