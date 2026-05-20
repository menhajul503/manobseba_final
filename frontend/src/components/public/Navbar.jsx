import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Notice', href: '/notice' },
  { label: 'Contact', href: '/contact' }
]

export default function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/30 bg-white/90 dark:bg-slate-900/95 dark:border-slate-700/50 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-3xl bg-[#064E3B]/10 text-2xl text-[#064E3B] shadow-soft">
            ✨
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#1F5E3A]">Manobseba</p>
            <h1 className="text-lg font-semibold text-[#064E3B]">Manobseba</h1>
          </div>
        </div>

        <nav className="hidden items-center gap-4 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium text-slate-700 dark:text-slate-100 transition hover:text-[#064E3B] dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-slate-700 dark:text-slate-100 shadow-sm transition hover:border-[#064E3B] dark:hover:border-white/20 hover:text-[#064E3B] dark:hover:text-white"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-slate-700 dark:text-slate-100 shadow-sm transition hover:border-[#064E3B] dark:hover:border-white/20 hover:text-[#064E3B] dark:hover:text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-t border-white/50 bg-white/95 dark:bg-slate-900/95 dark:border-slate-700/50 px-4 pb-6 md:hidden"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-base font-medium text-slate-700 dark:text-slate-100 transition hover:text-[#064E3B] dark:hover:text-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  )
}
