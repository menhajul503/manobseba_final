import { useEffect, useState } from 'react'
import apiClient from '../../api/client'

export default function MediaGallery() {
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    let mounted = true
    apiClient.get('/media')
      .then((res) => {
        if (!mounted) return
        setMedia(res.data || [])
      })
      .catch((err) => {
        setError(err.message || 'Failed to load media')
      })
      .finally(() => setLoading(false))

    return () => { mounted = false }
  }, [])

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#064E3B]/70">Gallery</p>
          <h3 className="mt-2 text-3xl font-semibold text-[#064E3B]">Our Moments & Activities</h3>
          <p className="mt-2 text-sm text-slate-600">Images and videos from our recent events and distributions.</p>
        </div>

        {loading && <p className="text-center text-slate-500">Loading media...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && media.length === 0 && (
          <p className="text-center text-slate-500">No media available.</p>
        )}

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {media.map((m) => (
            <div key={m.path} className="overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
              {m.type === 'image' ? (
                <button onClick={() => setSelected(m)} className="w-full">
                  <img src={m.url} alt={m.name} className="h-48 w-full object-cover transition-transform hover:scale-105" />
                </button>
              ) : (
                <button onClick={() => setSelected(m)} className="w-full">
                  <div className="relative h-48 w-full bg-black">
                    <video src={m.url} className="h-full w-full object-cover" muted preload="metadata" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-white/80 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-6.518-3.76A1 1 0 007 8.288v7.424a1 1 0 001.234.97l6.518-1.88A1 1 0 0016 13.88v-1.712a1 1 0 00-1.248-.999z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
              )}
            </div>
          ))}
        </div>

        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setSelected(null)}>
            <div className="max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
              {selected.type === 'image' ? (
                <img src={selected.url} alt={selected.name} className="max-h-[90vh] w-auto rounded-lg" />
              ) : (
                <video controls src={selected.url} className="max-h-[90vh] w-auto rounded-lg" />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
