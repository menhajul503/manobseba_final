import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import apiClient from '../api/client'
import MarqueeBar from '../components/public/MarqueeBar'
import HeroSlider from '../components/public/HeroSlider'
import MemberLoop from '../components/public/MemberLoop'
import StatsSection from '../components/public/StatsSection'
import ServicesSection from '../components/public/ServicesSection'
import MediaGallery from '../components/public/MediaGallery'
import Footer from '../components/public/Footer'

export default function Home() {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    apiClient.get('/home')
      .then((res) => {
        if (!mounted) return
        setData(res)
      })
      .catch(() => {})
      .finally(() => setLoading(false))

    return () => { mounted = false }
  }, [])

  return (
    <div className="relative islamic-pattern bg-ivory-50">
      <MarqueeBar notices={data.notices || []} />
      <HeroSlider slides={data.slides || undefined} />
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
      <MemberLoop members={data.members || undefined} />
      <ServicesSection />
      <MediaGallery />
      <StatsSection stats={data.stats || undefined} />
      <Footer />
    </div>
  )
}
