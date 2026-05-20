import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'
import PublicLayout from './layouts/PublicLayout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'
import Members from './pages/Members'
import AddMember from './pages/AddMember'
import EditMember from './pages/EditMember'
import MemberDetail from './pages/MemberDetail'
import Donations from './pages/Donations'
import Distributions from './pages/Distributions'
import NoticeBoard from './pages/NoticeBoard'
import AdminPendingMembers from './pages/AdminPendingMembers'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Notice from './pages/Notice'
import Contact from './pages/Contact'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((value) => (value === 'dark' ? 'light' : 'dark'))
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthLayout><LoginPage setIsAuthenticated={setIsAuthenticated} /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />

        <Route path="/" element={<PublicLayout theme={theme} toggleTheme={toggleTheme} />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="notice" element={<Notice />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {isAuthenticated && (
          <Route path="/app" element={<DashboardLayout theme={theme} toggleTheme={toggleTheme} />}>
            <Route index element={<Dashboard />} />
            <Route path="members" element={<Members />} />
            <Route path="members/add" element={<AddMember />} />
            <Route path="members/:id/edit" element={<EditMember />} />
            <Route path="members/:id" element={<MemberDetail />} />
            <Route path="donations" element={<Donations />} />
            <Route path="distributions" element={<Distributions />} />
            <Route path="notices" element={<NoticeBoard />} />
            <Route path="admin/pending" element={<AdminPendingMembers />} />
          </Route>
        )}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
