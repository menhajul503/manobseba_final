import { BarChart3 } from 'lucide-react'

export default function IncomeVsExpenseChart({ months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'], incomeData = [45000, 52000, 48000, 61000, 58000], expenseData = [28000, 35000, 32000, 41000, 38000] }) {
  const maxValue = Math.max(...incomeData, ...expenseData, 1)
  const scale = 100 / maxValue

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Income vs Expense</h3>
          <p className="text-slate-gray text-sm mt-1">Monthly fund flow analysis</p>
        </div>
        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
          <BarChart3 className="w-6 h-6" />
        </div>
      </div>

      {/* Chart */}
      <div className="space-y-6">
        {months.map((month, idx) => (
          <div key={month} className="space-y-2">
            <div className="flex items-end gap-4">
              {/* Income Bar */}
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-slate-700">Income</span>
                  <span className="text-xs font-semibold text-green-600">৳{Number(incomeData[idx] || 0).toLocaleString()}</span>
                </div>
                <div className="bg-primary-light rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-primary-green rounded-full h-full transition-all"
                    style={{ width: `${(Number(incomeData[idx] || 0) * scale) || 0}%` }}
                  />
                </div>
              </div>

              {/* Expense Bar */}
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-slate-700">Expense</span>
                  <span className="text-xs font-semibold text-orange-600">৳{Number(expenseData[idx] || 0).toLocaleString()}</span>
                </div>
                <div className="bg-primary-light rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-orange-500 rounded-full h-full transition-all"
                    style={{ width: `${(Number(expenseData[idx] || 0) * scale) || 0}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Month Label */}
            <p className="text-xs text-slate-gray font-medium">{month}</p>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-8 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary-green rounded-full"></div>
          <span className="text-xs text-slate-gray">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-xs text-slate-gray">Expense</span>
        </div>
      </div>
    </div>
  )
}
