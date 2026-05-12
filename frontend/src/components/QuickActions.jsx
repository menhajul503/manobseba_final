import { Plus, FileText, Users, Gift } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function QuickActions() {
  const navigate = useNavigate()

  const actions = [
    {
      icon: Gift,
      label: 'Record Donation',
      color: 'bg-blue-100 text-blue-600',
      action: () => navigate('/donations')
    },
    {
      icon: Users,
      label: 'Add Member',
      color: 'bg-green-100 text-primary-green',
      action: () => navigate('/members')
    },
    {
      icon: FileText,
      label: 'Create Notice',
      color: 'bg-orange-100 text-orange-600',
      action: () => navigate('/notices')
    },
    {
      icon: Plus,
      label: 'New Distribution',
      color: 'bg-purple-100 text-purple-600',
      action: () => navigate('/distributions')
    }
  ]

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action, idx) => {
          const Icon = action.icon
          return (
            <button
              key={idx}
              onClick={action.action}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-primary-light transition-all text-left"
            >
              <div className={`${action.color} p-2 rounded-lg`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="font-medium text-slate-700">{action.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
