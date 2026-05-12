import { useEffect, useState } from 'react'
import { ArrowLeft, Plus } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchMember, updateMember } from '../api/services'

export default function EditMember() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    memberId: '',
    name: '',
    email: '',
    phone: '',
    village: '',
    address: '',
    status: 'Active',
    role: 'Support',
    image: '',
    joinDate: '',
    notes: ''
  })
  const [originalId, setOriginalId] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadMember()
  }, [id])

  const loadMember = async () => {
    try {
      const member = await fetchMember(id)
      if (!member) {
        setOriginalId('')
        return
      }

      setFormData({
        memberId: String(member.id),
        name: member.name || '',
        email: member.email || '',
        phone: member.phone || '',
        village: member.village || '',
        address: member.address || '',
        status: member.status || 'Active',
        role: member.role || 'Support',
        image: member.image || '',
        joinDate: member.join_date || member.joinDate || new Date().toISOString().split('T')[0],
        notes: member.notes || ''
      })
      setOriginalId(String(member.id))
    } catch (error) {
      console.error(error)
      setOriginalId('')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, image: reader.result || '' }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setLoading(true)

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        village: formData.village,
        address: formData.address,
        status: formData.status,
        role: formData.role,
        image: formData.image,
        join_date: formData.joinDate,
        notes: formData.notes
      }

      await updateMember(id, payload)
      navigate('/members', { state: { success: `${formData.name} updated successfully.` } })
    } catch (error) {
      setErrorMessage(error.message || 'Could not update member. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!originalId) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Member not found</h1>
            <p className="text-slate-gray mt-1">The member you are trying to edit does not exist.</p>
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Edit Member</h1>
          <p className="text-slate-gray mt-1">Update the member details and save changes.</p>
        </div>
        <button
          type="button"
          onClick={() => navigate(`/members/${originalId}`)}
          className="btn-secondary flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Member ID</label>
              <input
                name="memberId"
                type="text"
                value={formData.memberId}
                disabled
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-slate-100 text-slate-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
              <input
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Village</label>
              <input
                name="village"
                type="text"
                value={formData.village}
                onChange={handleChange}
                placeholder="Enter village"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
              <input
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
              >
                <option value="Support">Support</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-slate-700"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Member Preview"
                  className="mt-3 h-24 w-24 rounded-full object-cover border border-gray-200"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Join Date</label>
              <input
                name="joinDate"
                type="date"
                value={formData.joinDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              placeholder="Optional notes"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green resize-none"
            />
          </div>

          {errorMessage && (
            <div className="alert-danger">
              {errorMessage}
            </div>
          )}

          <button type="submit" className="btn-primary inline-flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}
