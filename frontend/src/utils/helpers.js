// Format currency with Bengali Taka symbol
export const formatCurrency = (amount) => {
  if (!amount) return '৳0'
  return '৳' + parseFloat(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

// Format date to readable format
export const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Format datetime to readable format
export const formatDateTime = (datetime) => {
  if (!datetime) return '-'
  return new Date(datetime).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Generate receipt ID
export const generateReceiptId = () => {
  const date = new Date()
  const year = date.getFullYear()
  const random = Math.random().toString(36).substring(2, 10).toUpperCase()
  return `RCP-${year}-${random}`
}

// Validate email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone number (Bangladesh format)
export const validatePhone = (phone) => {
  const phoneRegex = /^(?:\+880|0)?1[3-9]\d{8}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Calculate percentage
export const calculatePercentage = (current, total) => {
  if (total === 0) return 0
  return Math.round((current / total) * 100)
}

// Format large numbers
export const formatNumber = (num) => {
  if (!num) return '0'
  return num.toLocaleString('en-US')
}

// Get initials from name
export const getInitials = (name) => {
  if (!name) return 'NA'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
}

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken')
}

// Get user from localStorage
export const getUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

// Get token
export const getToken = () => {
  return localStorage.getItem('authToken')
}

// Check if user is admin
export const isAdmin = () => {
  const user = getUser()
  return user?.role === 'admin'
}

// Debounce function for search
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Deep copy object
export const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

export const getMemberCode = (id) => {
  if (!id) return 'MS000'
  return `MS${String(id).padStart(3, '0')}`
}

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken')
}

// Get user from localStorage
export const getUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

// Get token
export const getToken = () => {
  return localStorage.getItem('authToken')
}

// Check if user is admin
export const isAdmin = () => {
  const user = getUser()
  return user?.role === 'admin'
}

// Debounce function for search
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Deep copy object
export const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}
