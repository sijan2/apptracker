import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly'

async function handleLogin() {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
      },
      scopes: SCOPES,
    },
  })
}

async function handleLogout() {
  supabase.auth.signOut({ scope: 'global' })
}

export { supabase, handleLogin, handleLogout }
