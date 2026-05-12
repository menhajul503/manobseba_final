import { useState } from 'react'
import { Users, Plus, Search, Filter } from 'lucide-react'

export default function Members() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterVillage, setFilterVillage] = useState('all')

  // Sample data
  const members = [
    { id: 1, name: 'Md. Ahmed Hassan', village: 'Narayanganj', status: 'Active', joinDate: '2023-01-15', email: 'ahmed@example.com' },
    { id: 2, name: 'Fatima Begum', village: 'Dhaka', status: 'Active', joinDate: '2023-02-20', email: 'fatima@example.com' },
    { id: 3, name: 'Abdul Karim', village: 'Chittagong', status: 'Inactive', joinDate: '2022-12-10', email: 'karim@example.com' },
    { id: 4, name: 'Nasrin Ahmed', village: 'Narayanganj', status: 'Active', joinDate: '2023-03-05', email: 'nasrin@example.com' },
    { id: 5, name: 'Hasan Ali', village: 'Sylhet', status: 'Active', joinDate: '2023-01-25', email: 'hasan@example.com' },
    { id: 6, name: 'Zainab Khan', village: 'Dhaka', status: 'Inactive', joinDate: '2022-11-30', email: 'zainab@example.com' },
    { id: 7, name: 'Karim Uddin', village: 'Chittagong', status: 'Active', joinDate: '2023-02-14', email: 'karim.u@example.com' },
    { id: 8, name: 'Amina Begum', village: 'Narayanganj', status: 'Active', joinDate: '2023-04-01', email: 'amina@example.com' }
  ]

  const villages = ['all', ...new Set(members.map(m => m.village))]
  
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus
    const matchesVillage = filterVillage === 'all' || member.village === filterVillage
    return matchesSearch && matchesStatus && matchesVillage
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Members</h1>
          <p className="text-slate-gray mt-1">Manage and track all community members</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Member
        </button>
      </div>

      {/* Filters */}
      <div className="card space-y-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-slate-gray" />
          <span className="font-semibold text-slate-900">Filters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Search */}
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

          {/* Status Filter */}
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

          {/* Village Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Village</label>
            <select
              value={filterVillage}
              onChange={(e) => setFilterVillage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
            >
              {villages.map(village => (
                <option key={village} value={village}>
                  {village === 'all' ? 'All Villages' : village}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center gap-2 text-slate-gray text-sm">
        <Users className="w-5 h-5" />
        <span>Showing <strong>{filteredMembers.length}</strong> members</span>
      </div>

      {/* Members Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-primary-light">
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Name</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Email</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Village</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Joined</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-slate-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="border-b border-gray-100 hover:bg-primary-light transition-all">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-slate-900">{member.name}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-700 text-sm">{member.email}</td>
                    <td className="py-4 px-6 text-slate-700">{member.village}</td>
                    <td className="py-4 px-6">
                      <span className={`badge ${member.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-700 text-sm">{member.joinDate}</td>
                    <td className="py-4 px-6 text-center">
                      <button className="text-primary-green hover:text-primary-dark font-medium text-sm">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-gray">
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
