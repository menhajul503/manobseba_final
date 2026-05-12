import { motion } from 'framer-motion'
import ServicesSection from '../components/public/ServicesSection'
import Footer from '../components/public/Footer'

const offerings = [
  { title: 'Zakat Allocation', details: 'Guided distribution to families, students, and community projects.' },
  { title: 'Education Support', details: 'Scholarships, school supplies, and youth mentorship programs.' },
  { title: 'Emergency Relief', details: 'Swift aid for flood victims and families in urgent need.' },
  { title: 'Mosque Renewal', details: 'Restoration and upkeep support for mosque communities.' }
]

export default function Services() {
  return (
    <div className="bg-[#F9FAFB]">
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 rounded-[2rem] border border-slate-200 bg-white p-12 shadow-soft"
          >
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#064E3B]/70">What we offer</p>
            <h1 className="text-4xl font-semibold text-[#064E3B] sm:text-5xl">Comprehensive charity and community services</h1>
          </motion.div>
          <div className="grid gap-6 lg:grid-cols-2">
            {offerings.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft"
              >
                <h2 className="mb-3 text-2xl font-semibold text-[#064E3B]">{item.title}</h2>
                <p className="text-sm leading-7 text-slate-600">{item.details}</p>
              </motion.div>
            ))}
          </div>
          <ServicesSection />
        </div>
      </section>
      <Footer />
    </div>
  )
}
