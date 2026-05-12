import { useState, useCallback } from 'react'
import apiClient from '../api/client'

export function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (endpoint, options = {}) => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiClient.get(endpoint)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const post = useCallback(async (endpoint, data) => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiClient.post(endpoint, data)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const put = useCallback(async (endpoint, data) => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiClient.put(endpoint, data)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const remove = useCallback(async (endpoint) => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiClient.delete(endpoint)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { request, post, put, remove, loading, error }
}
