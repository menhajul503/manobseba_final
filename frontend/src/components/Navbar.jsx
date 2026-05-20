import { Search, Bell, User, ChevronDown, Sun, Moon } from 'lucide-react'
import { useState } from 'react'

export default function Navbar({ theme, toggleTheme }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'MA'

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-gray dark:text-slate-300" />
            <input
              type="text"
              placeholder="Search donations, members..."
              className="w-full pl-10 pr-4 py-2 bg-primary-light dark:bg-slate-800 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-primary-green dark:focus:ring-primary-green"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6 ml-6">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="relative p-2 hover:bg-primary-light dark:hover:bg-slate-800 rounded-xl transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-slate-300" /> : <Moon className="w-5 h-5 text-slate-gray" />}
          </button>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-primary-light dark:hover:bg-slate-800 rounded-xl transition-all">
            <Bell className="w-5 h-5 text-slate-gray dark:text-slate-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 p-2 hover:bg-primary-light dark:hover:bg-slate-800 rounded-xl transition-all"
            >
              <div className="w-8 h-8 bg-primary-green text-white rounded-full flex items-center justify-center text-sm font-semibold">
                {initials}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{user.name || 'Member'}</p>
                <p className="text-xs text-slate-gray dark:text-slate-400">{user.email || 'member@manobseba.com'}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-gray dark:text-slate-300 hidden sm:block" />
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 py-2 z-10">
                <a href="#" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-100 hover:bg-primary-light dark:hover:bg-slate-800 transition-all">
                  Profile Settings
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-100 hover:bg-primary-light dark:hover:bg-slate-800 transition-all">
                  Account Settings
                </a>
                <hr className="my-2 border-gray-100 dark:border-slate-700" />
                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-slate-800 transition-all">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
