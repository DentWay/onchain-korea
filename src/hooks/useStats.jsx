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
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!supabase) { setLoaded(true); return }

    supabase
      .from('enrollment_stats')
      .select('*')
      .eq('id', 1)
      .single()
      .then(({ data }) => {
        if (data) setStats(data)
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [])

  return { stats, loaded }
}
