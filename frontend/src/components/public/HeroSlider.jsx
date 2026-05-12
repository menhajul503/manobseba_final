import { motion } from 'framer-motion'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const slides = [
  {
    title: 'Strengthening Communities Through Compassionate Care',
    description: 'Join Manobseba in providing essential support to families and mosques across the region.',
    image: 'https://images.unsplash.com/photo-1500336624523-d727130c3328?auto=format&fit=crop&w=1400&q=80'
  },
  {
    title: 'A Noble Path to Charity and Service',
    description: 'Your donation helps fund zakat distribution, education and emergency support.',
    image: 'https://images.unsplash.com/photo-1553142355-77f16dbba4ab?auto=format&fit=crop&w=1400&q=80'
  },
  {
    title: 'Together We Serve with Unity and Grace',
    description: 'Empowering villages, supporting orphans, and restoring dignity through meaningful giving.',
    image: 'https://images.unsplash.com/photo-1542736667-069246bdbc63?auto=format&fit=crop&w=1400&q=80'
  }
]

export default function HeroSlider() {
  return (
    <section className="relative overflow-hidden bg-[#F9FAFB] pt-10 pb-24">
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,78,59,0.08),_transparent_24%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 6500, disableOnInteraction: false }}
          loop
          className="rounded-[2rem] shadow-soft"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.title}>
              <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] bg-slate-950/5">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[#064E3B]/40" />
                <div className="relative mx-auto flex h-full max-w-6xl items-center px-6 py-20 text-white sm:px-10">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl"
                  >
                    <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#F9FAFB]/80">Manobseba Public Trust</p>
                    <h2 className="mb-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                      {slide.title}
                    </h2>
                    <p className="mb-8 max-w-xl text-base text-slate-100 sm:text-lg">
                      {slide.description}
                    </p>
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-8 py-3 text-sm font-semibold text-[#064E3B] transition hover:bg-[#c39f26]"
                    >
                      Donate Now
                    </a>
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
