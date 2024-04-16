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

async function getSubscriptions() {
  const { data: subscriptions } = await supabase
    .from('profiles')
    .select('unsubscribed')

  if (subscriptions) {
    return subscriptions[0].unsubscribed
  } else return []
}

async function addSubscriptions(user: any, emailsArray: string[]) {
  if (emailsArray.length > 0) {
    const pathParams = {
      id: user.id,
      name: user.user_metadata.name,
      email: user.email,
    }

    const { data } = await supabase.from('profiles').select('unsubscribed')

    if (data) {
      const { unsubscribed } = data[0]

      await supabase.from('profiles').upsert([
        {
          ...pathParams,
          unsubscribed:
            unsubscribed !== null
              ? [...unsubscribed, ...emailsArray]
              : [...emailsArray],
        },
      ])
    }
  }
}

export {
  supabase,
  handleLogin,
  handleLogout,
  getSubscriptions,
  addSubscriptions,
}
