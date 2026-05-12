import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Users, Plus, Search, Filter } from 'lucide-react'
import { fetchMembers, deleteMember as deleteMemberApi } from '../api/services'
import { getMemberCode } from '../utils/helpers'

export default function Members() {
  const location = useLocation()
  const navigate = useNavigate()
  const [members, setMembers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterVillage, setFilterVillage] = useState('all')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    loadMembers()

    if (location.state?.success) {
      setSuccessMessage(location.state.success)
      window.history.replaceState(null, '')
    }
  }, [location.state])

  const loadMembers = async () => {
    setLoading(true)
    setErrorMessage('')

    try {
      const list = await fetchMembers({ per_page: 100 })
      setMembers(list)
    } catch (error) {
      setErrorMessage(error.message || 'Unable to load members.')
    } finally {
      setLoading(false)
    }
  }

  const deleteMember = async (memberId) => {
    const confirmed = window.confirm('Are you sure you want to delete this member?')
    if (!confirmed) return

    try {
      await deleteMemberApi(memberId)
      await loadMembers()
      setSuccessMessage('Member deleted successfully.')
    } catch (error) {
      setErrorMessage(error.message || 'Could not delete member.')
    }
  }

  const villages = ['all', ...new Set(members.map((m) => m.village || ''))]

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus
    const matchesVillage = filterVillage === 'all' || (member.village || '') === filterVillage
    return matchesSearch && matchesStatus && matchesVillage
  })

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Members</h1>
            <p className="text-slate-gray mt-1">Manage and track all community members</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/members/add')}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Member
          </button>
        </div>

        {successMessage && (
          <div className="alert-success">
            <p className="font-semibold">Success</p>
            <p className="text-sm">{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div className="alert-danger">
            {errorMessage}
          </div>
        )}
      </div>

      <div className="card space-y-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-slate-gray" />
          <span className="font-semibold text-slate-900">Filters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-gray" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Name or email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Village</label>
            <select
              value={filterVillage}
              onChange={(e) => setFilterVillage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
            >
              {villages.map((village) => (
                <option key={village} value={village}>
                  {village === 'all' ? 'All Villages' : village}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-slate-gray text-sm">
        <Users className="w-5 h-5" />
        <span>Showing <strong>{filteredMembers.length}</strong> members</span>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-primary-light">
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Member ID</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Name</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Email</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Village</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Role</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Joined</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-slate-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-gray">
                    Loading members...
                  </td>
                </tr>
              ) : filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="border-b border-gray-100 hover:bg-primary-light transition-all">
                    <td className="py-4 px-6 text-slate-700 text-sm">{getMemberCode(member.id)}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {member.image ? (
                          <img src={member.image} alt={member.name} className="h-10 w-10 rounded-full object-cover" />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-green/10 text-primary-green font-semibold">
                            {member.name.split(' ').map((word) => word[0]).join('').slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-slate-900">{member.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-700 text-sm">{member.email}</td>
                    <td className="py-4 px-6 text-slate-700">{member.village}</td>
                    <td className="py-4 px-6">
                      <span className={`badge ${member.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-700 text-sm">{member.role || 'Support'}</td>
                    <td className="py-4 px-6 text-slate-700 text-sm">{member.join_date ?? member.joinDate}</td>
                    <td className="py-4 px-6 text-center space-x-2">
                      <button
                        type="button"
                        onClick={() => navigate(`/members/${member.id}`)}
                        className="text-primary-green hover:text-primary-dark font-medium text-sm"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate(`/members/${member.id}/edit`)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteMember(member.id)}
                        className="text-red-600 hover:text-red-800 font-medium text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-gray">
                    No members found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
