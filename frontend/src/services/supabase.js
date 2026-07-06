import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.error(
    'Missing Supabase environment variables. Copy .env.example to .env and fill in your project URL and anon key.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

// ---------- Submissions CRUD helpers ----------

export async function fetchSubmissions({ userId, search = '', page = 1, pageSize = 10 }) {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from('submissions')
    .select('*', { count: 'exact' })
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(from, to)

  if (search) {
    query = query.or(
      `full_name.ilike.%${search}%,email.ilike.%${search}%,department.ilike.%${search}%`
    )
  }

  const { data, error, count } = await query
  return { data, error, count }
}

export async function fetchSubmissionById(id) {
  const { data, error } = await supabase.from('submissions').select('*').eq('id', id).single()
  return { data, error }
}

export async function createSubmission(payload) {
  const { data, error } = await supabase.from('submissions').insert(payload).select().single()
  return { data, error }
}

export async function updateSubmission(id, payload) {
  const { data, error } = await supabase
    .from('submissions')
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}

export async function deleteSubmission(id) {
  const { error } = await supabase.from('submissions').delete().eq('id', id)
  return { error }
}
