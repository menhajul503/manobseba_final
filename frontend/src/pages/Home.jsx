import { motion } from 'framer-motion'
import HeroSlider from '../components/public/HeroSlider'
import StatsSection from '../components/public/StatsSection'
import ServicesSection from '../components/public/ServicesSection'
import Footer from '../components/public/Footer'

export default function Home() {
  return (
    <div className="relative">
      <HeroSlider />
      <section className="bg-[#F9FAFB] py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-soft"
            >
              <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#064E3B]/70">About Manobseba</p>
              <h2 className="mb-5 text-3xl font-semibold text-[#064E3B] sm:text-4xl">Serving with sincerity, dignity & hope</h2>
              <p className="text-base leading-8 text-slate-600">
                Manobseba is dedicated to uplifting marginalized families, supporting mosque projects, and managing zakat with transparency. Our work honors Islamic values through compassionate service across multiple villages.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
                <p className="text-lg font-semibold text-[#064E3B]">Our Vision</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">A community where faith, generosity, and social harmony bring hope to every family.</p>
              </div>
              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
                <p className="text-lg font-semibold text-[#064E3B]">Our Mission</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">To provide aid and support through ethical zakat management, charity funding, and community empowerment programs.</p>
              </div>
            </motion.div>
          </div>
          <StatsSection />
        </div>
      </section>
      <ServicesSection />
      <Footer />
    </div>
  )
}
