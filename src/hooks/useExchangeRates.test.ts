import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useExchangeRates } from './useExchangeRates'
import * as currencyApi from '../api/currencyApi'

// Mock the API
vi.mock('../api/currencyApi')

describe('useExchangeRates', () => {
  beforeEach(() => {
    vi.clearAllMocks()
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
})
