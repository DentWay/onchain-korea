import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {
  ArrowRight,
  Clock3,
  Filter,
  RefreshCcw,
  Search,
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

function pick(lang, ko, en) {
  return lang === 'ko' ? ko : en
}

function parseDate(value) {
  const time = value ? new Date(value).getTime() : 0
  return Number.isFinite(time) ? time : 0
}

function formatDate(lang, value) {
  if (!value) return pick(lang, '기록 없음', 'No activity')
  return new Date(value).toLocaleString(lang === 'ko' ? 'ko-KR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function maxDate(...values) {
  return values.reduce((latest, current) => (parseDate(current) > parseDate(latest) ? current : latest), null)
}

function resolveQuizLabel(lang, quizType, quizId) {
  if (quizType === 'weekly') {
    return pick(lang, `Week ${quizId} 테스트`, `Week ${quizId} Test`)
  }

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

function getStageMeta(lang, stage) {
  if (stage === 'admin') {
    return {
      label: pick(lang, '관리자', 'Admin'),
      tone: 'border-[rgba(59,130,246,0.16)] bg-[rgba(59,130,246,0.12)] text-[#79AFFF]',
    }
  }

  if (stage === 'completed') {
    return {
      label: pick(lang, '수료권', 'Completed'),
      tone: 'border-[rgba(74,222,128,0.20)] bg-[rgba(74,222,128,0.12)] text-[#4ADE80]',
    }
  }

  if (stage === 'stalled') {
    return {
      label: pick(lang, '정체', 'Stalled'),
      tone: 'border-[rgba(248,113,113,0.18)] bg-[rgba(248,113,113,0.12)] text-[#FCA5A5]',
    }
  }

  if (stage === 'not-started') {
    return {
      label: pick(lang, '대기', 'Not started'),
      tone: 'border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] text-[var(--app-ink-low)]',
    }
  }

  return {
    label: pick(lang, '진행 중', 'Active'),
    tone: 'border-[rgba(59,130,246,0.16)] bg-[rgba(59,130,246,0.10)] text-[#79AFFF]',
  }
}

function buildWeekSnapshots(row) {
  const completedLessonIds = new Set(row.completedLessonIds)
  const articlePassedIds = new Set(row.articlePassedIds)
  const completedActionIds = new Set(row.completedActionIds)
  const readHiddenTopicIds = new Set(row.readHiddenTopicIds.map((value) => Number(value)))
  const weeklyPassedIds = new Set(row.weeklyPassedIds.map((value) => String(value)))

  return weeks.map((week) => {
    const lessonsPassed = week.lessons.filter((lesson) => articlePassedIds.has(lesson.id) || completedLessonIds.has(lesson.id)).length
    const actionsDone = (week.actions || []).filter((action) => completedActionIds.has(action.id)).length
    const hiddenRead = readHiddenTopicIds.has(week.id)
    const weeklyPassed = weeklyPassedIds.has(String(week.id))

    return {
      weekId: week.id,
      title: l(week.title, row.lang),
      lessonsPassed,
      lessonsTotal: week.lessons.length,
      actionsDone,
      actionsTotal: (week.actions || []).length,
      hiddenRead,
      weeklyPassed,
      isCurrent: row.currentWeek === week.id,
    }
  })
}

function getBottleneckCopy(lang, row, snapshots) {
  if (row.weeklyPassedCount >= weeks.length || row.articlePassedCount >= totalLessons) {
    return pick(lang, '8주 전체 흐름을 마친 상태입니다.', 'This learner has completed the 8-week path.')
  }

  const current = snapshots.find((item) => item.weekId === row.currentWeek) || snapshots[0]
  if (!current) return pick(lang, '학습 데이터가 아직 없습니다.', 'No learner progress is available yet.')

  if (current.lessonsPassed < current.lessonsTotal) {
    return pick(
      lang,
      `Week ${current.weekId} 아티클 ${current.lessonsPassed}/${current.lessonsTotal}에서 멈춰 있습니다.`,
      `This learner is currently blocked at Week ${current.weekId} article ${current.lessonsPassed}/${current.lessonsTotal}.`
    )
  }

  if (current.actionsDone < current.actionsTotal) {
    return pick(
      lang,
      `Week ${current.weekId} 실습 ${current.actionsDone}/${current.actionsTotal} 단계에 있습니다.`,
      `This learner is currently on Week ${current.weekId} actions ${current.actionsDone}/${current.actionsTotal}.`
    )
  }

  if (!current.hiddenRead) {
    return pick(
      lang,
      `Week ${current.weekId} 히든 토픽 전 단계입니다.`,
      `This learner is waiting on the Week ${current.weekId} hidden topic.`
    )
  }

  if (!current.weeklyPassed) {
    return pick(
      lang,
      `Week ${current.weekId} 주간 테스트 전 단계입니다.`,
      `This learner is waiting on the Week ${current.weekId} weekly test.`
    )
  }

  return pick(
    lang,
    `Week ${current.weekId}는 마쳤고 다음 주로 넘어갈 수 있습니다.`,
    `Week ${current.weekId} is complete and the learner can move forward.`
  )
}

function buildLearnerRows(profiles = [], progressRows = [], quizRows = []) {
  const profileMap = new Map(profiles.map((row) => [row.id, row]))
  const progressMap = new Map(progressRows.map((row) => [row.id, row]))
  const quizMap = new Map()

  for (const row of quizRows) {
    const bucket = quizMap.get(row.user_id) || {
      attempts: 0,
      articlePassedIds: new Set(),
      weeklyPassedIds: new Set(),
      lastQuizAt: null,
      recentAttempts: [],
    }

    bucket.attempts += 1
    bucket.lastQuizAt = maxDate(bucket.lastQuizAt, row.attempted_at)
    bucket.recentAttempts.push({
      quizType: row.quiz_type,
      quizId: String(row.quiz_id),
      score: row.score,
      total: row.total,
      passed: row.passed,
      attemptedAt: row.attempted_at,
    })

    if (row.passed && row.quiz_type === 'article') {
      bucket.articlePassedIds.add(row.quiz_id)
    }
    if (row.passed && row.quiz_type === 'weekly') {
      bucket.weeklyPassedIds.add(String(row.quiz_id))
    }

    quizMap.set(row.user_id, bucket)
  }

  const allIds = new Set([
    ...profiles.map((row) => row.id),
    ...progressRows.map((row) => row.id),
    ...quizRows.map((row) => row.user_id),
  ])

  return [...allIds].map((id) => {
    const profile = profileMap.get(id) || {}
    const progress = progressMap.get(id) || {}
    const quiz = quizMap.get(id) || {
      attempts: 0,
      articlePassedIds: new Set(),
      weeklyPassedIds: new Set(),
      lastQuizAt: null,
      recentAttempts: [],
    }

    const completedLessonIds = progress.completed_lessons || []
    const completedActionIds = progress.completed_actions || []
    const readHiddenTopicIds = progress.read_hidden_topics || []
    const articlePassedIds = [...quiz.articlePassedIds]
    const weeklyPassedIds = [...quiz.weeklyPassedIds]
    const completedLessons = completedLessonIds.length
    const completedActions = completedActionIds.length
    const readHiddenTopics = readHiddenTopicIds.length
    const progressPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
    const currentWeek = Math.min(Math.max(progress.current_week || 1, 1), weeks.length)
    const email = profile.email || ''
    const displayName = profile.display_name || email.split('@')[0] || `user-${String(id).slice(0, 6)}`
    const lastActivityAt = maxDate(profile.updated_at, progress.updated_at, quiz.lastQuizAt, profile.created_at)
    const recentQuizAttempts = [...quiz.recentAttempts]
      .sort((a, b) => parseDate(b.attemptedAt) - parseDate(a.attemptedAt))
      .slice(0, 6)

    return {
      id,
      displayName,
      email,
      lang: profile.lang || 'ko',
      isAdmin: !!profile.is_admin,
      currentWeek,
      progressPct,
      completedLessons,
      completedActions,
      readHiddenTopics,
      articlePassedCount: articlePassedIds.length,
      weeklyPassedCount: weeklyPassedIds.length,
      quizAttempts: quiz.attempts,
      lastActivityAt,
      lastActivityTs: parseDate(lastActivityAt),
      createdAt: profile.created_at,
      completedLessonIds,
      completedActionIds,
      readHiddenTopicIds,
      articlePassedIds,
      weeklyPassedIds,
      recentQuizAttempts,
    }
  })
}

function SummaryCard({ icon: Icon, label, value, meta }) {
  return (
    <div className="ok-paper-muted p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] uppercase tracking-[0.18em] ok-ink-low">{label}</p>
        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[rgba(59,130,246,0.10)] text-[#79AFFF]">
          <Icon size={16} />
        </span>
      </div>
      <p className="mt-4 text-[34px] font-[800] tracking-[-0.06em] ok-tabular-nums ok-ink-high">{value}</p>
      <p className="mt-2 text-[12px] ok-ink-mid">{meta}</p>
    </div>
  )
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="flex min-w-[140px] items-center gap-2 rounded-2xl border border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] px-3 py-2.5">
      <Filter size={14} className="ok-ink-low" />
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-[0.16em] ok-ink-low">{label}</p>
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-1 w-full bg-transparent text-[12px] font-medium ok-ink-high outline-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-[var(--surface-1)] text-[var(--text-high)]">
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </label>
  )
}

function EmptyPanel({ title, body }) {
  return (
    <div className="rounded-2xl border border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] px-4 py-4">
      <p className="text-[13px] font-semibold ok-ink-high">{title}</p>
      <p className="mt-2 text-[12px] leading-relaxed ok-ink-mid">{body}</p>
    </div>
  )
}

function OpsChip({ label, value, tone = 'default' }) {
  const toneClass = {
    default: 'border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] text-[var(--app-ink-high)]',
    danger: 'border-[rgba(248,113,113,0.18)] bg-[rgba(248,113,113,0.10)] text-[#FCA5A5]',
    success: 'border-[rgba(74,222,128,0.18)] bg-[rgba(74,222,128,0.10)] text-[#4ADE80]',
    info: 'border-[rgba(59,130,246,0.18)] bg-[rgba(59,130,246,0.10)] text-[#79AFFF]',
  }[tone]

  return (
    <div className={`rounded-2xl border px-4 py-3 ${toneClass}`}>
      <p className="text-[10px] uppercase tracking-[0.16em] opacity-80">{label}</p>
      <p className="mt-2 text-[22px] font-[800] tracking-[-0.04em] ok-tabular-nums">{value}</p>
    </div>
  )
}

export default function Admin() {
  const { isAdmin, supabaseEnabled } = useAuth()
  const { lang } = useLang()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [weekFilter, setWeekFilter] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [selectedId, setSelectedId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [lastLoadedAt, setLastLoadedAt] = useState(null)
  const [rows, setRows] = useState([])

  const loadAdminData = useCallback(async () => {
    if (!supabaseEnabled || !supabase) {
      setRows([])
      setError('')
      setLastLoadedAt(new Date().toISOString())
      return
    }

    setLoading(true)
    setError('')

    try {
      const [profilesRes, progressRes, quizRes] = await Promise.all([
        supabase
          .from('profiles')
          .select('id, display_name, avatar_url, lang, email, is_admin, created_at, updated_at')
          .order('created_at', { ascending: false }),
        supabase
          .from('user_progress')
          .select('id, completed_lessons, completed_actions, read_hidden_topics, current_week, updated_at'),
        supabase
          .from('quiz_results')
          .select('user_id, quiz_type, quiz_id, score, total, passed, attempted_at'),
      ])

      const queryError = profilesRes.error || progressRes.error || quizRes.error
      if (queryError) {
        const failedTable = profilesRes.error ? 'profiles' : progressRes.error ? 'user_progress' : 'quiz_results'
        const detail = queryError.message || queryError.code || JSON.stringify(queryError)
        console.error('[Admin] query failed:', failedTable, queryError)
        setRows([])
        setError(`[${failedTable}] ${detail}`)
        return
      }

      setRows(buildLearnerRows(profilesRes.data || [], progressRes.data || [], quizRes.data || []))
      setLastLoadedAt(new Date().toISOString())
    } catch (nextError) {
      setRows([])
      setError(
        pick(
          lang,
          `운영 데이터를 불러오지 못했습니다. ${nextError?.message || 'unknown_error'}`,
          `Failed to load admin data. ${nextError?.message || 'unknown_error'}`
        )
      )
    } finally {
      setLoading(false)
    }
  }, [lang, supabaseEnabled])

  useEffect(() => {
    if (!isAdmin) return
    void loadAdminData()
  }, [isAdmin, loadAdminData])

  const summary = useMemo(() => {
    const totalUsers = rows.length
    const activeUsers = rows.filter((row) => row.progressPct > 0 || row.quizAttempts > 0 || row.completedActions > 0).length
    const avgProgress = totalUsers > 0 ? Math.round(rows.reduce((sum, row) => sum + row.progressPct, 0) / totalUsers) : 0
    const weeklyPasses = rows.reduce((sum, row) => sum + row.weeklyPassedCount, 0)
    return { totalUsers, activeUsers, avgProgress, weeklyPasses }
  }, [rows])

  const opsSnapshot = useMemo(() => {
    const stageCounts = {
      active: 0,
      stalled: 0,
      completed: 0,
      notStarted: 0,
      admin: 0,
    }

    for (const row of rows) {
      stageCounts[getLearnerStage(row)] += 1
    }

    const stalledRows = [...rows]
      .filter((row) => getLearnerStage(row) === 'stalled')
      .sort((a, b) => a.lastActivityTs - b.lastActivityTs)
      .slice(0, 5)

    const weekDistribution = weeks.map((week) => ({
      weekId: week.id,
      count: rows.filter((row) => row.currentWeek === week.id).length,
      label: l(week.title, lang),
    }))

    const maxWeekCount = Math.max(1, ...weekDistribution.map((item) => item.count))

    return { stageCounts, stalledRows, weekDistribution, maxWeekCount }
  }, [lang, rows])

  const statusOptions = useMemo(() => [
    { value: 'all', label: pick(lang, '전체', 'All') },
    { value: 'active', label: pick(lang, '진행 중', 'Active') },
    { value: 'stalled', label: pick(lang, '정체', 'Stalled') },
    { value: 'completed', label: pick(lang, '수료권', 'Completed') },
    { value: 'not-started', label: pick(lang, '대기', 'Not started') },
    { value: 'admin', label: pick(lang, '관리자', 'Admin') },
  ], [lang])

  const weekOptions = useMemo(() => [
    { value: 'all', label: pick(lang, '전체 주차', 'All weeks') },
    ...weeks.map((week) => ({ value: String(week.id), label: `Week ${week.id}` })),
  ], [lang])

  const sortOptions = useMemo(() => [
    { value: 'recent', label: pick(lang, '최근 활동순', 'Recent activity') },
    { value: 'progress', label: pick(lang, '진행률순', 'Progress') },
    { value: 'week', label: pick(lang, '주차순', 'Current week') },
    { value: 'attempts', label: pick(lang, '퀴즈 응시순', 'Quiz attempts') },
    { value: 'name', label: pick(lang, '이름순', 'Name') },
  ], [lang])

  const visibleRows = useMemo(() => {
    const keyword = search.trim().toLowerCase()
    const next = rows.filter((row) => {
      const stage = getLearnerStage(row)
      const matchesKeyword =
        !keyword ||
        row.displayName.toLowerCase().includes(keyword) ||
        row.email.toLowerCase().includes(keyword)
      const matchesStatus = statusFilter === 'all' || stage === statusFilter
      const matchesWeek = weekFilter === 'all' || row.currentWeek === Number(weekFilter)
      return matchesKeyword && matchesStatus && matchesWeek
    })

    next.sort((a, b) => {
      if (sortBy === 'progress') {
        if (b.progressPct !== a.progressPct) return b.progressPct - a.progressPct
        return b.lastActivityTs - a.lastActivityTs
      }
      if (sortBy === 'week') {
        if (b.currentWeek !== a.currentWeek) return b.currentWeek - a.currentWeek
        return b.progressPct - a.progressPct
      }
      if (sortBy === 'attempts') {
        if (b.quizAttempts !== a.quizAttempts) return b.quizAttempts - a.quizAttempts
        return b.lastActivityTs - a.lastActivityTs
      }
      if (sortBy === 'name') {
        return a.displayName.localeCompare(b.displayName, lang === 'ko' ? 'ko' : 'en')
      }
      if (b.lastActivityTs !== a.lastActivityTs) return b.lastActivityTs - a.lastActivityTs
      return b.progressPct - a.progressPct
    })

    return next
  }, [lang, rows, search, sortBy, statusFilter, weekFilter])

  useEffect(() => {
    if (!visibleRows.length) {
      setSelectedId(null)
      return
    }
    if (!selectedId || !visibleRows.some((row) => row.id === selectedId)) {
      setSelectedId(visibleRows[0].id)
    }
  }, [selectedId, visibleRows])

  const selectedRow = useMemo(
    () => visibleRows.find((row) => row.id === selectedId) || null,
    [selectedId, visibleRows]
  )

  const selectedSnapshots = useMemo(
    () => (selectedRow ? buildWeekSnapshots(selectedRow) : []),
    [selectedRow]
  )

  const selectedBottleneck = useMemo(
    () => (selectedRow ? getBottleneckCopy(lang, selectedRow, selectedSnapshots) : ''),
    [lang, selectedRow, selectedSnapshots]
  )

  const quickLinks = useMemo(() => [
    ...weeks.map((week) => ({
      label: `Week ${week.id}`,
      href: `/week/${week.id}`,
      meta: pick(lang, '주차 열기', 'Open week'),
    })),
    { label: pick(lang, '히든 토픽', 'Hidden Topics'), href: '/hidden', meta: pick(lang, '전체 보기', 'Open all') },
    { label: pick(lang, '수료증', 'Certificate'), href: '/certificate', meta: pick(lang, '수료 상태', 'Open proof') },
    { label: pick(lang, '커뮤니티', 'Community'), href: '/community', meta: pick(lang, '운영 확인', 'Open space') },
  ], [lang])

  if (supabaseEnabled && !isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="mx-auto max-w-7xl">
      <section className="ok-workbench p-5 md:p-8">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-[26px] font-[800] tracking-[-0.05em] ok-ink-high md:text-[32px]">
              {pick(lang, '운영 대시보드', 'Admin Console')}
            </h1>
          </div>
          <button onClick={() => void loadAdminData()} className="ok-btn ok-btn-light px-4 py-2.5 text-[12px]" disabled={loading}>
            <RefreshCcw size={14} className={loading ? 'animate-spin' : ''} />
            {pick(lang, '새로고침', 'Refresh')}
          </button>
        </header>

        <div className="mt-5 flex flex-wrap gap-6 border-b border-[var(--app-divider)] pb-5">
          {[
            { label: pick(lang, '전체', 'Total'), value: summary.totalUsers },
            { label: pick(lang, '학습 중', 'Active'), value: summary.activeUsers },
            { label: pick(lang, '평균', 'Avg'), value: `${summary.avgProgress}%` },
            { label: pick(lang, '테스트', 'Tests'), value: summary.weeklyPasses },
          ].map((item) => (
            <div key={item.label} className="flex items-baseline gap-2">
              <span className="text-[22px] font-[800] ok-tabular-nums ok-ink-high">{item.value}</span>
              <span className="text-[12px] ok-ink-mid">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <section className="ok-paper-muted p-5">
            <p className="text-[11px] uppercase tracking-[0.2em] ok-ink-low">{pick(lang, '운영 우선 확인', 'Ops priorities')}</p>
            <h2 className="mt-2 text-[20px] font-[800] tracking-[-0.04em] ok-ink-high">
              {pick(lang, '지금 막힌 학습자를 먼저 봅니다', 'Review stalled learners first')}
            </h2>
            <div className="mt-4 grid gap-3 md:grid-cols-4">
              <OpsChip label={pick(lang, '정체', 'Stalled')} value={opsSnapshot.stageCounts.stalled} tone="danger" />
              <OpsChip label={pick(lang, '진행 중', 'Active')} value={opsSnapshot.stageCounts.active} tone="info" />
              <OpsChip label={pick(lang, '수료권', 'Completed')} value={opsSnapshot.stageCounts.completed} tone="success" />
              <OpsChip label={pick(lang, '대기', 'Not started')} value={opsSnapshot.stageCounts.notStarted} />
            </div>
            <div className="mt-5 space-y-2">
              {opsSnapshot.stalledRows.length > 0 ? (
                opsSnapshot.stalledRows.map((row) => (
                  <button
                    key={row.id}
                    type="button"
                    onClick={() => setSelectedId(row.id)}
                    className="flex w-full items-center justify-between rounded-2xl border border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] px-4 py-3 text-left transition-colors hover:bg-[var(--app-soft-bg-strong)]"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-semibold ok-ink-high">{row.displayName}</p>
                      <p className="mt-1 text-[11px] ok-ink-mid">
                        Week {row.currentWeek} · {row.progressPct}% · {formatDate(lang, row.lastActivityAt)}
                      </p>
                    </div>
                    <ArrowRight size={14} className="shrink-0 ok-ink-low" />
                  </button>
                ))
              ) : (
                <EmptyPanel
                  title={pick(lang, '정체 학습자 없음', 'No stalled learners')}
                  body={pick(lang, '최근 7일 기준으로 멈춰 있는 학습자가 없습니다.', 'No learners are stalled based on the last 7 days.')}
                />
              )}
            </div>
          </section>

          <section className="ok-paper-muted p-5">
            <p className="text-[11px] uppercase tracking-[0.2em] ok-ink-low">{pick(lang, '주차 분포', 'Week distribution')}</p>
            <h2 className="mt-2 text-[20px] font-[800] tracking-[-0.04em] ok-ink-high">
              {pick(lang, '어느 구간에 학습자가 몰리는지 봅니다', 'See where learners cluster')}
            </h2>
            <div className="mt-4 space-y-3">
              {opsSnapshot.weekDistribution.map((item) => (
                <div key={item.weekId}>
                  <div className="flex items-center justify-between gap-3 text-[12px]">
                    <p className="font-semibold ok-ink-high">Week {item.weekId}</p>
                    <p className="ok-tabular-nums ok-ink-mid">{item.count}</p>
                  </div>
                  <p className="mt-1 text-[11px] ok-ink-low">{item.label}</p>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--app-track)]">
                    <div
                      className="h-full rounded-full bg-[#3B82F6]"
                      style={{ width: `${(item.count / opsSnapshot.maxWeekCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
          <section className="ok-paper overflow-hidden">
            <div className="border-b border-[var(--app-divider)] px-5 py-4 md:px-6">
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex flex-1 items-center gap-3 rounded-2xl border border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] px-4 py-2.5 min-w-[200px] max-w-[360px]">
                  <Search size={15} className="ok-ink-low" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder={pick(lang, '검색', 'Search')}
                    className="w-full bg-transparent text-[13px] ok-ink-high placeholder:text-[var(--app-ink-low)] outline-none"
                  />
                </label>
                <FilterSelect label={pick(lang, '상태', 'Status')} value={statusFilter} onChange={setStatusFilter} options={statusOptions} />
                <FilterSelect label={pick(lang, '주차', 'Week')} value={weekFilter} onChange={setWeekFilter} options={weekOptions} />
                <span className="text-[12px] ok-ink-low ok-tabular-nums">{visibleRows.length}{pick(lang, '명', '')}</span>
              </div>
            </div>

            {error && (
              <div className="border-b border-[var(--app-divider)] bg-[rgba(248,113,113,0.08)] px-5 py-4 md:px-6">
                <p className="text-[13px] leading-relaxed text-[#FCA5A5]">{error}</p>
              </div>
            )}

            {loading ? (
              <div className="px-5 py-10 md:px-6">
                <div className="flex items-center gap-3 text-[13px] ok-ink-mid">
                  <RefreshCcw size={15} className="animate-spin" />
                  <span>{pick(lang, '운영 데이터를 불러오는 중입니다.', 'Loading admin data.')}</span>
                </div>
              </div>
            ) : visibleRows.length === 0 ? (
              <div className="px-5 py-8 md:px-6">
                <EmptyPanel
                  title={pick(lang, '표시할 학습자 데이터가 없습니다.', 'No learner data to display.')}
                  body={
                    rows.length === 0
                      ? pick(
                          lang,
                          'Supabase 관리자 조회 권한이 아직 열리지 않았거나, 아직 등록된 학습자가 없습니다. `supabase-admin-schema.sql` 적용 상태를 먼저 확인하세요.',
                          'Either admin read policies are not open yet or there are no registered learners. Check whether `supabase-admin-schema.sql` has been applied.'
                        )
                      : pick(lang, '검색 또는 필터 결과가 없습니다.', 'No matching learners were found.')
                  }
                />
              </div>
            ) : (
              <div className="divide-y divide-[var(--app-divider)]">
                {visibleRows.map((row) => {
                  const stageMeta = getStageMeta(lang, getLearnerStage(row))
                  const isSelected = row.id === selectedId

                  return (
                    <button
                      key={row.id}
                      type="button"
                      onClick={() => setSelectedId(row.id)}
                      className={`flex w-full items-center gap-4 px-5 py-4 text-left transition-colors md:px-6 ${isSelected ? 'bg-[rgba(59,130,246,0.08)]' : 'hover:bg-[rgba(255,255,255,0.03)]'}`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[14px] font-semibold ok-ink-high">{row.displayName}</p>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${stageMeta.tone}`}>{stageMeta.label}</span>
                        </div>
                        <p className="mt-1 text-[12px] ok-ink-mid">Week {row.currentWeek} · {row.email || pick(lang, '이메일 없음', 'No email')}</p>
                      </div>
                      <div className="shrink-0 w-28 text-right">
                        <p className="text-[18px] font-[800] ok-tabular-nums ok-ink-high">{row.progressPct}%</p>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--app-track)]">
                          <div className="h-full rounded-full bg-[#3B82F6]" style={{ width: `${Math.min(row.progressPct, 100)}%` }} />
                        </div>
                      </div>
                      <ArrowRight size={14} className="shrink-0 ok-ink-low" />
                    </button>
                  )
                })}
              </div>
            )}
          </section>

          <aside className="space-y-5">
            <section className="ok-paper-muted p-5">
              <p className="text-[11px] uppercase tracking-[0.2em] ok-ink-low">{pick(lang, '선택한 학습자', 'Selected learner')}</p>
              {selectedRow ? (
                <>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <h2 className="text-[22px] font-[800] tracking-[-0.04em] ok-ink-high">{selectedRow.displayName}</h2>
                    <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${getStageMeta(lang, getLearnerStage(selectedRow)).tone}`}>
                      {getStageMeta(lang, getLearnerStage(selectedRow)).label}
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] ok-ink-mid">{selectedRow.email || pick(lang, '이메일 없음', 'No email')}</p>
                  <p className="mt-4 text-[13px] leading-relaxed ok-ink-mid">{selectedBottleneck}</p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {[
                      { label: pick(lang, '현재 주차', 'Current week'), value: `W${selectedRow.currentWeek}` },
                      { label: pick(lang, '진행률', 'Progress'), value: `${selectedRow.progressPct}%` },
                      { label: pick(lang, '실습 완료', 'Actions'), value: `${selectedRow.completedActions}/${totalActions}` },
                      { label: pick(lang, '테스트 통과', 'Weekly pass'), value: `${selectedRow.weeklyPassedCount}/${weeks.length}` },
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl border border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] px-4 py-3">
                        <p className="text-[10px] uppercase tracking-[0.16em] ok-ink-low">{item.label}</p>
                        <p className="mt-2 text-[20px] font-[800] tracking-[-0.04em] ok-tabular-nums ok-ink-high">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5">
                    <div className="mb-3 flex items-center gap-2">
                      <Clock3 size={14} className="ok-ink-low" />
                      <p className="text-[12px] font-semibold ok-ink-high">{pick(lang, '주차별 상태', 'Week-by-week state')}</p>
                    </div>
                    <div className="space-y-2">
                      {selectedSnapshots.map((snapshot) => (
                        <div
                          key={snapshot.weekId}
                          className={`rounded-2xl border px-4 py-3 ${snapshot.isCurrent ? 'border-[rgba(59,130,246,0.18)] bg-[rgba(59,130,246,0.08)]' : 'border-[var(--app-soft-border)] bg-[var(--app-soft-bg)]'}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-[13px] font-semibold ok-ink-high">Week {snapshot.weekId}</p>
                              <p className="mt-1 text-[11px] ok-ink-mid">{snapshot.title}</p>
                            </div>
                            {snapshot.weeklyPassed ? (
                              <span className="rounded-full bg-[rgba(74,222,128,0.12)] px-2 py-1 text-[10px] font-semibold text-[#4ADE80]">
                                {pick(lang, '통과', 'Passed')}
                              </span>
                            ) : snapshot.isCurrent ? (
                              <span className="rounded-full bg-[rgba(59,130,246,0.12)] px-2 py-1 text-[10px] font-semibold text-[#79AFFF]">
                                {pick(lang, '현재', 'Current')}
                              </span>
                            ) : (
                              <span className="rounded-full border border-[var(--app-soft-border)] px-2 py-1 text-[10px] font-semibold ok-ink-low">
                                {pick(lang, '대기', 'Queued')}
                              </span>
                            )}
                          </div>
                          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] ok-ink-mid">
                            <p>{pick(lang, '아티클', 'Articles')}: {snapshot.lessonsPassed}/{snapshot.lessonsTotal}</p>
                            <p>{pick(lang, '실습', 'Actions')}: {snapshot.actionsDone}/{snapshot.actionsTotal}</p>
                            <p>{pick(lang, '히든', 'Hidden')}: {snapshot.hiddenRead ? pick(lang, '읽음', 'Read') : pick(lang, '대기', 'Pending')}</p>
                            <p>{pick(lang, '테스트', 'Test')}: {snapshot.weeklyPassed ? pick(lang, '통과', 'Passed') : pick(lang, '미완료', 'Pending')}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="mb-3 flex items-center gap-2">
                      <Trophy size={14} className="ok-ink-low" />
                      <p className="text-[12px] font-semibold ok-ink-high">{pick(lang, '최근 퀴즈 기록', 'Recent quiz activity')}</p>
                    </div>
                    <div className="space-y-2">
                      {selectedRow.recentQuizAttempts.length > 0 ? (
                        selectedRow.recentQuizAttempts.map((attempt, index) => (
                          <div key={`${attempt.quizType}-${attempt.quizId}-${attempt.attemptedAt}-${index}`} className="rounded-2xl border border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] px-4 py-3">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-[12px] font-semibold ok-ink-high">{resolveQuizLabel(lang, attempt.quizType, attempt.quizId)}</p>
                                <p className="mt-1 text-[11px] ok-ink-mid">{formatDate(lang, attempt.attemptedAt)}</p>
                              </div>
                              <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${attempt.passed ? 'bg-[rgba(74,222,128,0.12)] text-[#4ADE80]' : 'bg-[rgba(248,113,113,0.12)] text-[#FCA5A5]'}`}>
                                {attempt.score}/{attempt.total}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <EmptyPanel
                          title={pick(lang, '퀴즈 기록 없음', 'No quiz activity')}
                          body={pick(lang, '아직 이 학습자의 퀴즈 기록이 없습니다.', 'This learner has no quiz attempts yet.')}
                        />
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <EmptyPanel
                  title={pick(lang, '선택된 학습자 없음', 'No learner selected')}
                  body={pick(lang, '왼쪽 목록에서 학습자를 선택하면 상세 현황이 여기 표시됩니다.', 'Select a learner from the table to inspect detailed progress here.')}
                />
              )}
            </section>

            <section className="ok-paper-muted p-5">
              <p className="text-[11px] uppercase tracking-[0.2em] ok-ink-low">{pick(lang, '빠른 이동', 'Quick access')}</p>
              <h2 className="mt-2 text-[20px] font-[800] tracking-[-0.04em] ok-ink-high">
                {pick(lang, '모든 콘텐츠 바로 열기', 'Open any content')}
              </h2>
              <div className="mt-4 grid gap-2">
                {quickLinks.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="flex items-center justify-between rounded-2xl border border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] px-4 py-3 text-[13px] transition-colors hover:bg-[var(--app-soft-bg-strong)]"
                  >
                    <div>
                      <p className="font-semibold ok-ink-high">{item.label}</p>
                      <p className="mt-1 text-[11px] ok-ink-mid">{item.meta}</p>
                    </div>
                    <ArrowRight size={14} className="ok-ink-low" />
                  </Link>
                ))}
              </div>
              <p className="mt-4 text-[12px] leading-relaxed ok-ink-mid">
                {pick(
                  lang,
                  '관리자 모드에서는 아티클, 실습, 히든 토픽, 주간 테스트 잠금을 우회합니다.',
                  'Admin mode bypasses article, action, hidden-topic, and weekly-test locks.'
                )}
              </p>
            </section>

            <section className="ok-paper-muted p-5">
              <p className="text-[11px] uppercase tracking-[0.2em] ok-ink-low">{pick(lang, '백엔드 상태', 'Backend state')}</p>
              <h2 className="mt-2 text-[20px] font-[800] tracking-[-0.04em] ok-ink-high">
                {pick(lang, '권한 및 동기화', 'Permissions and sync')}
              </h2>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] ok-ink-low">{pick(lang, 'Supabase', 'Supabase')}</p>
                  <p className="mt-2 text-[13px] font-semibold ok-ink-high">
                    {supabaseEnabled ? pick(lang, '연결됨', 'Connected') : pick(lang, '로컬 모드', 'Local mode')}
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] ok-ink-low">{pick(lang, '관리자 조회 정책', 'Admin read policy')}</p>
                  <p className="mt-2 text-[13px] font-semibold ok-ink-high">
                    {error
                      ? pick(lang, '확인 필요', 'Needs attention')
                      : pick(lang, '정상 또는 미검증', 'Healthy or unverified')}
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] ok-ink-low">{pick(lang, '마지막 새로고침', 'Last refresh')}</p>
                  <p className="mt-2 text-[13px] font-semibold ok-ink-high">
                    {lastLoadedAt ? formatDate(lang, lastLoadedAt) : pick(lang, '아직 없음', 'Not loaded yet')}
                  </p>
                </div>
              </div>
              <div className="mt-4 rounded-2xl border border-[var(--app-soft-border)] bg-[var(--app-soft-bg)] px-4 py-3 text-[12px] ok-ink-high">
                <code>/Users/jason/Desktop/Project/onchain-korea/supabase-admin-schema.sql</code>
              </div>
            </section>
          </aside>
        </div>
      </section>
    </div>
  )
}
