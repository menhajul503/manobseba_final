// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const apiClient = {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('authToken')
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers
      })

      if (response.status === 401) {
        localStorage.removeItem('authToken')
        window.location.href = '/login'
      }

      const data = await response.json()
      if (!response.ok) {
        const error = new Error(data.message || 'API request failed')
        error.response = { data, status: response.status }
        throw error
      }

      return data
    } catch (err) {
      if (err instanceof TypeError) {
        throw new Error('Failed to connect to server. Please ensure the backend is running.')
      }
      throw err
    }
  },

  get(endpoint) {
    return this.request(endpoint)
  },

  post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body)
    })
  },

  put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body)
    })
  },

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' })
  }
}

export default apiClient
