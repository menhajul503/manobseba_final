import { useState } from 'react'
import { Share2, Plus, ChevronDown, ChevronUp } from 'lucide-react'

export default function Distributions() {
  const [expandedId, setExpandedId] = useState(null)

  // Sample distributions/programs
  const distributions = [
    {
      id: 1,
      program: 'Eid-ul-Fitr Food Package',
      description: 'Food and essential items distribution during Eid festival',
      status: 'In Progress',
      totalBudget: '৳25,000',
      totalSpent: '৳18,500',
      progress: 74,
      recipients: 35,
      recipients_list: [
        { name: 'Md. Ahmed Hassan', amount: '৳500', date: '2024-05-10' },
        { name: 'Fatima Begum', amount: '৳500', date: '2024-05-10' },
        { name: 'Nasrin Ahmed', amount: '৳500', date: '2024-05-11' }
      ]
    },
    {
      id: 2,
      program: 'School Scholarship Program',
      description: 'Monthly scholarship support for needy students',
      status: 'Completed',
      totalBudget: '৳30,000',
      totalSpent: '৳30,000',
      progress: 100,
      recipients: 50,
      recipients_list: [
        { name: 'Karim Uddin (Student)', amount: '৳600', date: '2024-05-01' },
        { name: 'Zainab Khan (Student)', amount: '৳600', date: '2024-05-01' },
        { name: 'Ahmed Ali (Student)', amount: '৳600', date: '2024-05-01' }
      ]
    },
    {
      id: 3,
      program: 'Medical Aid Fund',
      description: 'Support for members facing medical emergencies',
      status: 'Pending',
      totalBudget: '৳40,000',
      totalSpent: '৳12,000',
      progress: 30,
      recipients: 15,
      recipients_list: [
        { name: 'Abdul Karim', amount: '৳2,000', date: '2024-04-15' },
        { name: 'Hasan Ali', amount: '৳3,000', date: '2024-04-20' },
        { name: 'Amina Begum', amount: '৳2,500', date: '2024-05-05' }
      ]
    },
    {
      id: 4,
      program: 'Housing Repair Assistance',
      description: 'Support for home repairs and maintenance for low-income members',
      status: 'In Progress',
      totalBudget: '৳35,000',
      totalSpent: '৳22,000',
      progress: 63,
      recipients: 8,
      recipients_list: [
        { name: 'Nasim Khan', amount: '৳5,000', date: '2024-04-01' },
        { name: 'Rashida Ahmed', amount: '৳4,500', date: '2024-04-10' },
        { name: 'Rahim Hassan', amount: '৳4,000', date: '2024-04-20' }
      ]
    }
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-primary-green'
      case 'In Progress': return 'bg-blue-100 text-blue-600'
      case 'Pending': return 'bg-orange-100 text-orange-600'
      default: return 'bg-gray-100 text-slate-gray'
    }
  }

  const getProgressBarColor = (progress) => {
    if (progress >= 75) return 'bg-green-500'
    if (progress >= 50) return 'bg-blue-500'
    return 'bg-orange-500'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Distributions</h1>
          <p className="text-slate-gray mt-1">Manage fund distribution programs and track recipients</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Program
        </button>
      </div>

      {/* Distributions List */}
      <div className="space-y-4">
        {distributions.map((dist) => (
          <div key={dist.id} className="card">
            {/* Header */}
            <div
              onClick={() => setExpandedId(expandedId === dist.id ? null : dist.id)}
              className="flex items-start justify-between cursor-pointer hover:bg-primary-light p-4 -m-4 rounded-xl"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-slate-900">{dist.program}</h3>
                  <span className={`badge ${getStatusColor(dist.status)}`}>
                    {dist.status}
                  </span>
                </div>
                <p className="text-slate-gray text-sm">{dist.description}</p>

                {/* Progress Bar */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Progress</span>
                    <span className="text-sm font-semibold text-slate-900">{dist.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${getProgressBarColor(dist.progress)} rounded-full h-2 transition-all`}
                      style={{ width: `${dist.progress}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-slate-gray">Total Budget</p>
                    <p className="text-lg font-bold text-slate-900">{dist.totalBudget}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-gray">Spent</p>
                    <p className="text-lg font-bold text-slate-900">{dist.totalSpent}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-gray">Recipients</p>
                    <p className="text-lg font-bold text-slate-900">{dist.recipients}</p>
                  </div>
                </div>
              </div>

              {/* Toggle Button */}
              <div className="ml-4 text-slate-gray">
                {expandedId === dist.id ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
              </div>
            </div>

            {/* Expanded Recipients List */}
            {expandedId === dist.id && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="font-semibold text-slate-900 mb-4">Recent Recipients</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-3 px-4 font-medium text-slate-700">Recipient Name</th>
                        <th className="text-right py-3 px-4 font-medium text-slate-700">Amount</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-700">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dist.recipients_list.map((recipient, idx) => (
                        <tr key={idx} className="border-b border-gray-50 hover:bg-primary-light">
                          <td className="py-3 px-4 text-slate-900">{recipient.name}</td>
                          <td className="py-3 px-4 text-right font-medium text-slate-900">{recipient.amount}</td>
                          <td className="py-3 px-4 text-slate-700">{recipient.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-3">
                  <button className="btn-sm px-6 bg-primary-green text-white">
                    View All Recipients
                  </button>
                  <button className="btn-sm px-6 bg-white border-2 border-primary-green text-primary-green">
                    Edit Program
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
