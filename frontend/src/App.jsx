import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
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
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Notice from './pages/Notice'
import Contact from './pages/Contact'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'))

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthLayout><LoginPage setIsAuthenticated={setIsAuthenticated} /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />

        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="notice" element={<Notice />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {isAuthenticated && (
          <Route path="/app" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="members" element={<Members />} />
            <Route path="members/add" element={<AddMember />} />
            <Route path="members/:id/edit" element={<EditMember />} />
            <Route path="members/:id" element={<MemberDetail />} />
            <Route path="donations" element={<Donations />} />
            <Route path="distributions" element={<Distributions />} />
            <Route path="notices" element={<NoticeBoard />} />
          </Route>
        )}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
