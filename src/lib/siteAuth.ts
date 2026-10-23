import { createHmac, timingSafeEqual } from 'node:crypto'

// Flip to true to re-enable the "Coming soon" password gate (also needs SITE_PASSWORD set)
export const LOCK_ENABLED = false

export const AUTH_COOKIE = 'site-auth'

const PASSWORD = process.env.SITE_PASSWORD

export function isLocked() {
  return LOCK_ENABLED && !!PASSWORD
}

// The cookie holds a derived token, never the password itself.
// Changing SITE_PASSWORD invalidates every existing cookie.
export function authToken() {
  return createHmac('sha256', PASSWORD ?? '').update('kantet-site-auth').digest('hex')
}

export function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB)
}

export function checkPassword(input: string) {
  return !!PASSWORD && safeEqual(input, PASSWORD)
}

export function isAuthenticated(cookieValue: string | undefined) {
  return !!cookieValue && safeEqual(cookieValue, authToken())
}
