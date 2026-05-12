import { motion } from 'framer-motion'
import { HeartHandshake, DollarSign, Users } from 'lucide-react'

const services = [
  {
    title: 'Zakat Management',
    description: 'Transparent zakat distribution with compassion and accountability.',
    icon: HeartHandshake
  },
  {
    title: 'Charity Funds',
    description: 'Support families and mosque projects with trusted charity initiatives.',
    icon: DollarSign
  },
  {
    title: 'Community Support',
    description: 'Empowering villages through education, health, and livelihood programs.',
    icon: Users
  }
]

export default function ServicesSection() {
  return (
    <section className="bg-[#F9FAFB] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#064E3B]/70">Our key initiatives</p>
          <h2 className="text-3xl font-semibold text-[#064E3B] sm:text-4xl">Service areas grounded in faith</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[#064E3B]/10 text-[#064E3B] transition group-hover:bg-[#064E3B] group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-4 text-xl font-semibold text-[#064E3B]">{service.title}</h3>
                <p className="text-sm leading-7 text-slate-600">{service.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
