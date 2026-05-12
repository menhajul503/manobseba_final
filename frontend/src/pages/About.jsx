import { motion } from 'framer-motion'
import Footer from '../components/public/Footer'

const pillars = [
  { title: 'Transparent Giving', description: 'Every donation is managed with accountability and respect for the donor and recipient.' },
  { title: 'Community Healing', description: 'Support for families, orphans, and mosque custodians when help is needed most.' },
  { title: 'Islamic Values', description: 'Our programs are rooted in compassion, justice, and the spirit of zakat.' }
]

export default function About() {
  return (
    <div className="bg-[#F9FAFB]">
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(6,78,59,0.12),_transparent_40%)]" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] border border-slate-200 bg-white p-12 shadow-soft"
          >
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#064E3B]/70">About Us</p>
            <h1 className="mb-6 text-4xl font-semibold text-[#064E3B] sm:text-5xl">A peaceful platform for charity and care</h1>
            <p className="text-lg leading-9 text-slate-600">
              Since our founding, Manobseba has worked to build resilient support systems for vulnerable communities. Our work blends Islamic tradition with modern governance, ensuring every gift delivers meaningful impact.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft"
              >
                <h2 className="mb-4 text-2xl font-semibold text-[#064E3B]">{pillar.title}</h2>
                <p className="text-sm leading-7 text-slate-600">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
