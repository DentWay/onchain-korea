import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const fallback = {
  total_users: 0,
  week1_completions: 0,
  week2_completions: 0,
  week3_completions: 0,
  week4_completions: 0,
  certificate_count: 0,
}

export default function useStats() {
  const [stats, setStats] = useState(fallback)

  useEffect(() => {
    let cancelled = false

    if (!supabase) return undefined

    supabase
      .from('enrollment_stats')
      .select('*')
      .eq('id', 1)
      .single()
      .then(({ data }) => {
        if (!cancelled && data) setStats(data)
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [])

  return { stats }
}
