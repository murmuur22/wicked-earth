import { createServerClient } from '@supabase/ssr'
import { type Handle, redirect } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import log from '$lib/utils/log';

import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

const supabase: Handle = async ({ event, resolve }) => {
  log.bold(`New request being made from ${event.url.pathname}`);

  /**
   * Creates a Supabase client specific to this server request.
   *
   * The Supabase client gets the Auth token from the request cookies.
   */
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => event.cookies.getAll(),
      /**
       * SvelteKit's cookies API requires `path` to be explicitly set in
       * the cookie options. Setting `path` to `/` replicates previous/
       * standard behavior.
       */
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: '/' })
        })
      },
    },
  })

  // Log all cookies
  const cookies = event.cookies.getAll();
  log.plain("All Cookies: " + JSON.stringify(cookies));


  /**
   * Unlike `supabase.auth.getSession()`, which returns the session _without_
   * validating the JWT, this function also calls `getUser()` to validate the
   * JWT before returning the session.
   */
  event.locals.safeGetSession = async () => {
    log.plain("Attempting to get session from Supabase");
    const {
      data: { session },
      error: sessionError
    } = await event.locals.supabase.auth.getSession()

    if (sessionError) {
      log.error("Error getting session: " + sessionError.message);
    }

    if (!session) {
      log.error("No session found");
      return { session: null, user: null }
    }

    log.plain("Session found: " + JSON.stringify(session));

    const {
      data: { user },
      error: userError,
    } = await event.locals.supabase.auth.getUser()
    if (userError) {
      // JWT validation has failed
      log.error("Error getting user: " + userError.message);
      return { session: null, user: null }
    }
    if (!user) {
      log.error("No user found");
      return { session: null, user: null }
    }

    log.plain("User found: " + JSON.stringify(user));

    return { session, user }
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      /**
       * Supabase libraries use the `content-range` and `x-supabase-api-version`
       * headers, so we need to tell SvelteKit to pass it through.
       */
      return name === 'content-range' || name === 'x-supabase-api-version'
    },
  })
}

// const authGuard: Handle = async ({ event, resolve }) => {
//   const { session, user } = await event.locals.safeGetSession()
//   event.locals.session = session
//   event.locals.user = user

//   if (!event.locals.session && event.url.pathname.startsWith('/private')) {
//     redirect(303, '/auth')
//   }

//   if (event.locals.session && event.url.pathname === '/auth') {
//     redirect(303, '/private')
//   }

//   return resolve(event)
// }

export const handle: Handle = sequence(supabase) //, authGuard)