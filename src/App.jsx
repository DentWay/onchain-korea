import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import AuthCallback from './pages/AuthCallback'
import SignedOut from './pages/SignedOut'
import Dashboard from './pages/Dashboard'
import WeekDetail from './pages/WeekDetail'
import ActionGuide from './pages/ActionGuide'
import HiddenTopics from './pages/HiddenTopics'
import Community from './pages/Community'
import Certificate from './pages/Certificate'
import LessonDetail from './pages/LessonDetail'
import Quiz from './pages/Quiz'
import Admin from './pages/Admin'
import AdminEntry from './pages/AdminEntry'
import AdminAccess from './pages/AdminAccess'
import Settings from './pages/Settings'
import { ADMIN_ACCESS_PATH, ADMIN_CONSOLE_PATH, ADMIN_ENTRY_PATH } from './lib/adminRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/signed-out" element={<SignedOut />} />
      <Route path="/admin" element={<Navigate to="/" replace />} />
      <Route path="/admin-access" element={<Navigate to="/" replace />} />
      <Route path={ADMIN_ENTRY_PATH} element={<AdminEntry />} />
      <Route path={ADMIN_ACCESS_PATH} element={<AdminAccess />} />
      <Route path={ADMIN_CONSOLE_PATH} element={<ProtectedRoute adminOnly><Layout /></ProtectedRoute>}>
        <Route index element={<Admin />} />
      </Route>
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/week/:weekId" element={<WeekDetail />} />
        <Route path="/lesson/:lessonId" element={<LessonDetail />} />
        <Route path="/quiz/:type/:id" element={<Quiz />} />
        <Route path="/action/:actionId" element={<ActionGuide />} />
        <Route path="/hidden" element={<HiddenTopics />} />
        <Route path="/community" element={<Community />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
