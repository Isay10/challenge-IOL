import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useExchangeRates, __clearRatesCache } from './useExchangeRates'
import * as currencyApi from '../api/currencyApi'

// Mock the API
vi.mock('../api/currencyApi')

describe('useExchangeRates', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    __clearRatesCache()
  })

  it('returns initial loading state', () => {
    vi.mocked(currencyApi.getRates).mockImplementation(() => new Promise(() => {}))

    const { result } = renderHook(() => useExchangeRates('USD'))

    expect(result.current.loading).toBe(true)
    expect(result.current.rates).toEqual({})
    expect(result.current.error).toBeNull()
  })

  it('fetches rates for a given base currency', async () => {
    const mockRates = { EUR: 0.92, GBP: 0.79 }
    vi.mocked(currencyApi.getRates).mockResolvedValue({
      base: 'USD',
      date: '2024-01-01',
      rates: mockRates,
    })

    const { result } = renderHook(() => useExchangeRates('USD'))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.rates).toEqual(mockRates)
    expect(result.current.error).toBeNull()
    expect(currencyApi.getRates).toHaveBeenCalledWith('USD')
  })

  it('handles API errors gracefully', async () => {
    const mockError = new Error('API failed')
    vi.mocked(currencyApi.getRates).mockRejectedValue(mockError)

    const { result } = renderHook(() => useExchangeRates('USD'))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).not.toBeNull()
    expect(result.current.rates).toEqual({})
  })

  it('refetches rates when base currency changes', async () => {
    const usdRates = { EUR: 0.92 }
    const eurRates = { USD: 1.09 }

    vi.mocked(currencyApi.getRates)
      .mockResolvedValueOnce({
        base: 'USD',
        date: '2024-01-01',
        rates: usdRates,
      })
      .mockResolvedValueOnce({
        base: 'EUR',
        date: '2024-01-01',
        rates: eurRates,
      })

    const { result, rerender } = renderHook(
      ({ currency }: { currency: string }) => useExchangeRates(currency),
      { initialProps: { currency: 'USD' } }
    )

    await waitFor(() => {
      expect(result.current.rates).toEqual(usdRates)
    })

    expect(currencyApi.getRates).toHaveBeenCalledTimes(1)
    expect(currencyApi.getRates).toHaveBeenCalledWith('USD')

    // Change currency
    rerender({ currency: 'EUR' })

    await waitFor(() => {
      expect(result.current.rates).toEqual(eurRates)
    })

    expect(currencyApi.getRates).toHaveBeenCalledTimes(2)
    expect(currencyApi.getRates).toHaveBeenCalledWith('EUR')
  })

  it('provides a retry function', async () => {
    vi.mocked(currencyApi.getRates)
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({
        base: 'USD',
        date: '2024-01-01',
        rates: { EUR: 0.92 },
      })

    const { result } = renderHook(() => useExchangeRates('USD'))

    await waitFor(() => {
      expect(result.current.error).not.toBeNull()
    })

    // Call retry
    act(() => {
      result.current.retry()
    })

    await waitFor(() => {
      expect(result.current.error).toBeNull()
      expect(result.current.rates).toEqual({ EUR: 0.92 })
    })

    expect(currencyApi.getRates).toHaveBeenCalledTimes(2)
  })

  it('does not refetch when a dependency other than base currency changes', async () => {
    const mockRates = { EUR: 0.92 }
    vi.mocked(currencyApi.getRates).mockResolvedValue({
      base: 'USD',
      date: '2024-01-01',
      rates: mockRates,
    })

    const { result, rerender } = renderHook(
      (props: { currency: string; amount: number }) =>
        useExchangeRates(props.currency),
      { initialProps: { currency: 'USD', amount: 1 } }
    )

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(currencyApi.getRates).toHaveBeenCalledTimes(1)

    // Change amount but not currency
    rerender({ currency: 'USD', amount: 100 })

    // Should not trigger a new fetch
    expect(currencyApi.getRates).toHaveBeenCalledTimes(1)
  })

  it('clears error on successful retry', async () => {
    vi.mocked(currencyApi.getRates)
      .mockRejectedValueOnce(new Error('First attempt failed'))
      .mockResolvedValueOnce({
        base: 'USD',
        date: '2024-01-01',
        rates: { EUR: 0.92 },
      })

    const { result } = renderHook(() => useExchangeRates('USD'))

    await waitFor(() => {
      expect(result.current.error).not.toBeNull()
    })

    const errorBefore = result.current.error

    act(() => {
      result.current.retry()
    })

    await waitFor(() => {
      expect(result.current.error).toBeNull()
    })

    expect(result.current.error).not.toBe(errorBefore)
  })

  it('handles empty base currency gracefully', async () => {
    vi.mocked(currencyApi.getRates).mockRejectedValue(
      new Error('Base currency is required')
    )

    const { result } = renderHook(() => useExchangeRates(''))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).not.toBeNull()
    expect(result.current.rates).toEqual({})
  })

  // ===== CACHE BEHAVIOR TESTS =====

  it('uses cached rates on second request for same base currency', async () => {
    const mockRates = { EUR: 0.92, GBP: 0.79 }
    vi.mocked(currencyApi.getRates).mockResolvedValue({
      base: 'USD',
      date: '2024-01-01',
      rates: mockRates,
    })

    // First hook instance - should fetch
    const { result: result1 } = renderHook(() => useExchangeRates('USD'))

    await waitFor(() => {
      expect(result1.current.loading).toBe(false)
    })

    expect(currencyApi.getRates).toHaveBeenCalledTimes(1)
    expect(result1.current.rates).toEqual(mockRates)

    // Second hook instance with same currency - should use cache
    const { result: result2 } = renderHook(() => useExchangeRates('USD'))

    // Should use cache immediately without fetching
    expect(result2.current.loading).toBe(false)
    expect(result2.current.rates).toEqual(mockRates)

    // API should still have been called only once (cache hit)
    expect(currencyApi.getRates).toHaveBeenCalledTimes(1)
  })

  it('fetches new rates for different base currency (cache miss)', async () => {
    const usdRates = { EUR: 0.92 }
    const eurRates = { USD: 1.09 }

    vi.mocked(currencyApi.getRates)
      .mockResolvedValueOnce({
        base: 'USD',
        date: '2024-01-01',
        rates: usdRates,
      })
      .mockResolvedValueOnce({
        base: 'EUR',
        date: '2024-01-01',
        rates: eurRates,
      })

    // First hook for USD
    const { result: result1 } = renderHook(() => useExchangeRates('USD'))

    await waitFor(() => {
      expect(result1.current.loading).toBe(false)
    })

    expect(currencyApi.getRates).toHaveBeenCalledTimes(1)
    expect(result1.current.rates).toEqual(usdRates)

    // Second hook for EUR (different currency)
    const { result: result2 } = renderHook(() => useExchangeRates('EUR'))

    await waitFor(() => {
      expect(result2.current.loading).toBe(false)
    })

    // Should have called API for new currency (cache miss)
    expect(currencyApi.getRates).toHaveBeenCalledTimes(2)
    expect(result2.current.rates).toEqual(eurRates)
  })

  it('does not cache failed responses', async () => {
    vi.mocked(currencyApi.getRates)
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({
        base: 'USD',
        date: '2024-01-01',
        rates: { EUR: 0.92 },
      })

    // First hook - fails
    const { result: result1 } = renderHook(() => useExchangeRates('USD'))

    await waitFor(() => {
      expect(result1.current.loading).toBe(false)
    })

    expect(result1.current.error).not.toBeNull()
    expect(currencyApi.getRates).toHaveBeenCalledTimes(1)

    // Second hook for same currency - should NOT use cache (error not cached)
    const { result: result2 } = renderHook(() => useExchangeRates('USD'))

    await waitFor(() => {
      expect(result2.current.loading).toBe(false)
    })

    // Should have called API again (not cached)
    expect(currencyApi.getRates).toHaveBeenCalledTimes(2)
    expect(result2.current.rates).toEqual({ EUR: 0.92 })
    expect(result2.current.error).toBeNull()
  })

  it('bypass cache on retry to fetch fresh data', async () => {
    const mockRates = { EUR: 0.92 }
    const freshRates = { EUR: 0.94 } // Different data to verify fresh fetch

    vi.mocked(currencyApi.getRates)
      .mockResolvedValueOnce({
        base: 'USD',
        date: '2024-01-01',
        rates: mockRates,
      })
      .mockResolvedValueOnce({
        base: 'USD',
        date: '2024-01-02', // Simulating fresh data
        rates: freshRates,
      })

    const { result } = renderHook(() => useExchangeRates('USD'))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(currencyApi.getRates).toHaveBeenCalledTimes(1)
    expect(result.current.rates).toEqual(mockRates)

    // Call retry - should bypass cache and fetch fresh data
    act(() => {
      result.current.retry()
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // Should have called API again (cache was bypassed)
    expect(currencyApi.getRates).toHaveBeenCalledTimes(2)
    expect(result.current.rates).toEqual(freshRates)
  })

  it('retry after error fetches fresh data and caches it', async () => {
    vi.mocked(currencyApi.getRates)
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({
        base: 'USD',
        date: '2024-01-01',
        rates: { EUR: 0.92 },
      })
      .mockResolvedValueOnce({
        base: 'USD',
        date: '2024-01-01',
        rates: { EUR: 0.92 },
      })

    const { result: result1 } = renderHook(() => useExchangeRates('USD'))

    await waitFor(() => {
      expect(result1.current.error).not.toBeNull()
    })

    expect(currencyApi.getRates).toHaveBeenCalledTimes(1)

    // Retry
    act(() => {
      result1.current.retry()
    })

    await waitFor(() => {
      expect(result1.current.error).toBeNull()
    })

    expect(currencyApi.getRates).toHaveBeenCalledTimes(2)

    // New hook for same currency - should use cache from successful retry
    const { result: result2 } = renderHook(() => useExchangeRates('USD'))

    // Should use cache immediately
    expect(result2.current.loading).toBe(false)
    expect(result2.current.rates).toEqual({ EUR: 0.92 })

    // API should not have been called again
    expect(currencyApi.getRates).toHaveBeenCalledTimes(2)
  })
})
