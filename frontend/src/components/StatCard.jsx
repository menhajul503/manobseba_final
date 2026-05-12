import { TrendingUp } from 'lucide-react'

export default function StatCard({ title, value, currency, change, icon: Icon, bgColor, textColor }) {
  const isPositive = change.startsWith('+')

  return (
    <div className="card flex items-start justify-between">
      <div>
        <p className="text-slate-gray text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold text-slate-900 mt-2">{value}</h3>
        <p className={`text-sm font-medium mt-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {change} from last month
        </p>
      </div>
      <div className={`${bgColor} ${textColor} p-3 rounded-xl`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  )
}
