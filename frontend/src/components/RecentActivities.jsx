import { Activity } from 'lucide-react'

export default function RecentActivities({ activities }) {
  const getBadgeClass = (type) => {
    switch (type) {
      case 'Donation':
        return 'badge-donation'
      case 'Distribution':
        return 'badge-distribution'
      case 'Member':
        return 'badge-member'
      case 'Notice':
        return 'badge-notice'
      default:
        return 'badge-member'
    }
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Recent Activities</h3>
          <p className="text-slate-gray text-sm mt-1">Latest transactions and updates</p>
        </div>
        <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
          <Activity className="w-6 h-6" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-700 uppercase">Type</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-700 uppercase">Description</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-slate-700 uppercase">Amount</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-700 uppercase">Date & Time</th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-slate-700 uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id} className="border-b border-gray-50 hover:bg-primary-light transition-all">
                <td className="py-4 px-4">
                  <span className={`badge ${getBadgeClass(activity.type)}`}>
                    {activity.type}
                  </span>
                </td>
                <td className="py-4 px-4 text-slate-700 font-medium">{activity.description}</td>
                <td className="py-4 px-4 text-right font-semibold text-slate-900">
                  {activity.amount}
                </td>
                <td className="py-4 px-4 text-slate-gray text-sm">{activity.date}</td>
                <td className="py-4 px-4 text-center">
                  <span className={activity.status === 'Completed' ? 'badge-donation' : 'badge-member'}>
                    {activity.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
