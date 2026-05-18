import { motion } from 'framer-motion'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

const defaultSlides = [
  {
    title: 'Strengthening Communities Through Compassionate Care',
    description: 'Join Manobseba in providing essential support to families and mosques across the region.',
    image: 'https://images.unsplash.com/photo-1500336624523-d727130c3328?auto=format&fit=crop&w=2000&q=80'
  },
  {
    title: 'A Noble Path to Charity and Service',
    description: 'Your donation helps fund zakat distribution, education and emergency support.',
    image: 'https://images.unsplash.com/photo-1553142355-77f16dbba4ab?auto=format&fit=crop&w=2000&q=80'
  }
]

export default function HeroSlider({ slides }) {
  const slidesToUse = slides && slides.length ? slides : defaultSlides
  return (
    <section className="relative overflow-hidden bg-ivory-50">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,78,59,0.06),_transparent_20%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          speed={1200}
          className="rounded-[1.5rem] shadow-2xl"
        >
          {slidesToUse.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative min-h-[520px] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-slate-900/5 to-transparent">
                <img src={slide.image} alt={slide.title} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-[#064E3B]/30 to-black/30" />

                <div className="relative mx-auto flex h-full max-w-6xl items-center px-6 py-20 text-white sm:px-10">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.16 } }
                    }}
                    className="max-w-2xl"
                  >
                    <motion.p
                      variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                      className="mb-4 text-sm uppercase tracking-[0.4em] text-[#F9FAFB]/80"
                    >
                      Manobseba Public Trust
                    </motion.p>
                    <motion.h2
                      variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
                      className="mb-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
                    >
                      {slide.title}
                    </motion.h2>
                    <motion.p
                      variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
                      className="mb-8 max-w-xl text-base text-slate-100 sm:text-lg"
                    >
                      {slide.description}
                    </motion.p>
                    <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                      <a
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#D4AF37] to-[#c39f26] px-8 py-3 text-sm font-semibold text-[#064E3B] shadow-lg transition hover:scale-[1.01]"
                      >
                        Donate Now
                      </a>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
