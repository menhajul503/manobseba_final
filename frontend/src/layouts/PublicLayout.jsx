import { Outlet } from 'react-router-dom'
import TopNoticeBar from '../components/public/TopNoticeBar'
import Navbar from '../components/public/Navbar'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-offwhite text-slate-900">
      <TopNoticeBar />
      <Navbar />
      <main className="overflow-hidden">
        <Outlet />
      </main>
    </div>
  )
}
