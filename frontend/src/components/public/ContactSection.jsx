import { motion } from 'framer-motion'

export default function ContactSection() {
  return (
    <section className="bg-[#F9FAFB] py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#064E3B]/70">Contact us</p>
          <h2 className="mb-6 text-3xl font-semibold text-[#064E3B]">Send a message to Manobseba</h2>
          <form className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
              <input className="w-full rounded-3xl border border-slate-200 bg-[#F9FAFB] px-5 py-3 text-sm outline-none focus:border-[#064E3B] focus:ring-2 focus:ring-[#064E3B]/10" placeholder="Your name" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
              <input className="w-full rounded-3xl border border-slate-200 bg-[#F9FAFB] px-5 py-3 text-sm outline-none focus:border-[#064E3B] focus:ring-2 focus:ring-[#064E3B]/10" placeholder="you@example.com" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Message</label>
              <textarea className="w-full rounded-3xl border border-slate-200 bg-[#F9FAFB] px-5 py-3 text-sm outline-none focus:border-[#064E3B] focus:ring-2 focus:ring-[#064E3B]/10" rows="5" placeholder="Write your message" />
            </div>
            <button type="submit" className="inline-flex items-center justify-center rounded-full bg-[#064E3B] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#053a2d]">
              Send Message
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft"
        >
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#064E3B]/70">Find us</p>
            <h3 className="text-2xl font-semibold text-[#064E3B]">Head Office</h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
              125 Community Circle, Narayanganj, Bangladesh
            </p>
          </div>
          <div className="grid gap-4 text-sm text-slate-700">
            <div>
              <p className="font-semibold text-[#064E3B]">Email</p>
              <p>info@manobseba.org</p>
            </div>
            <div>
              <p className="font-semibold text-[#064E3B]">Phone</p>
              <p>+880 1234 567890</p>
            </div>
            <div>
              <p className="font-semibold text-[#064E3B]">Office Hours</p>
              <p>Sunday - Thursday, 9:00 AM - 6:00 PM</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-[1.75rem] border border-slate-200">
            <iframe
              title="Manobseba Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9024286924457!2d90.49130417546143!3d23.6348656266166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b95ed4dc8f79%3A0x23e8677f6cb27289!2sNarayanganj%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              className="h-80 w-full border-0"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
