'use client'

import { useState, useEffect, useCallback } from 'react'
import { CarWithBrand, SearchFilters } from '@/types'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  return debouncedValue
}

export function useCars(filters?: SearchFilters) {
  const [cars, setCars] = useState<CarWithBrand[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCars = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== '') params.append(key, String(value))
        })
      }
      const res = await fetch(`/api/cars?${params}`)
      if (!res.ok) throw new Error('Failed to fetch cars')
      const data = await res.json()
      setCars(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => { fetchCars() }, [fetchCars])

  return { cars, loading, error, refetch: fetchCars }
}

export function useCar(slug: string) {
  const [car, setCar] = useState<CarWithBrand | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    fetch(`/api/cars/${slug}`)
      .then(res => res.json())
      .then(data => { setCar(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [slug])

  return { car, loading }
}
