import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import WeekDetail from './pages/WeekDetail'
import ActionGuide from './pages/ActionGuide'
import HiddenTopics from './pages/HiddenTopics'
import Community from './pages/Community'
import Certificate from './pages/Certificate'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/week/:weekId" element={<WeekDetail />} />
        <Route path="/action/:actionId" element={<ActionGuide />} />
        <Route path="/hidden" element={<HiddenTopics />} />
        <Route path="/community" element={<Community />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
