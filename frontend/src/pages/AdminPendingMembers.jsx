import { useEffect, useState } from 'react'
import apiClient from '../api/client'

export default function AdminPendingMembers() {
  const [pending, setPending] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchPending = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await apiClient.get('/admin/members/pending')
      setPending(res.data || [])
    } catch (e) {
      setError(e.message || 'Failed to load pending members')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPending()
  }, [])

  const approve = async (id) => {
    try {
      await apiClient.post(`/admin/members/${id}/approve`, {})
      fetchPending()
      alert('Member approved')
    } catch (e) {
      alert(e.message || 'Approve failed')
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Pending Member Approvals</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid gap-4">
          {pending.length === 0 && <p>No pending members.</p>}
          {pending.map((m) => (
            <div key={m.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{m.name} ({m.email || 'no-email'})</p>
                  <p className="text-sm text-slate-500">Phone: {m.phone || 'N/A'}</p>
                  <p className="text-sm text-slate-500">Submitted: {new Date(m.created_at).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => approve(m.id)} className="rounded bg-green-600 px-3 py-2 text-white">Approve</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
