import { useCallback, useEffect, useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  ArrowRight,
  BarChart3,
  Clock3,
  Filter,
  LayoutDashboard,
  RefreshCcw,
  Search,
  Trophy,
  Users,
} from 'lucide-react'
import { weeks, l } from '../data/curriculum'
import { supabase } from '../lib/supabase'
import useAuth from '../hooks/useAuth'
import useLang from '../hooks/useLang'

const DAY_MS = 24 * 60 * 60 * 1000
const totalLessons = weeks.reduce((sum, week) => sum + (week.lessons?.length || 0), 0)
const totalActions = weeks.reduce((sum, week) => sum + (week.actions?.length || 0), 0)
const totalHiddenTopics = weeks.filter((week) => week.hiddenTopic).length

function pick(lang, ko, en) { return lang === 'ko' ? ko : en }
function parseDate(value) { const t = value ? new Date(value).getTime() : 0; return Number.isFinite(t) ? t : 0 }
function maxDate(...v) { return v.reduce((a, b) => (parseDate(b) > parseDate(a) ? b : a), null) }

function formatDate(lang, value) {
  if (!value) return pick(lang, '-', '-')
  return new Date(value).toLocaleString(lang === 'ko' ? 'ko-KR' : 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function resolveQuizLabel(lang, quizType, quizId) {
  if (quizType === 'weekly') return pick(lang, `W${quizId} Test`, `W${quizId} Test`)
  for (const week of weeks) {
    const lesson = week.lessons.find((item) => item.id === quizId)
    if (lesson) return l(lesson.title, lang)
  }
  return String(quizId)
}

function getLearnerStage(row) {
  if (row.isAdmin) return 'admin'
  if (row.weeklyPassedCount >= weeks.length || row.articlePassedCount >= totalLessons) return 'completed'
  if (row.progressPct === 0 && row.quizAttempts === 0 && row.completedActions === 0) return 'not-started'
  if (row.lastActivityTs > 0 && Date.now() - row.lastActivityTs > 7 * DAY_MS) return 'stalled'
  return 'active'
}

function stageBadge(lang, stage) {
  const map = {
    admin: { label: pick(lang, '관리자', 'Admin'), cls: 'bg-[rgba(87,65,216,0.12)] text-[#a78bfa]' },
    completed: { label: pick(lang, '수료', 'Done'), cls: 'bg-[rgba(74,222,128,0.12)] text-[#4ADE80]' },
    stalled: { label: pick(lang, '정체', 'Stalled'), cls: 'bg-[rgba(248,113,113,0.12)] text-[#FCA5A5]' },
    'not-started': { label: pick(lang, '대기', 'Waiting'), cls: 'bg-[rgba(255,255,255,0.04)] text-white/40' },
    active: { label: pick(lang, '진행', 'Active'), cls: 'bg-[rgba(87,65,216,0.10)] text-[#a78bfa]' },
  }
  const m = map[stage] || map.active
  return <span className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-bold ${m.cls}`}>{m.label}</span>
}

function buildLearnerRows(profiles = [], progressRows = [], quizRows = []) {
  const profileMap = new Map(profiles.map((r) => [r.id, r]))
  const progressMap = new Map(progressRows.map((r) => [r.id, r]))
  const quizMap = new Map()

  for (const r of quizRows) {
    const b = quizMap.get(r.user_id) || { attempts: 0, articlePassedIds: new Set(), weeklyPassedIds: new Set(), lastQuizAt: null, recentAttempts: [], totalScore: 0, totalQuestions: 0 }
    b.attempts += 1
    b.totalScore += r.score
    b.totalQuestions += r.total
    b.lastQuizAt = maxDate(b.lastQuizAt, r.attempted_at)
    b.recentAttempts.push({ quizType: r.quiz_type, quizId: String(r.quiz_id), score: r.score, total: r.total, passed: r.passed, attemptedAt: r.attempted_at })
    if (r.passed && r.quiz_type === 'article') b.articlePassedIds.add(r.quiz_id)
    if (r.passed && r.quiz_type === 'weekly') b.weeklyPassedIds.add(String(r.quiz_id))
    quizMap.set(r.user_id, b)
  }

  const allIds = new Set([...profiles.map((r) => r.id), ...progressRows.map((r) => r.id), ...quizRows.map((r) => r.user_id)])

  return [...allIds].map((id) => {
    const profile = profileMap.get(id) || {}
    const progress = progressMap.get(id) || {}
    const quiz = quizMap.get(id) || { attempts: 0, articlePassedIds: new Set(), weeklyPassedIds: new Set(), lastQuizAt: null, recentAttempts: [], totalScore: 0, totalQuestions: 0 }
    const completedLessonIds = progress.completed_lessons || []
    const completedActionIds = progress.completed_actions || []
    const readHiddenTopicIds = progress.read_hidden_topics || []
    const progressPct = totalLessons > 0 ? Math.round((completedLessonIds.length / totalLessons) * 100) : 0
    const currentWeek = Math.min(Math.max(progress.current_week || 1, 1), weeks.length)
    const email = profile.email || ''
    const displayName = profile.display_name || email.split('@')[0] || `user-${String(id).slice(0, 6)}`
    const avgScore = quiz.totalQuestions > 0 ? Math.round((quiz.totalScore / quiz.totalQuestions) * 100) : 0

    return {
      id, displayName, email, lang: profile.lang || 'ko', isAdmin: !!profile.is_admin,
      currentWeek, progressPct,
      completedLessons: completedLessonIds.length, completedActions: completedActionIds.length, readHiddenTopics: readHiddenTopicIds.length,
      articlePassedCount: [...quiz.articlePassedIds].length, weeklyPassedCount: [...quiz.weeklyPassedIds].length,
      quizAttempts: quiz.attempts, avgScore,
      lastActivityAt: maxDate(profile.updated_at, progress.updated_at, quiz.lastQuizAt, profile.created_at),
      lastActivityTs: parseDate(maxDate(profile.updated_at, progress.updated_at, quiz.lastQuizAt, profile.created_at)),
      createdAt: profile.created_at,
      completedLessonIds, completedActionIds, readHiddenTopicIds,
      articlePassedIds: [...quiz.articlePassedIds], weeklyPassedIds: [...quiz.weeklyPassedIds],
      recentQuizAttempts: [...quiz.recentAttempts].sort((a, b) => parseDate(b.attemptedAt) - parseDate(a.attemptedAt)),
    }
  })
}

/* ── Shared UI ── */
function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="flex min-w-[130px] items-center gap-2 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-3 py-2">
      <Filter size={12} className="text-white/40" />
      <select value={value} onChange={(e) => onChange(e.target.value)} className="bg-transparent text-[12px] font-medium text-white/92 outline-none">
        {options.map((o) => <option key={o.value} value={o.value} className="bg-[#1a1a1f] text-white">{o.label}</option>)}
      </select>
    </label>
  )
}

/* ── Main ── */
export default function Admin() {
  const { isAdmin, supabaseEnabled } = useAuth()
  const { lang } = useLang()
  const [tab, setTab] = useState('dashboard')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [weekFilter, setWeekFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(null)

  const CACHE_KEY = 'ok-admin-data'
  const CACHE_TTL = 5 * 60 * 1000
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [rawQuizRows, setRawQuizRows] = useState([])
  const [rows, setRows] = useState(() => {
    try { const c = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null'); if (c && Date.now() - c.ts < CACHE_TTL) return c.rows } catch {} return []
  })

  const loadAdminData = useCallback(async (force = false) => {
    if (!supabaseEnabled || !supabase) { setRows([]); setError(''); return }
    if (!force) {
      try { const c = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null'); if (c && Date.now() - c.ts < CACHE_TTL && c.rows.length > 0) { setRows(c.rows); setRawQuizRows(c.quiz || []); return } } catch {}
    }
    setLoading(true); setError('')
    try {
      const [pRes, prRes, qRes] = await Promise.all([
        supabase.from('profiles').select('id, display_name, avatar_url, lang, email, is_admin, created_at, updated_at').order('created_at', { ascending: false }),
        supabase.from('user_progress').select('id, completed_lessons, completed_actions, read_hidden_topics, current_week, updated_at'),
        supabase.from('quiz_results').select('user_id, quiz_type, quiz_id, score, total, passed, attempted_at'),
      ])
      const qErr = pRes.error || prRes.error || qRes.error
      if (qErr) { setRows([]); setError(`[${pRes.error ? 'profiles' : prRes.error ? 'user_progress' : 'quiz_results'}] ${qErr.message || JSON.stringify(qErr)}`); return }
      const built = buildLearnerRows(pRes.data || [], prRes.data || [], qRes.data || [])
      setRows(built); setRawQuizRows(qRes.data || [])
      try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ rows: built, quiz: qRes.data || [], ts: Date.now() })) } catch {}
    } catch (e) { setRows([]); setError(e?.message || 'unknown') } finally { setLoading(false) }
  }, [supabaseEnabled])

  useEffect(() => { if (isAdmin) void loadAdminData(false) }, [isAdmin, loadAdminData])

  const summary = useMemo(() => {
    const total = rows.length
    const active = rows.filter((r) => r.progressPct > 0 || r.quizAttempts > 0).length
    const avg = total > 0 ? Math.round(rows.reduce((s, r) => s + r.progressPct, 0) / total) : 0
    const tests = rows.reduce((s, r) => s + r.weeklyPassedCount, 0)
    const stalled = rows.filter((r) => getLearnerStage(r) === 'stalled').length
    return { total, active, avg, tests, stalled }
  }, [rows])

  const statusOptions = useMemo(() => [
    { value: 'all', label: pick(lang, '전체', 'All') },
    { value: 'active', label: pick(lang, '진행', 'Active') },
    { value: 'stalled', label: pick(lang, '정체', 'Stalled') },
    { value: 'completed', label: pick(lang, '수료', 'Done') },
    { value: 'not-started', label: pick(lang, '대기', 'Waiting') },
  ], [lang])

  const weekOptions = useMemo(() => [
    { value: 'all', label: pick(lang, '전체', 'All') },
    ...weeks.map((w) => ({ value: String(w.id), label: `W${w.id}` })),
  ], [lang])

  const filtered = useMemo(() => {
    const kw = search.trim().toLowerCase()
    return rows.filter((r) => {
      if (kw && !r.displayName.toLowerCase().includes(kw) && !r.email.toLowerCase().includes(kw)) return false
      if (statusFilter !== 'all' && getLearnerStage(r) !== statusFilter) return false
      if (weekFilter !== 'all' && r.currentWeek !== Number(weekFilter)) return false
      return true
    }).sort((a, b) => b.lastActivityTs - a.lastActivityTs || b.progressPct - a.progressPct)
  }, [rows, search, statusFilter, weekFilter])

  // Analytics: quiz difficulty
  const quizAnalytics = useMemo(() => {
    const byQuiz = new Map()
    for (const r of rawQuizRows) {
      const key = `${r.quiz_type}:${r.quiz_id}`
      const b = byQuiz.get(key) || { quizType: r.quiz_type, quizId: r.quiz_id, attempts: 0, passes: 0, totalScore: 0, totalQuestions: 0 }
      b.attempts += 1
      b.totalScore += r.score
      b.totalQuestions += r.total
      if (r.passed) b.passes += 1
      byQuiz.set(key, b)
    }
    return [...byQuiz.values()]
      .map((b) => ({ ...b, passRate: b.attempts > 0 ? Math.round((b.passes / b.attempts) * 100) : 0, avgScore: b.totalQuestions > 0 ? Math.round((b.totalScore / b.totalQuestions) * 100) : 0 }))
      .sort((a, b) => a.passRate - b.passRate)
  }, [rawQuizRows])

  const weekDistribution = useMemo(() => {
    return weeks.map((w) => ({ weekId: w.id, title: l(w.title, lang), count: rows.filter((r) => r.currentWeek === w.id).length }))
  }, [rows, lang])

  const selectedRow = filtered.find((r) => r.id === selectedId) || null

  if (supabaseEnabled && !isAdmin) return <Navigate to="/dashboard" replace />

  const tabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: pick(lang, '대시보드', 'Dashboard') },
    { id: 'leaderboard', icon: Trophy, label: pick(lang, '리더보드', 'Leaderboard') },
    { id: 'analytics', icon: BarChart3, label: pick(lang, '분석', 'Analytics') },
  ]

  return (
    <div className="mx-auto max-w-7xl">
      <section className="rounded-2xl bg-[#101114] text-white p-5 md:p-8">
        {/* Header */}
        <header className="flex items-center justify-between gap-4">
          <h1 className="text-[24px] font-[800] tracking-[-0.05em] text-white/92 md:text-[28px]">
            {pick(lang, '운영 콘솔', 'Admin Console')}
          </h1>
          <button onClick={() => void loadAdminData(true)} className="inline-flex items-center justify-center rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.06)] text-white/66 hover:bg-[rgba(255,255,255,0.1)] transition-colors px-3 py-2 text-[11px]" disabled={loading}>
            <RefreshCcw size={13} className={loading ? 'animate-spin' : ''} />
          </button>
        </header>

        {/* Summary row */}
        <div className="mt-4 flex flex-wrap gap-5 text-[12px]">
          {[
            { v: summary.total, l: pick(lang, '전체', 'Total') },
            { v: summary.active, l: pick(lang, '학습 중', 'Active') },
            { v: `${summary.avg}%`, l: pick(lang, '평균', 'Avg') },
            { v: summary.tests, l: pick(lang, '테스트', 'Tests') },
            { v: summary.stalled, l: pick(lang, '정체', 'Stalled'), warn: summary.stalled > 0 },
          ].map((s) => (
            <div key={s.l} className="flex items-baseline gap-1.5">
              <span className={`text-[20px] font-[800] tabular-nums ${s.warn ? 'text-[#FCA5A5]' : 'text-white/92'}`}>{s.v}</span>
              <span className="text-white/66">{s.l}</span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-5 flex gap-1 border-b border-[rgba(255,255,255,0.06)]">
          {tabs.map((t) => {
            const Icon = t.icon
            const active = tab === t.id
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-[12px] font-semibold transition-colors border-b-2 -mb-px ${
                  active ? 'border-[#5741d8] text-[#a78bfa]' : 'border-transparent text-white/40 hover:text-white/66'
                }`}>
                <Icon size={14} />
                <span>{t.label}</span>
              </button>
            )
          })}
        </div>

        {error && (
          <div className="mt-4 rounded-xl bg-[rgba(248,113,113,0.08)] px-4 py-3 text-[13px] text-[#FCA5A5]">{error}</div>
        )}

        {loading ? (
          <div className="py-16 text-center">
            <RefreshCcw size={18} className="mx-auto animate-spin text-white/66" />
          </div>
        ) : (
          <>
            {/* ─── Dashboard Tab ─── */}
            {tab === 'dashboard' && (
              <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
                <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] overflow-hidden">
                  <div className="border-b border-[rgba(255,255,255,0.06)] px-5 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="flex flex-1 items-center gap-2 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-3 py-2 min-w-[160px] max-w-[280px]">
                        <Search size={13} className="text-white/40" />
                        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={pick(lang, '검색', 'Search')}
                          className="w-full bg-transparent text-[12px] text-white/92 placeholder:text-white/40 outline-none" />
                      </label>
                      <FilterSelect label={pick(lang, '상태', 'Status')} value={statusFilter} onChange={setStatusFilter} options={statusOptions} />
                      <FilterSelect label={pick(lang, '주차', 'Week')} value={weekFilter} onChange={setWeekFilter} options={weekOptions} />
                      <span className="text-[11px] text-white/40 tabular-nums">{filtered.length}</span>
                    </div>
                  </div>
                  <div className="divide-y divide-[rgba(255,255,255,0.06)] max-h-[600px] overflow-y-auto">
                    {filtered.map((row) => (
                      <button key={row.id} type="button" onClick={() => setSelectedId(row.id)}
                        className={`flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors ${row.id === selectedId ? 'bg-[rgba(87,65,216,0.08)]' : 'hover:bg-[rgba(255,255,255,0.03)]'}`}>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-[13px] font-semibold text-white/92">{row.displayName}</p>
                            {stageBadge(lang, getLearnerStage(row))}
                          </div>
                          <p className="mt-0.5 text-[11px] text-white/66">W{row.currentWeek} · {row.articlePassedCount}/{totalLessons} quiz · {row.weeklyPassedCount}/{weeks.length} test</p>
                        </div>
                        <div className="shrink-0 w-20 text-right">
                          <p className="text-[16px] font-[800] tabular-nums text-white/92">{row.progressPct}%</p>
                          <div className="mt-1 h-1 rounded-full bg-[rgba(255,255,255,0.08)]">
                            <div className="h-full rounded-full bg-[#5741d8]" style={{ width: `${Math.min(row.progressPct, 100)}%` }} />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sidebar */}
                <aside className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5 xl:sticky xl:top-24 xl:max-h-[calc(100svh-8rem)] xl:overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                  {selectedRow ? (
                    <>
                      <div className="flex items-center gap-2">
                        <h2 className="text-[20px] font-[800] tracking-[-0.04em] text-white/92">{selectedRow.displayName}</h2>
                        {stageBadge(lang, getLearnerStage(selectedRow))}
                      </div>
                      <p className="mt-1 text-[12px] text-white/66">{selectedRow.email || '-'}</p>

                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {[
                          { l: 'Week', v: selectedRow.currentWeek },
                          { l: pick(lang, '진행률', 'Progress'), v: `${selectedRow.progressPct}%` },
                          { l: pick(lang, '퀴즈', 'Quiz'), v: `${selectedRow.articlePassedCount}/${totalLessons}` },
                          { l: pick(lang, '테스트', 'Test'), v: `${selectedRow.weeklyPassedCount}/${weeks.length}` },
                          { l: pick(lang, '실습', 'Action'), v: `${selectedRow.completedActions}/${totalActions}` },
                          { l: pick(lang, '평균점수', 'Avg'), v: `${selectedRow.avgScore}%` },
                        ].map((s) => (
                          <div key={s.l} className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-3 py-2">
                            <p className="text-[9px] uppercase tracking-[0.14em] text-white/40">{s.l}</p>
                            <p className="mt-1 text-[18px] font-[800] tabular-nums text-white/92">{s.v}</p>
                          </div>
                        ))}
                      </div>

                      <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-white/40">{pick(lang, '퀴즈 · 테스트 기록', 'Quiz & Test History')}</p>
                      <div className="mt-2 space-y-1">
                        {selectedRow.recentQuizAttempts.length > 0 ? selectedRow.recentQuizAttempts.map((a, i) => (
                          <div key={`${a.quizType}-${a.quizId}-${i}`} className="flex items-center justify-between gap-2 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-3 py-2">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className={`rounded px-1 py-0.5 text-[8px] font-bold uppercase ${a.quizType === 'weekly' ? 'bg-[rgba(139,92,246,0.14)] text-[#A78BFA]' : 'bg-[rgba(87,65,216,0.12)] text-[#a78bfa]'}`}>
                                  {a.quizType === 'weekly' ? 'TEST' : 'QUIZ'}
                                </span>
                                <p className="truncate text-[11px] font-medium text-white/92">{resolveQuizLabel(lang, a.quizType, a.quizId)}</p>
                              </div>
                              <p className="text-[9px] text-white/40">{formatDate(lang, a.attemptedAt)}</p>
                            </div>
                            <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold tabular-nums ${a.passed ? 'bg-[rgba(74,222,128,0.12)] text-[#4ADE80]' : 'bg-[rgba(248,113,113,0.10)] text-[#FCA5A5]'}`}>
                              {a.score}/{a.total}
                            </span>
                          </div>
                        )) : <p className="text-[11px] text-white/40">{pick(lang, '기록 없음', 'No records')}</p>}
                      </div>
                    </>
                  ) : (
                    <p className="py-8 text-center text-[12px] text-white/40">{pick(lang, '학습자를 선택해봐요', 'Select a learner')}</p>
                  )}
                </aside>
              </div>
            )}

            {/* ─── Leaderboard Tab ─── */}
            {tab === 'leaderboard' && (
              <div className="mt-5 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] overflow-x-auto">
                <table className="min-w-full text-left text-[12px]">
                  <thead className="border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
                    <tr className="text-[10px] uppercase tracking-[0.16em] text-white/40">
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">{pick(lang, '학습자', 'Learner')}</th>
                      <th className="px-4 py-3">Week</th>
                      <th className="px-4 py-3">{pick(lang, '진행률', 'Progress')}</th>
                      <th className="px-4 py-3">{pick(lang, '퀴즈', 'Quiz')}</th>
                      <th className="px-4 py-3">{pick(lang, '테스트', 'Test')}</th>
                      <th className="px-4 py-3">{pick(lang, '실습', 'Action')}</th>
                      <th className="px-4 py-3">{pick(lang, '히든', 'Hidden')}</th>
                      <th className="px-4 py-3">{pick(lang, '평균점수', 'Avg Score')}</th>
                      <th className="px-4 py-3">{pick(lang, '응시', 'Attempts')}</th>
                      <th className="px-4 py-3">{pick(lang, '최근활동', 'Last Active')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...rows].sort((a, b) => b.progressPct - a.progressPct || b.weeklyPassedCount - a.weeklyPassedCount).map((row, idx) => (
                      <tr key={row.id} className={`border-t border-[rgba(255,255,255,0.06)] ${idx % 2 === 0 ? '' : 'bg-[rgba(255,255,255,0.015)]'} hover:bg-[rgba(87,65,216,0.06)]`}>
                        <td className="px-4 py-3 tabular-nums text-white/40">{idx + 1}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 min-w-[160px]">
                            <p className="font-semibold text-white/92">{row.displayName}</p>
                            {stageBadge(lang, getLearnerStage(row))}
                          </div>
                          <p className="text-[10px] text-white/40">{row.email || '-'}</p>
                        </td>
                        <td className="px-4 py-3 tabular-nums font-semibold text-white/92">{row.currentWeek}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 min-w-[100px]">
                            <span className="tabular-nums font-[700] text-white/92">{row.progressPct}%</span>
                            <div className="flex-1 h-1 rounded-full bg-[rgba(255,255,255,0.08)]">
                              <div className="h-full rounded-full bg-[#5741d8]" style={{ width: `${row.progressPct}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 tabular-nums text-white/66">{row.articlePassedCount}/{totalLessons}</td>
                        <td className="px-4 py-3 tabular-nums text-white/66">{row.weeklyPassedCount}/{weeks.length}</td>
                        <td className="px-4 py-3 tabular-nums text-white/66">{row.completedActions}/{totalActions}</td>
                        <td className="px-4 py-3 tabular-nums text-white/66">{row.readHiddenTopics}/{totalHiddenTopics}</td>
                        <td className="px-4 py-3 tabular-nums text-white/66">{row.avgScore}%</td>
                        <td className="px-4 py-3 tabular-nums text-white/40">{row.quizAttempts}</td>
                        <td className="px-4 py-3 text-white/40 text-[11px]">{formatDate(lang, row.lastActivityAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ─── Analytics Tab ─── */}
            {tab === 'analytics' && (
              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                {/* Week distribution */}
                <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">{pick(lang, '주차별 분포', 'Week Distribution')}</p>
                  <h3 className="mt-2 text-[18px] font-[700] text-white/92">{pick(lang, '학습자가 어디에 있는지', 'Where learners are')}</h3>
                  <div className="mt-4 space-y-2">
                    {weekDistribution.map((w) => {
                      const max = Math.max(1, ...weekDistribution.map((x) => x.count))
                      return (
                        <div key={w.weekId} className="flex items-center gap-3">
                          <span className="shrink-0 w-8 text-[11px] font-semibold text-white/66">W{w.weekId}</span>
                          <div className="flex-1 h-5 rounded bg-[rgba(255,255,255,0.08)] overflow-hidden">
                            <div className="h-full rounded bg-[#5741d8] transition-all" style={{ width: `${(w.count / max) * 100}%` }} />
                          </div>
                          <span className="shrink-0 w-6 text-right text-[12px] font-[700] tabular-nums text-white/92">{w.count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Stage distribution */}
                <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">{pick(lang, '상태 분포', 'Stage Distribution')}</p>
                  <h3 className="mt-2 text-[18px] font-[700] text-white/92">{pick(lang, '학습자 상태 현황', 'Learner status overview')}</h3>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {[
                      { stage: 'active', color: '#5741d8' },
                      { stage: 'stalled', color: '#F87171' },
                      { stage: 'completed', color: '#4ADE80' },
                      { stage: 'not-started', color: '#6B7280' },
                    ].map((s) => {
                      const count = rows.filter((r) => getLearnerStage(r) === s.stage).length
                      return (
                        <div key={s.stage} className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                            {stageBadge(lang, s.stage)}
                          </div>
                          <p className="mt-2 text-[24px] font-[800] tabular-nums text-white/92">{count}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Quiz difficulty */}
                <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5 lg:col-span-2">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">{pick(lang, '퀴즈 난이도', 'Quiz Difficulty')}</p>
                  <h3 className="mt-2 text-[18px] font-[700] text-white/92">{pick(lang, '통과율이 낮은 퀴즈부터', 'Hardest quizzes first')}</h3>
                  {quizAnalytics.length > 0 ? (
                    <div className="mt-4 space-y-1.5">
                      {quizAnalytics.map((q) => (
                        <div key={`${q.quizType}:${q.quizId}`} className="flex items-center gap-3 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-2.5">
                          <span className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${q.quizType === 'weekly' ? 'bg-[rgba(139,92,246,0.14)] text-[#A78BFA]' : 'bg-[rgba(87,65,216,0.12)] text-[#a78bfa]'}`}>
                            {q.quizType === 'weekly' ? 'TEST' : 'QUIZ'}
                          </span>
                          <p className="min-w-0 flex-1 truncate text-[12px] font-medium text-white/92">{resolveQuizLabel(lang, q.quizType, q.quizId)}</p>
                          <div className="shrink-0 flex items-center gap-3 text-[11px] tabular-nums">
                            <span className="text-white/40">{q.attempts}{pick(lang, '회', '')}</span>
                            <span className="text-white/66">{pick(lang, '평균', 'avg')} {q.avgScore}%</span>
                            <span className={`font-bold ${q.passRate >= 70 ? 'text-[#4ADE80]' : q.passRate >= 40 ? 'text-[#FBBF24]' : 'text-[#FCA5A5]'}`}>
                              {q.passRate}% {pick(lang, '통과', 'pass')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 text-[12px] text-white/40">{pick(lang, '퀴즈 데이터 없음', 'No quiz data yet')}</p>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}
