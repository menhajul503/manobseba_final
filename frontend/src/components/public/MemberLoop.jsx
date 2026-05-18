import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const sampleMembers = [
  { name: 'Md. Rahman', phone: '+880 17 1234 5678', email: 'rahman@example.com', avatar: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Fatima Noor', phone: '+880 17 9876 5432', email: 'fatima@example.com', avatar: 'https://i.pravatar.cc/150?img=18' },
  { name: 'Abdul Karim', phone: '+880 17 2222 3333', email: 'karim@example.com', avatar: 'https://i.pravatar.cc/150?img=32' },
  { name: 'Ayesha Siddique', phone: '+880 17 4444 5555', email: 'ayesha@example.com', avatar: 'https://i.pravatar.cc/150?img=45' },
  { name: 'Ibrahim Khan', phone: '+880 17 6666 7777', email: 'ibrahim@example.com', avatar: 'https://i.pravatar.cc/150?img=65' }
]

export default function MemberLoop({ members = sampleMembers }) {
  const slides = [...members, ...members]

  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-6 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#064E3B]/70">Our Dedicated Members</p>
          <h3 className="mt-2 text-2xl font-semibold text-[#064E3B]">Meet the people who make it possible</h3>
        </div>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={3}
          spaceBetween={20}
          loop
          centeredSlides
          autoplay={{ delay: 1, disableOnInteraction: false, pauseOnMouseEnter: true }}
          speed={4000}
          className="py-4"
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >
          {slides.map((m, idx) => (
            <SwiperSlide key={idx} className="!w-auto">
              <div className="relative mx-2 flex transform-gpu flex-col items-center gap-3 rounded-2xl bg-white p-4 text-center transition-transform hover:scale-105 hover:shadow-[0_10px_30px_rgba(212,175,55,0.12)]">
                <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-[#D4AF37] bg-white">
                  <img src={m.avatar} alt={m.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-[#064E3B]">{m.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{m.phone}</p>
                  <p className="text-xs text-slate-400">{m.email}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
