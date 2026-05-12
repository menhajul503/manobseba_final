import { useState } from 'react'
import { Gift, TrendingUp, Filter, Search } from 'lucide-react'
import { getDonationHistory, formatCurrency } from '../utils/helpers'

export default function Donations() {
  const [formData, setFormData] = useState({
    memberName: '',
    amount: '',
    paymentMethod: 'Cash',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [filterMethod, setFilterMethod] = useState('all')

  const donationHistory = getDonationHistory()

  const paymentMethods = ['Cash', 'bKash', 'Nagad']

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({
      memberName: '',
      amount: '',
      paymentMethod: 'Cash',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    })
  }

  const filteredDonations = donationHistory.filter(donation => {
    const matchesSearch = donation.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          donation.receiptId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMethod = filterMethod === 'all' || donation.method === filterMethod
    return matchesSearch && matchesMethod
  })

  const getPaymentMethodColor = (method) => {
    switch(method) {
      case 'bKash': return 'bg-pink-100 text-pink-600'
      case 'Nagad': return 'bg-yellow-100 text-yellow-600'
      case 'Cash': return 'bg-green-100 text-primary-green'
      default: return 'bg-gray-100 text-slate-gray'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Donations</h1>
          <p className="text-slate-gray mt-1">Record and manage community donations</p>
        </div>
        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
          <Gift className="w-6 h-6" />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Record New Donation Form */}
        <div className="card">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Record New Donation</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Member Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Member Name</label>
              <input
                type="text"
                name="memberName"
                value={formData.memberName}
                onChange={handleInputChange}
                placeholder="Select or type member name"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Amount (৳)</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                required
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
              >
                {paymentMethods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                required
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Notes (Optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Additional notes..."
                rows="3"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green resize-none"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-primary w-full">
              Record Donation
            </button>
          </form>
        </div>

        {/* Right - Donation History */}
        <div className="lg:col-span-2 card">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Donation History</h3>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-gray" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search donor or receipt..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                />
              </div>

              <select
                value={filterMethod}
                onChange={(e) => setFilterMethod(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
              >
                <option value="all">All Payment Methods</option>
                {paymentMethods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>
          </div>

          {/* History Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-primary-light">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Receipt ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Donor</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Method</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.length > 0 ? (
                  filteredDonations.map((donation) => (
                    <tr key={donation.id} className="border-b border-gray-100 hover:bg-primary-light transition-all">
                      <td className="py-3 px-4 font-medium text-slate-900">{donation.receiptId}</td>
                      <td className="py-3 px-4 text-slate-700">{donation.donor}</td>
                      <td className="py-3 px-4 text-right font-semibold text-slate-900">{formatCurrency(donation.amount)}</td>
                      <td className="py-3 px-4">
                        <span className={`badge ${getPaymentMethodColor(donation.method)}`}>
                          {donation.method}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-700 text-xs">{donation.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-gray">
                      No donations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
