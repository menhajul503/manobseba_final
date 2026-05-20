import { Outlet } from 'react-router-dom'
import TopNoticeBar from '../components/public/TopNoticeBar'
import Navbar from '../components/public/Navbar'

export default function PublicLayout({ theme, toggleTheme }) {
  return (
    <div className="min-h-screen bg-offwhite text-slate-900">
      <TopNoticeBar />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="overflow-hidden">
        <Outlet />
      </main>
    </div>
  )
}
