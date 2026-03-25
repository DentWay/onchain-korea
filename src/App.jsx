import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import AuthCallback from './pages/AuthCallback'
import Dashboard from './pages/Dashboard'
import WeekDetail from './pages/WeekDetail'
import ActionGuide from './pages/ActionGuide'
import HiddenTopics from './pages/HiddenTopics'
import Community from './pages/Community'
import Certificate from './pages/Certificate'
import LessonDetail from './pages/LessonDetail'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/week/:weekId" element={<WeekDetail />} />
        <Route path="/lesson/:lessonId" element={<LessonDetail />} />
        <Route path="/action/:actionId" element={<ActionGuide />} />
        <Route path="/hidden" element={<HiddenTopics />} />
        <Route path="/community" element={<Community />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
