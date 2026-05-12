import { TrendingUp, TrendingDown, Users, Gift, Share2, Activity } from 'lucide-react'
import StatCard from '../components/StatCard'
import RecentActivities from '../components/RecentActivities'
import IncomeVsExpenseChart from '../components/IncomeVsExpenseChart'
import QuickActions from '../components/QuickActions'

export default function Dashboard() {
  // Sample data
  const stats = [
    {
      title: 'Total Fund',
      value: '৳125,450',
      currency: '৳',
      change: '+12.5%',
      icon: Gift,
      bgColor: 'bg-green-100',
      textColor: 'text-primary-green'
    },
    {
      title: 'Total Members',
      value: '847',
      change: '+8.2%',
      icon: Users,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      title: 'Monthly Donation',
      value: '৳45,200',
      currency: '৳',
      change: '+15.3%',
      icon: TrendingUp,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      title: 'Total Distribution',
      value: '৳32,150',
      currency: '৳',
      change: '+5.8%',
      icon: Share2,
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'Donation',
      description: 'Received donation from Md. Rahman',
      amount: '৳5,000',
      date: '2024-05-12 10:30 AM',
      status: 'Completed'
    },
    {
      id: 2,
      type: 'Distribution',
      description: 'Distributed for Eid-ul-Fitr Food Package',
      amount: '৳2,500',
      date: '2024-05-11 03:15 PM',
      status: 'Completed'
    },
    {
      id: 3,
      type: 'Member',
      description: 'New member added: Fatima Ahmed',
      amount: '-',
      date: '2024-05-10 09:00 AM',
      status: 'Active'
    },
    {
      id: 4,
      type: 'Notice',
      description: 'Board meeting scheduled for May 20th',
      amount: '-',
      date: '2024-05-09 02:30 PM',
      status: 'Active'
    },
    {
      id: 5,
      type: 'Donation',
      description: 'Received donation from Nasim Khan',
      amount: '৳3,000',
      date: '2024-05-08 11:45 AM',
      status: 'Completed'
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
          <IncomeVsExpenseChart />
        </div>
        <QuickActions />
      </div>

      {/* Recent Activities */}
      <RecentActivities activities={recentActivities} />
    </div>
  )
}
