import { ServerContext } from "@analogjs/router/tokens"
import { CookieOptions, createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr"

export function createClient(context: ServerContext) {
  return createServerClient(import.meta.env['VITE_SUPABASE_URL']!, import.meta.env['VITE_PUBLIC_PUBLISHABLE_KEY']!, {
    cookies: {
      getAll() {
        return parseCookieHeader(context.req.headers.cookie ?? '').map(({ name, value }) => ({
          name: name ?? '',
          value: value ?? ''
        }))
      },
      setAll(cookiesToSet: { name: string, value: string, options: CookieOptions }[]) {
        cookiesToSet.forEach(({ name, value, options }) =>
          context.res.appendHeader('Set-Cookie', serializeCookieHeader(name, value, options)));
      }
    }
  })
}