import { motion } from 'framer-motion'
import { ShieldCheck, Sparkles, MapPin } from 'lucide-react'

const stats = [
  { label: 'Total Members', value: '5,824', icon: ShieldCheck },
  { label: 'Funds Collected', value: '৳12.4M', icon: Sparkles },
  { label: 'Villages Served', value: '38', icon: MapPin }
]

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="absolute right-[-120px] top-0 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#064E3B]/70">Community impact</p>
          <h2 className="text-3xl font-semibold text-[#064E3B] sm:text-4xl">A legacy of support and trust</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="rounded-[2rem] border border-slate-200 bg-[#F9FAFB]/90 p-8 shadow-soft"
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[#064E3B]/10 text-[#064E3B]">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-4xl font-semibold text-[#064E3B]">{item.value}</p>
                <p className="mt-3 text-sm text-slate-600">{item.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
