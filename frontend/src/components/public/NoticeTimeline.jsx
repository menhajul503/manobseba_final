import { motion } from 'framer-motion'

const notices = [
  { date: 'May 12, 2026', title: 'Ramadan fundraiser launched', details: 'Our new mosque rehabilitation campaign is now active in Dhaka and Narayanganj.' },
  { date: 'April 28, 2026', title: 'Orphan support drive', details: 'Twenty-five orphan families received emergency support in the last week.' },
  { date: 'March 15, 2026', title: 'Zakat distribution update', details: 'Updated distribution dates and village allocation announced officially.' }
]

export default function NoticeTimeline() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#064E3B]/70">Official announcements</p>
          <h2 className="text-3xl font-semibold text-[#064E3B] sm:text-4xl">Latest notice board</h2>
        </div>
        <div className="space-y-8">
          {notices.map((notice, index) => (
            <motion.div
              key={notice.date}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[#F9FAFB] p-8 shadow-soft"
            >
              <div className="absolute right-0 top-0 h-full w-1 bg-[#D4AF37]/30" />
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#064E3B]">{notice.date}</p>
              <h3 className="mb-3 text-2xl font-semibold text-[#064E3B]">{notice.title}</h3>
              <p className="text-sm leading-7 text-slate-600">{notice.details}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
