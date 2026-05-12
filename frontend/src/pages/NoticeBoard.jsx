import { useState } from 'react'
import { Bell, Plus, Trash2, AlertCircle } from 'lucide-react'

export default function NoticeBoard() {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: 'Board Meeting Scheduled',
      content: 'The management board meeting is scheduled for May 20th at 3:00 PM. All members are requested to attend.',
      priority: 'High',
      author: 'Admin',
      date: '2024-05-12 02:30 PM',
      active: true
    },
    {
      id: 2,
      title: 'Eid Festival Celebration',
      content: 'Community Eid celebration will be held on April 11th. Join us for prayers and community feast.',
      priority: 'Medium',
      author: 'Md. Ahmed Hassan',
      date: '2024-05-10 10:15 AM',
      active: true
    },
    {
      id: 3,
      title: 'Fund Update for Medical Emergency',
      content: 'Urgent collection for medical emergency of Nasim Khan. Contributions can be made via bKash or Cash.',
      priority: 'High',
      author: 'Admin',
      date: '2024-05-08 04:45 PM',
      active: true
    },
    {
      id: 4,
      title: 'Monthly Collection Reminder',
      content: 'Please ensure monthly fund contributions are paid by the 25th of each month. Thank you for your cooperation.',
      priority: 'Low',
      author: 'Finance Team',
      date: '2024-05-01 09:00 AM',
      active: false
    }
  ])

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'Medium'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newNotice = {
      id: notices.length + 1,
      title: formData.title,
      content: formData.content,
      priority: formData.priority,
      author: 'Current User',
      date: new Date().toLocaleString(),
      active: true
    }

    setNotices([newNotice, ...notices])
    setFormData({ title: '', content: '', priority: 'Medium' })
  }

  const deleteNotice = (id) => {
    setNotices(notices.filter(notice => notice.id !== id))
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-600 border-l-4 border-l-red-600'
      case 'Medium': return 'bg-yellow-100 text-yellow-600 border-l-4 border-l-yellow-600'
      case 'Low': return 'bg-green-100 text-primary-green border-l-4 border-l-primary-green'
      default: return 'bg-gray-100 text-slate-gray border-l-4 border-l-gray-400'
    }
  }

  const getPriorityBadgeColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-600'
      case 'Medium': return 'bg-yellow-100 text-yellow-600'
      case 'Low': return 'bg-green-100 text-primary-green'
      default: return 'bg-gray-100 text-slate-gray'
    }
  }

  const activeNotices = notices.filter(n => n.active)
  const inactiveNotices = notices.filter(n => !n.active)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Notice Board</h1>
          <p className="text-slate-gray mt-1">Post and manage community announcements</p>
        </div>
        <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
          <Bell className="w-6 h-6" />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Create Notice Form */}
        <div className="card">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Post Notice
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Notice title..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Write your notice here..."
                rows="6"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green resize-none"
                required
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Priority Level</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-primary w-full">
              Post Notice
            </button>
          </form>
        </div>

        {/* Right - Notice Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Active Announcements</h3>

            {activeNotices.length > 0 ? (
              <div className="space-y-4">
                {activeNotices.map((notice) => (
                  <div
                    key={notice.id}
                    className={`p-6 rounded-xl ${getPriorityColor(notice.priority)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold text-slate-900">{notice.title}</h4>
                          <span className={`badge ${getPriorityBadgeColor(notice.priority)}`}>
                            {notice.priority}
                          </span>
                        </div>
                        <p className="text-slate-700 mb-3">{notice.content}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">
                            By <strong>{notice.author}</strong> • {notice.date}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => deleteNotice(notice.id)}
                        className="ml-4 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-white rounded-xl">
                <AlertCircle className="w-12 h-12 text-slate-gray mx-auto mb-3 opacity-50" />
                <p className="text-slate-gray">No active announcements at the moment.</p>
              </div>
            )}
          </div>

          {/* Archived Notices */}
          {inactiveNotices.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Archived Announcements</h3>
              <div className="space-y-3">
                {inactiveNotices.map((notice) => (
                  <div key={notice.id} className="p-4 bg-white rounded-xl border border-gray-100 opacity-75">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-slate-700">{notice.title}</h4>
                        <p className="text-sm text-slate-600 mt-1">{notice.date}</p>
                      </div>
                      <span className={`badge ${getPriorityBadgeColor(notice.priority)}`}>
                        {notice.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
