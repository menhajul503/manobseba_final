import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react'

const links = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Services', href: '/services' },
  { title: 'Notice', href: '/notice' },
  { title: 'Contact', href: '/contact' }
]

export default function Footer() {
  return (
    <footer className="bg-[#064E3B] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3">
        <div className="space-y-4">
          <p className="text-lg font-semibold">Manobseba Group</p>
          <p className="max-w-sm text-sm leading-7 text-white/80">
            Nurturing communities through Islamic service, charity, and support for families in need.
          </p>
        </div>
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#D4AF37]">Quick links</p>
          <div className="grid gap-3 text-sm text-white/80">
            {links.map((link) => (
              <a key={link.title} href={link.href} className="transition hover:text-[#D4AF37]">
                {link.title}
              </a>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#D4AF37]">Connect with us</p>
          <div className="flex items-center gap-3 text-white/80">
            <Facebook className="h-5 w-5" />
            <Instagram className="h-5 w-5" />
            <Twitter className="h-5 w-5" />
          </div>
          <div className="space-y-2 text-sm text-white/80">
            <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@manobseba.org</p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> +880 1234 567890</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-sm text-white/70">
        © 2026 Manobseba Group. All rights reserved.
      </div>
    </footer>
  )
}
