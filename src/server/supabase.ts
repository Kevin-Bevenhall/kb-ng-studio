import { ServerContext } from '@analogjs/router/tokens';
import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr';

export function createClient(context: ServerContext) {
  return createServerClient(process.env['SUPABASE_URL']!, process.env['SUPABASE_KEY']!, {
    cookies: {
      getAll() {
        return parseCookieHeader(context.req.headers.cookie ?? '').map(({ name, value }) => ({
          name: name ?? '',
          value: value ?? ''
        }))
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          context.res.appendHeader('Set-Cookie', serializeCookieHeader(name, value, options))
        )
      },
    },
  })
}