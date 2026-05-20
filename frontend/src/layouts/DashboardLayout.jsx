import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export default function DashboardLayout({ theme, toggleTheme }) {
  return (
    <div className="flex h-screen bg-primary-light">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
