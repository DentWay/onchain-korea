import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Clock3,
  Filter,
  Gauge,
  GraduationCap,
  LayoutDashboard,
  RefreshCcw,
  Search,
  Target,
  Trophy,
  Users,
} from 'lucide-react'
import { weeks, l } from '../data/curriculum'
import { getWeekPlan } from '../data/programBlueprint'
import { articleQuizzes, weeklyTests } from '../data/quizzes'
import { supabase } from '../lib/supabase'
import useAuth from '../hooks/useAuth'
import useLang from '../hooks/useLang'

const DAY_MS = 24 * 60 * 60 * 1000
const ARTICLE_QUIZ_TARGET = 10
const totalLessons = weeks.reduce((sum, week) => sum + (week.lessons?.length || 0), 0)
const totalActions = weeks.reduce((sum, week) => sum + (week.actions?.length || 0), 0)
const totalHiddenTopics = weeks.filter((week) => week.hiddenTopic).length
const ADMIN_TAB_IDS = new Set(['dashboard', 'leaderboard', 'analytics'])

function pick(lang, ko, en) { return lang === 'ko' ? ko : en }
function parseDate(value) { const t = value ? new Date(value).getTime() : 0; return Number.isFinite(t) ? t : 0 }
function maxDate(...v) { return v.reduce((a, b) => (parseDate(b) > parseDate(a) ? b : a), null) }
function ratio(part, total) { return total > 0 ? Math.round((part / total) * 100) : 0 }
function clamp(value) { return Math.max(0, Math.min(100, value)) }
function resolveAdminTab(value) { return ADMIN_TAB_IDS.has(value) ? value : 'dashboard' }

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

function Meter({ value, color = '#5741d8', height = 6 }) {
  return (
    <div className="w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]" style={{ height }}>
      <div className="h-full rounded-full transition-all duration-300" style={{ width: `${clamp(value)}%`, background: color }} />
    </div>
  )
}

/* ── Main ── */
export default function Admin() {
  const { isAdmin, supabaseEnabled } = useAuth()
  const { lang } = useLang()
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [weekFilter, setWeekFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(null)
  const tab = resolveAdminTab(searchParams.get('view'))

  const CACHE_KEY = 'ok-admin-data'
  const CACHE_TTL = 5 * 60 * 1000
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [lastLoadedAt, setLastLoadedAt] = useState(() => Date.now())
  const [rawQuizRows, setRawQuizRows] = useState([])
  const [rows, setRows] = useState(() => {
    try { const c = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null'); if (c && Date.now() - c.ts < CACHE_TTL) return c.rows } catch {} return []
  })

  const loadAdminData = useCallback(async (force = false) => {
    if (!supabaseEnabled || !supabase) { setRows([]); setError(''); return }
    if (!force) {
      try {
        const c = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null')
        if (c && Date.now() - c.ts < CACHE_TTL && c.rows.length > 0) {
          setRows(c.rows)
          setRawQuizRows(c.quiz || [])
          setLastLoadedAt(c.ts || Date.now())
          return
        }
      } catch {}
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
      const nowTs = Date.now()
      setLastLoadedAt(nowTs)
      try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ rows: built, quiz: qRes.data || [], ts: nowTs })) } catch {}
    } catch (e) { setRows([]); setError(e?.message || 'unknown') } finally { setLoading(false) }
  }, [supabaseEnabled])

  useEffect(() => { if (isAdmin) void loadAdminData(false) }, [isAdmin, loadAdminData])

  useEffect(() => {
    const currentView = searchParams.get('view')
    const resolvedView = resolveAdminTab(currentView)
    if (currentView !== resolvedView) {
      const nextParams = new URLSearchParams(searchParams)
      nextParams.set('view', resolvedView)
      setSearchParams(nextParams, { replace: true })
    }
  }, [searchParams, setSearchParams])

  const setTab = useCallback((nextTab) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('view', resolveAdminTab(nextTab))
    setSearchParams(nextParams, { replace: true })
  }, [searchParams, setSearchParams])

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

  const contentAudit = useMemo(() => {
    const weeksAudit = weeks.map((week) => {
      const weekPlan = getWeekPlan(week.id)
      const lessonQuizCounts = week.lessons.map((lesson) => articleQuizzes[lesson.id]?.length || 0)
      const articleQuizReadyCount = lessonQuizCounts.filter((count) => count >= ARTICLE_QUIZ_TARGET).length
      const weeklyTestQuestionCount = weeklyTests[week.id]?.length || 0
      const requiredWeeklyQuestions = week.weeklyTest?.questionCount || weekPlan?.weeklyTest?.questionCount || 0
      const plannedReplacementCount = weekPlan?.articles?.filter((article) => article.status === 'planned-replace').length || 0
      const hasStructure = (week.lessons?.length || 0) === 3 && (week.actions?.length || 0) >= 1 && Boolean(week.hiddenTopic) && requiredWeeklyQuestions > 0
      const quizzesReady = articleQuizReadyCount === (week.lessons?.length || 0) && weeklyTestQuestionCount >= requiredWeeklyQuestions

      let status = 'review'
      if (!hasStructure) status = 'missing'
      else if (plannedReplacementCount > 0) status = 'planned'
      else if (quizzesReady) status = 'ready'

      return {
        weekId: week.id,
        title: l(week.title, lang),
        lessons: week.lessons?.length || 0,
        actions: week.actions?.length || 0,
        hasHidden: Boolean(week.hiddenTopic),
        requiredWeeklyQuestions,
        weeklyTestQuestionCount,
        articleQuizReadyCount,
        plannedReplacementCount,
        phase: week.id <= 4 ? pick(lang, '기본 트랙', 'Core track') : pick(lang, '심화 트랙', 'Advanced track'),
        status,
      }
    })

    const readyWeeks = weeksAudit.filter((week) => week.status === 'ready').length
    const reviewWeeks = weeksAudit.filter((week) => week.status === 'review').length
    const plannedWeeks = weeksAudit.filter((week) => week.status === 'planned').length
    const articleQuizReadyTotal = weeksAudit.reduce((sum, week) => sum + week.articleQuizReadyCount, 0)
    const weeklyTestsReady = weeksAudit.filter((week) => week.weeklyTestQuestionCount >= week.requiredWeeklyQuestions && week.requiredWeeklyQuestions > 0).length

    return {
      weeksAudit,
      readyWeeks,
      reviewWeeks,
      plannedWeeks,
      articleQuizReadyTotal,
      weeklyTestsReady,
    }
  }, [lang])

  const dashboardInsights = useMemo(() => {
    const now = Date.now()
    const startedRows = rows.filter((r) => r.progressPct > 0 || r.quizAttempts > 0 || r.completedActions > 0)
    const activeRows = rows.filter((r) => r.lastActivityTs > 0 && now - r.lastActivityTs <= 7 * DAY_MS)
    const completedRows = rows.filter((r) => getLearnerStage(r) === 'completed')
    const stalledRows = rows.filter((r) => getLearnerStage(r) === 'stalled')
    const lowScoreRows = rows.filter((r) => r.avgScore > 0 && r.avgScore < 70)
    const attentionIds = new Set([...stalledRows.map((r) => r.id), ...lowScoreRows.map((r) => r.id)])
    const attentionRows = rows.filter((r) => attentionIds.has(r.id))
    const startedCount = startedRows.length
    const firstQuizPassedRows = rows.filter((r) => r.articlePassedCount > 0)
    const firstWeeklyPassedRows = rows.filter((r) => r.weeklyPassedCount > 0)

    const funnel = [
      { key: 'registered', label: pick(lang, '등록', 'Registered'), count: rows.length, color: '#7c86ff' },
      { key: 'started', label: pick(lang, '시작', 'Started'), count: startedCount, color: '#5741d8' },
      { key: 'quiz', label: pick(lang, '아티클 퀴즈 통과', 'Article Quiz Passed'), count: firstQuizPassedRows.length, color: '#4f74ff' },
      { key: 'weekly', label: pick(lang, '주간 테스트 통과', 'Weekly Test Passed'), count: firstWeeklyPassedRows.length, color: '#8b5cf6' },
      { key: 'done', label: pick(lang, '수료', 'Completed'), count: completedRows.length, color: '#4ADE80' },
    ].map((item, index, arr) => ({
      ...item,
      pctFromTop: ratio(item.count, arr[0].count),
      pctFromPrev: index === 0 ? 100 : ratio(item.count, arr[index - 1].count),
    }))

    const bottlenecks = weeks.map((week) => {
      const members = rows.filter((r) => r.currentWeek === week.id)
      const stalled = members.filter((r) => getLearnerStage(r) === 'stalled').length
      const lowScore = members.filter((r) => r.avgScore > 0 && r.avgScore < 70).length
      const avgProgress = members.length > 0 ? Math.round(members.reduce((sum, r) => sum + r.progressPct, 0) / members.length) : 0
      return {
        weekId: week.id,
        title: l(week.title, lang),
        learners: members.length,
        stalled,
        lowScore,
        attention: stalled + lowScore,
        avgProgress,
      }
    })
      .filter((week) => week.learners > 0)
      .sort((a, b) => b.attention - a.attention || b.learners - a.learners)

    const riskQueue = rows
      .map((row) => {
        const reasons = []
        const stage = getLearnerStage(row)
        if (stage === 'stalled') reasons.push(pick(lang, '7일 이상 정체', 'Stalled 7d+'))
        if (stage === 'not-started') reasons.push(pick(lang, '미시작', 'Not started'))
        if (row.avgScore > 0 && row.avgScore < 70) reasons.push(pick(lang, `평균 ${row.avgScore}%`, `Avg ${row.avgScore}%`))
        if (row.quizAttempts >= 3 && row.articlePassedCount === 0) reasons.push(pick(lang, '퀴즈 반복 실패', 'Repeated quiz failures'))
        return { ...row, reasons, stage }
      })
      .filter((row) => row.reasons.length > 0)
      .sort((a, b) => {
        if (a.stage === 'stalled' && b.stage !== 'stalled') return -1
        if (b.stage === 'stalled' && a.stage !== 'stalled') return 1
        return a.lastActivityTs - b.lastActivityTs || a.avgScore - b.avgScore
      })
      .slice(0, 6)

    return {
      activeRows,
      attentionRows,
      completedRows,
      funnel,
      bottlenecks,
      riskQueue,
      lowPassQuizzes: quizAnalytics.slice(0, 5),
      weekMax: Math.max(1, ...weekDistribution.map((week) => week.count)),
    }
  }, [rows, quizAnalytics, weekDistribution, lang])

  const selectedRow = filtered.find((r) => r.id === selectedId) || null

  useEffect(() => {
    if (filtered.length === 0) {
      if (selectedId !== null) setSelectedId(null)
      return
    }
    if (!selectedId || !filtered.some((row) => row.id === selectedId)) {
      setSelectedId(filtered[0].id)
    }
  }, [filtered, selectedId])

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
          <div>
            <h1 className="text-[24px] font-[800] tracking-[-0.05em] text-white/92 md:text-[28px]">
              {pick(lang, '운영 콘솔', 'Admin Console')}
            </h1>
            <div className="mt-2 inline-flex items-center gap-2 text-[11px] text-white/46">
              <Clock3 size={12} />
              <span>{pick(lang, '마지막 동기화', 'Last sync')}</span>
              <span className="text-white/70">{formatDate(lang, lastLoadedAt)}</span>
            </div>
          </div>
          <button onClick={() => void loadAdminData(true)} className="inline-flex items-center justify-center rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.06)] text-white/66 hover:bg-[rgba(255,255,255,0.1)] transition-colors px-3 py-2 text-[11px]" disabled={loading}>
            <RefreshCcw size={13} className={loading ? 'animate-spin' : ''} />
          </button>
        </header>

        {/* Summary row */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              icon: Users,
              label: pick(lang, '전체 학습자', 'Learners'),
              value: rows.length,
              meta: pick(lang, '관리 대상 전체', 'Total tracked'),
              tone: 'text-white/92',
            },
            {
              icon: Gauge,
              label: pick(lang, '최근 7일 활성', 'Active 7d'),
              value: dashboardInsights.activeRows.length,
              meta: `${ratio(dashboardInsights.activeRows.length, rows.length)}%`,
              tone: 'text-[#A78BFA]',
            },
            {
              icon: AlertTriangle,
              label: pick(lang, '주의 필요', 'Needs Attention'),
              value: dashboardInsights.attentionRows.length,
              meta: pick(lang, '정체 또는 저득점', 'Stalled or low score'),
              tone: dashboardInsights.attentionRows.length > 0 ? 'text-[#FCA5A5]' : 'text-white/92',
            },
            {
              icon: GraduationCap,
              label: pick(lang, '수료', 'Completed'),
              value: dashboardInsights.completedRows.length,
              meta: `${ratio(dashboardInsights.completedRows.length, rows.length)}%`,
              tone: 'text-[#4ADE80]',
            },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">{item.label}</p>
                    <p className={`mt-2 text-[28px] font-[800] tabular-nums ${item.tone}`}>{item.value}</p>
                  </div>
                  <span className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-2 text-white/50">
                    <Icon size={16} />
                  </span>
                </div>
                <p className="mt-2 text-[11px] text-white/50">{item.meta}</p>
              </div>
            )
          })}
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
              <div className="mt-5 space-y-5">
                <div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
                  <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">{pick(lang, '콘텐츠 구성', 'Program Structure')}</p>
                        <h3 className="mt-2 text-[18px] font-[700] text-white/92">{pick(lang, '8주 운영 규격과 검수 상태를 확인합니다', 'Review the eight-week structure and audit status')}</h3>
                      </div>
                      <span className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-2 text-white/50">
                        <LayoutDashboard size={16} />
                      </span>
                    </div>
                    <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                      {[
                        {
                          label: pick(lang, '준비 완료 주차', 'Ready weeks'),
                          value: `${contentAudit.readyWeeks}/${weeks.length}`,
                          tone: 'text-[#4ADE80]',
                        },
                        {
                          label: pick(lang, '검토 필요 주차', 'Weeks in review'),
                          value: `${contentAudit.reviewWeeks}`,
                          tone: contentAudit.reviewWeeks > 0 ? 'text-[#FBBF24]' : 'text-white/88',
                        },
                        {
                          label: pick(lang, '아티클 퀴즈', 'Article quizzes'),
                          value: `${contentAudit.articleQuizReadyTotal}/${totalLessons}`,
                          tone: 'text-[#A78BFA]',
                        },
                        {
                          label: pick(lang, '주간 테스트', 'Weekly tests'),
                          value: `${contentAudit.weeklyTestsReady}/${weeks.length}`,
                          tone: contentAudit.plannedWeeks > 0 ? 'text-[#FCA5A5]' : 'text-white/88',
                        },
                      ].map((item) => (
                        <div key={item.label} className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-3">
                          <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">{item.label}</p>
                          <p className={`mt-2 text-[22px] font-[800] tabular-nums ${item.tone}`}>{item.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                      {contentAudit.weeksAudit.map((week) => (
                        <div key={week.weekId} className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-3">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-[11px] font-semibold text-white/92">W{week.weekId}</p>
                            <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${week.weekId <= 4 ? 'bg-[rgba(87,65,216,0.12)] text-[#A78BFA]' : 'bg-[rgba(74,222,128,0.12)] text-[#4ADE80]'}`}>
                              {week.phase}
                            </span>
                          </div>
                          <p className="mt-2 text-[13px] font-semibold text-white/86">{week.title}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <span
                              className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                                week.status === 'ready'
                                  ? 'bg-[rgba(74,222,128,0.12)] text-[#4ADE80]'
                                  : week.status === 'planned'
                                    ? 'bg-[rgba(248,113,113,0.12)] text-[#FCA5A5]'
                                    : week.status === 'review'
                                      ? 'bg-[rgba(251,191,36,0.12)] text-[#FBBF24]'
                                      : 'bg-[rgba(255,255,255,0.06)] text-white/56'
                              }`}
                            >
                              {week.status === 'ready'
                                ? pick(lang, '준비 완료', 'Ready')
                                : week.status === 'planned'
                                  ? pick(lang, '교체 예정', 'Planned replace')
                                  : week.status === 'review'
                                    ? pick(lang, '검토 필요', 'Needs review')
                                    : pick(lang, '구성 점검', 'Structure issue')}
                            </span>
                          </div>
                          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-white/58">
                            <div>{pick(lang, `아티클 ${week.lessons}`, `${week.lessons} lessons`)}</div>
                            <div>{pick(lang, `실습 ${week.actions}`, `${week.actions} labs`)}</div>
                            <div>{pick(lang, `히든 ${week.hasHidden ? 1 : 0}`, `${week.hasHidden ? 1 : 0} hidden`)}</div>
                            <div>{pick(lang, `테스트 ${week.weeklyTestQuestionCount}/${week.requiredWeeklyQuestions}`, `${week.weeklyTestQuestionCount}/${week.requiredWeeklyQuestions} test Qs`)}</div>
                          </div>
                          <div className="mt-2 text-[11px] text-white/46">
                            {pick(
                              lang,
                              `아티클 퀴즈 ${week.articleQuizReadyCount}/${week.lessons} 완료${week.plannedReplacementCount > 0 ? ` · 교체 예정 ${week.plannedReplacementCount}` : ''}`,
                              `Article quizzes ${week.articleQuizReadyCount}/${week.lessons}${week.plannedReplacementCount > 0 ? ` · ${week.plannedReplacementCount} planned replace` : ''}`
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">{pick(lang, '관리자 바로가기', 'Admin Shortcuts')}</p>
                        <h3 className="mt-2 text-[18px] font-[700] text-white/92">{pick(lang, '자주 쓰는 운영 화면으로 바로 이동합니다', 'Jump to the most-used views')}</h3>
                      </div>
                      <span className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-2 text-white/50">
                        <ArrowRight size={16} />
                      </span>
                    </div>
                    <div className="mt-4 space-y-2">
                      {[
                        { to: '/dashboard', title: pick(lang, '학습자 홈', 'Learner dashboard'), meta: pick(lang, '실제 학습자 화면 기준으로 현재 공개 상태 확인', 'Check the live learner-facing dashboard') },
                        { to: '/week/1', title: pick(lang, 'Week 1 콘텐츠', 'Week 1 content'), meta: pick(lang, '기본 트랙 시작점 검수', 'Review the core-track entry point') },
                        { to: '/week/5', title: pick(lang, 'Week 5 콘텐츠', 'Week 5 content'), meta: pick(lang, '심화 트랙 시작점 검수', 'Review the advanced-track unlock point') },
                        { to: '/hidden', title: pick(lang, '히든 토픽', 'Hidden topics'), meta: pick(lang, '히든 토픽 공개 구조 점검', 'Review hidden-topic visibility') },
                        { to: '/certificate', title: pick(lang, '수료 증명', 'Proof of Attendance'), meta: pick(lang, '수료 조건 및 결과 화면 검수', 'Review proof requirements and result state') },
                      ].map((item) => (
                        <Link key={item.to} to={item.to} className="flex items-center justify-between gap-3 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-3 transition-colors hover:bg-[rgba(255,255,255,0.05)]">
                          <div className="min-w-0">
                            <p className="text-[13px] font-semibold text-white/92">{item.title}</p>
                            <p className="mt-1 text-[11px] text-white/46">{item.meta}</p>
                          </div>
                          <ArrowRight size={15} className="shrink-0 text-white/38" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 2xl:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.95fr)]">
                  <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">{pick(lang, '학습 퍼널', 'Learning Funnel')}</p>
                        <h3 className="mt-2 text-[20px] font-[800] tracking-[-0.04em] text-white/92">{pick(lang, '운영 흐름을 한눈에 확인합니다', 'Review the operating flow at a glance')}</h3>
                      </div>
                      <span className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-2 text-white/50">
                        <Target size={16} />
                      </span>
                    </div>
                    <div className="mt-5 space-y-4">
                      {dashboardInsights.funnel.map((stage) => (
                        <div key={stage.key} className="grid gap-2 md:grid-cols-[minmax(140px,180px)_minmax(0,1fr)_auto] md:items-center">
                          <div>
                            <p className="text-[12px] font-semibold text-white/88">{stage.label}</p>
                            <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/38">{stage.pctFromPrev}% {pick(lang, '전 단계 대비', 'from prev')}</p>
                          </div>
                          <div className="space-y-2">
                            <Meter value={stage.pctFromTop} color={stage.color} height={8} />
                            <div className="flex items-center justify-between text-[11px] text-white/44">
                              <span>{pick(lang, '전체 대비', 'of all')}</span>
                              <span className="tabular-nums">{stage.pctFromTop}%</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[22px] font-[800] tabular-nums text-white/92">{stage.count}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-5">
                    <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">{pick(lang, '병목 주차', 'Bottleneck Weeks')}</p>
                      <h3 className="mt-2 text-[18px] font-[700] text-white/92">{pick(lang, '병목 구간을 먼저 확인합니다', 'Review the friction points first')}</h3>
                      <div className="mt-4 space-y-3">
                        {dashboardInsights.bottlenecks.slice(0, 4).map((week) => (
                          <div key={week.weekId} className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-3">
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <p className="text-[12px] font-semibold text-white/92">W{week.weekId} · {week.title}</p>
                                <p className="mt-1 text-[11px] text-white/44">
                                  {pick(lang, `${week.learners}명 진행 중 · 평균 ${week.avgProgress}%`, `${week.learners} learners · avg ${week.avgProgress}%`)}
                                </p>
                              </div>
                              <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${week.attention > 0 ? 'bg-[rgba(248,113,113,0.12)] text-[#FCA5A5]' : 'bg-[rgba(74,222,128,0.12)] text-[#4ADE80]'}`}>
                                {pick(lang, `주의 ${week.attention}`, `${week.attention} alerts`)}
                              </span>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-white/58">
                              <div>{pick(lang, `정체 ${week.stalled}`, `Stalled ${week.stalled}`)}</div>
                              <div>{pick(lang, `저득점 ${week.lowScore}`, `Low score ${week.lowScore}`)}</div>
                            </div>
                          </div>
                        ))}
                        {dashboardInsights.bottlenecks.length === 0 && (
                          <p className="text-[12px] text-white/40">{pick(lang, '주차 데이터가 없습니다', 'No week bottlenecks yet')}</p>
                        )}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">{pick(lang, '주차 분포', 'Week Distribution')}</p>
                      <div className="mt-4 space-y-2.5">
                        {weekDistribution.map((week) => (
                          <div key={week.weekId} className="flex items-center gap-3">
                            <span className="w-8 shrink-0 text-[11px] font-semibold text-white/58">W{week.weekId}</span>
                            <div className="flex-1">
                              <Meter value={(week.count / dashboardInsights.weekMax) * 100} color="#5741d8" height={7} />
                            </div>
                            <span className="w-8 shrink-0 text-right text-[12px] font-[700] tabular-nums text-white/88">{week.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 2xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                  <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">{pick(lang, '위험군 큐', 'At-risk Queue')}</p>
                        <h3 className="mt-2 text-[18px] font-[700] text-white/92">{pick(lang, '우선 확인 대상 학습자', 'Priority learners to review')}</h3>
                      </div>
                      <span className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-2 text-white/50">
                        <AlertTriangle size={16} />
                      </span>
                    </div>
                    <div className="mt-4 space-y-2">
                      {dashboardInsights.riskQueue.map((row) => (
                        <button
                          key={row.id}
                          type="button"
                          onClick={() => setSelectedId(row.id)}
                          className="flex w-full items-center justify-between gap-3 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-left transition-colors hover:bg-[rgba(255,255,255,0.05)]"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <p className="truncate text-[13px] font-semibold text-white/92">{row.displayName}</p>
                              {stageBadge(lang, row.stage)}
                            </div>
                            <p className="mt-1 truncate text-[11px] text-white/46">{row.reasons.join(' · ')}</p>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="text-[12px] font-semibold tabular-nums text-white/70">W{row.currentWeek}</p>
                            <p className="mt-1 text-[10px] text-white/40">{formatDate(lang, row.lastActivityAt)}</p>
                          </div>
                        </button>
                      ))}
                      {dashboardInsights.riskQueue.length === 0 && (
                        <p className="text-[12px] text-white/40">{pick(lang, '우선 확인 대상이 없습니다', 'No urgent risk queue right now')}</p>
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">{pick(lang, '난도 경고', 'Difficulty Alerts')}</p>
                        <h3 className="mt-2 text-[18px] font-[700] text-white/92">{pick(lang, '통과율 낮은 퀴즈', 'Lowest pass-rate quizzes')}</h3>
                      </div>
                      <span className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-2 text-white/50">
                        <BarChart3 size={16} />
                      </span>
                    </div>
                    <div className="mt-4 space-y-2">
                      {dashboardInsights.lowPassQuizzes.map((quiz) => (
                        <div key={`${quiz.quizType}:${quiz.quizId}`} className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${quiz.quizType === 'weekly' ? 'bg-[rgba(139,92,246,0.14)] text-[#A78BFA]' : 'bg-[rgba(87,65,216,0.12)] text-[#a78bfa]'}`}>
                              {quiz.quizType === 'weekly' ? 'TEST' : 'QUIZ'}
                            </span>
                            <p className="min-w-0 flex-1 truncate text-[12px] font-semibold text-white/88">{resolveQuizLabel(lang, quiz.quizType, quiz.quizId)}</p>
                          </div>
                          <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
                            <div>
                              <p className="text-white/38">{pick(lang, '통과율', 'Pass rate')}</p>
                              <p className={`mt-1 font-[700] tabular-nums ${quiz.passRate >= 70 ? 'text-[#4ADE80]' : quiz.passRate >= 40 ? 'text-[#FBBF24]' : 'text-[#FCA5A5]'}`}>{quiz.passRate}%</p>
                            </div>
                            <div>
                              <p className="text-white/38">{pick(lang, '평균점수', 'Avg score')}</p>
                              <p className="mt-1 font-[700] tabular-nums text-white/88">{quiz.avgScore}%</p>
                            </div>
                            <div>
                              <p className="text-white/38">{pick(lang, '응시 수', 'Attempts')}</p>
                              <p className="mt-1 font-[700] tabular-nums text-white/88">{quiz.attempts}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      {dashboardInsights.lowPassQuizzes.length === 0 && (
                        <p className="text-[12px] text-white/40">{pick(lang, '퀴즈 데이터가 없습니다', 'No quiz data yet')}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
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
                            <div className="mt-1">
                              <Meter value={row.progressPct} />
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
                      <p className="py-8 text-center text-[12px] text-white/40">{pick(lang, '학습자를 선택하세요', 'Select a learner')}</p>
                    )}
                  </aside>
                </div>
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
                            <div className="flex-1">
                              <Meter value={row.progressPct} />
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
