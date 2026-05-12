import apiClient from './client'

const parseResponse = (response) => {
  if (response?.success) return response.data
  return response
}

const parseCollection = (payload) => {
  if (!payload) return []
  if (Array.isArray(payload)) return payload
  if (payload.data && Array.isArray(payload.data)) return payload.data
  return []
}

export const fetchMembers = async (params = {}) => {
  const query = new URLSearchParams(params).toString()
  const response = await apiClient.get(`/members${query ? `?${query}` : ''}`)
  return parseCollection(parseResponse(response))
}

export const fetchMember = async (id) => {
  const response = await apiClient.get(`/members/${id}`)
  return parseResponse(response)
}

export const createMember = async (data) => {
  const response = await apiClient.post('/members', data)
  return parseResponse(response)
}

export const updateMember = async (id, data) => {
  const response = await apiClient.put(`/members/${id}`, data)
  return parseResponse(response)
}

export const deleteMember = async (id) => {
  const response = await apiClient.delete(`/members/${id}`)
  return parseResponse(response)
}

export const fetchDonations = async (params = {}) => {
  const query = new URLSearchParams(params).toString()
  const response = await apiClient.get(`/donations${query ? `?${query}` : ''}`)
  return parseCollection(parseResponse(response))
}

export const createDonation = async (data) => {
  const response = await apiClient.post('/donations', data)
  return parseResponse(response)
}

export const fetchTotalDonations = async () => {
  const response = await apiClient.get('/statistics/total-donations')
  return parseResponse(response)?.total ?? 0
}

export const fetchActiveMemberCount = async () => {
  const response = await apiClient.get('/statistics/active-members')
  return parseResponse(response)?.count ?? 0
}

export const fetchMonthlyDonations = async () => {
  const response = await apiClient.get('/statistics/monthly-donations')
  return parseResponse(response)
}
