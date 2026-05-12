import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Mail, MapPin, CheckCircle, Clock } from 'lucide-react'
import { fetchMember, deleteMember } from '../api/services'
import { formatCurrency } from '../utils/helpers'

export default function MemberDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [member, setMember] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const donationTotal =
    member?.total_contribution ??
    member?.donations?.reduce((sum, donation) => sum + Number(donation.amount || 0), 0) ??
    0

  useEffect(() => {
    loadMember()
  }, [id])

  const loadMember = async () => {
    setLoading(true)
    try {
      const data = await fetchMember(id)
      setMember(data)
    } catch (error) {
      setErrorMessage(error.message || 'Unable to load member.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this member?')
    if (!confirmed || !member) return

    try {
      await deleteMember(member.id)
      navigate('/members', { state: { success: 'Member deleted successfully.' } })
    } catch (error) {
      setErrorMessage(error.message || 'Could not delete member.')
    }
  }

  if (!member) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Member details</h1>
            <p className="text-slate-gray mt-1">
              {loading ? 'Loading member details...' : errorMessage || 'Check the selected member and try again.'}
            </p>
          </div>
          <button type="button" onClick={() => navigate('/members')} className="btn-secondary">
            Back to Members
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Member Details</h1>
          <p className="text-slate-gray mt-1">View the selected member’s complete profile.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => navigate('/members')} className="btn-secondary flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Members
          </button>
          <button type="button" onClick={() => navigate(`/members/${member.id}/edit`)} className="btn-secondary">
            Edit Member
          </button>
          <button type="button" onClick={handleDelete} className="text-red-600 hover:text-red-800 font-medium text-sm">
            Delete
          </button>
        </div>
      </div>

      <div className="card grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-primary-light rounded-xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative h-20 w-20 rounded-full overflow-hidden bg-primary-green/10">
              {member.image ? (
                <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xl font-semibold text-primary-green">
                  {member.name.split(' ').map((word) => word[0]).join('').slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <p className="text-sm text-slate-gray">Member ID</p>
              <p className="text-xl font-semibold text-slate-900">{member.id}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-gray">Status</p>
              <span className={`badge ${member.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>{member.status}</span>
            </div>
            <div>
              <p className="text-sm text-slate-gray">Role</p>
              <p className="text-slate-900 font-medium">{member.role || 'Support'}</p>
            </div>
            <div>
              <p className="text-sm text-slate-gray">Total Donations</p>
              <p className="text-slate-900 font-medium">{formatCurrency(donationTotal)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-gray">Joined</p>
              <p className="text-slate-900 font-medium">{member.joinDate}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 card p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">{member.name}</h2>
              <p className="text-slate-gray">Community member profile details.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-slate-gray">Email</p>
                    <p className="text-slate-900 font-medium">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary-green" />
                  <div>
                    <p className="text-sm text-slate-gray">Village</p>
                    <p className="text-slate-900 font-medium">{member.village}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-slate-gray">Status</p>
                    <p className="text-slate-900 font-medium">{member.status}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-slate-gray">Joined</p>
                    <p className="text-slate-900 font-medium">{member.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
