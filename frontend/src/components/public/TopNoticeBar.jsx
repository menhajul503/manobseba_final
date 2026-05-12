import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const notices = [
  '2026 Ramadan fundraiser launched — join our mosque support campaign.',
  'New orphan sponsorship program now accepting applications.',
  'Zakat distribution schedule updated for Narayanganj and Dhaka areas.'
]

export default function TopNoticeBar() {
  return (
    <div className="bg-[#064E3B] text-white text-xs md:text-sm font-medium">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex-1 overflow-hidden">
          <motion.div
            className="inline-flex whitespace-nowrap"
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 16, ease: 'linear', repeat: Infinity }}
          >
            {notices.map((notice, index) => (
              <span key={index} className="mr-12 inline-block">
                {notice}
              </span>
            ))}
          </motion.div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="btn-sm border border-[#D4AF37] text-[#D4AF37] bg-transparent hover:bg-[#D4AF37]/10">
            Login
          </Link>
          <Link to="/register" className="btn-sm border border-[#D4AF37] text-[#D4AF37] bg-transparent hover:bg-[#D4AF37]/10">
            Registration
          </Link>
        </div>
      </div>
    </div>
  )
}
