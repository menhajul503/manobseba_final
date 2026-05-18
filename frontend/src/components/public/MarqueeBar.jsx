export default function MarqueeBar({ notices = [] }) {
  const items = notices.length ? notices.map(n => n.title || n.message) : [
    'Important: Eid distribution on 12th June — Volunteers needed.',
    'New donation drive: Flood relief in Village X.',
    'Join our community events — Register today.'
  ]

  return (
    <div className="relative z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 py-2">
          <div className="overflow-hidden">
            <div className="marquee whitespace-nowrap text-sm text-[#064E3B]">
              {items.concat(items).map((t, i) => (
                <span key={i} className="mr-8">{t}</span>
              ))}
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a href="/login" className="btn-sm rounded-full border border-[#D4AF37] px-4 py-1 text-sm font-semibold text-[#064E3B] bg-white/60">Login</a>
            <a href="/register" className="btn-sm rounded-full bg-[#D4AF37] px-4 py-1 text-sm font-semibold text-[#064E3B] shadow">Register</a>
          </div>
        </div>
      </div>

      <style>{`\n        .marquee { animation: marquee 18s linear infinite; }\n        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }\n      `}</style>
    </div>
  )
}
