import { useEffect, useRef, useState } from 'react'

export default function CountUp({ end, duration = 1500, format }) {
  const ref = useRef()
  const [value, setValue] = useState(0)
  useEffect(() => {
    let mounted = true
    let start = 0
    const startTime = performance.now()
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const current = Math.floor(progress * (end - start) + start)
      if (mounted) setValue(current)
      if (progress < 1) requestAnimationFrame(step)
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(step)
          io.disconnect()
        }
      })
    }, { threshold: 0.3 })

    if (ref.current) io.observe(ref.current)

    return () => { mounted = false; io.disconnect() }
  }, [end, duration])

  const display = format ? format(value) : value.toLocaleString()
  return <span ref={ref}>{display}</span>
}
