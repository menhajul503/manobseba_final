import { useEffect, useState } from 'react'
import { TrendingUp, Users, Gift, Share2 } from 'lucide-react'
import StatCard from '../components/StatCard'
import RecentActivities from '../components/RecentActivities'
import IncomeVsExpenseChart from '../components/IncomeVsExpenseChart'
import QuickActions from '../components/QuickActions'
import apiClient from '../api/client'

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await apiClient.get('/dashboard')
        setDashboardData(response.data)
      } catch (err) {
        setError(err.message || 'Unable to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-lg font-medium text-slate-700">
        Loading dashboard...
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center p-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Unable to load dashboard</h2>
          <p className="mt-3 text-slate-600">{error}</p>
        </div>
      </div>
    )
  }

  const stats = [
    {
      title: 'Total Fund',
      value: `৳${Number(dashboardData.stats.total_fund).toLocaleString()}`,
      change: '+',
      icon: Gift,
      bgColor: 'bg-green-100',
      textColor: 'text-primary-green'
    },
    {
      title: 'Total Members',
      value: Number(dashboardData.stats.total_members).toLocaleString(),
      change: '+',
      icon: Users,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Donations',
      value: `৳${Number(dashboardData.stats.total_donations).toLocaleString()}`,
      change: '+',
      icon: TrendingUp,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      title: 'Total Distribution',
      value: `৳${Number(dashboardData.stats.total_distributions).toLocaleString()}`,
      change: '+',
      icon: Share2,
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome back!</h1>
        <p className="text-slate-gray mt-1">Here's what's happening in your fund today.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <IncomeVsExpenseChart
            months={dashboardData.chart.months}
            incomeData={dashboardData.chart.incomeData}
            expenseData={dashboardData.chart.expenseData}
          />
        </div>
        <QuickActions />
      </div>

      {/* Recent Activities */}
      <RecentActivities activities={dashboardData.recentActivities} />
    </div>
  )
}
