import { useCallback, useEffect, useState } from 'react'
import { getRates } from '../api/currencyApi'
import type { ExchangeRates } from '../types/currencyTypes'

export interface UseExchangeRatesReturn {
  rates: ExchangeRates
  loading: boolean
  error: Error | null
  retry: () => void
}

/**
 * In-memory cache for exchange rates by base currency.
 * Stores successful API responses to avoid repeated requests during the session.
 * Failed responses are not cached.
 */
const ratesCache = new Map<string, ExchangeRates>()

/**
 * Custom hook for fetching and managing exchange rates.
 *
 * Features:
 * - Fetches rates from VATComply API when the base currency changes
 * - Caches successful responses in memory by base currency
 * - Does not cache failed responses
 * - Manages loading, error, and retry states
 *
 * @param baseCurrency - The base currency code (e.g., 'USD')
 * @returns Object with rates, loading, error, and retry function
 */

export function useExchangeRates(baseCurrency: string): UseExchangeRatesReturn {
  const [rates, setRates] = useState<ExchangeRates>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchRates = useCallback(async () => {
    // Check if rates for this currency are already cached
    if (ratesCache.has(baseCurrency)) {
      setRates(ratesCache.get(baseCurrency)!)
      setLoading(false)
      setError(null)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await getRates(baseCurrency)

      setRates(response.rates)
      // Cache the successful response
      ratesCache.set(baseCurrency, response.rates)
    } catch (err) {
      const normalizedError =
        err instanceof Error ? err : new Error(String(err))

      setError(normalizedError)
      setRates({})
      // Failed responses are not cached
    } finally {
      setLoading(false)
    }
  }, [baseCurrency])

  useEffect(() => {
    // Fetching exchange rates is an intentional synchronization
    // with an external API when the base currency changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchRates()
  }, [fetchRates])

  const retry = useCallback(() => {
    // Clear cache for this currency to force a fresh fetch
    ratesCache.delete(baseCurrency)
    void fetchRates()
  }, [fetchRates, baseCurrency])

  return {
    rates,
    loading,
    error,
    retry,
  }
}

/**
 * Test-only utility: Clear the exchange rates cache.
 * This should only be used in tests to ensure cache isolation between test cases.
 * @internal
 */
export function __clearRatesCache(): void {
  ratesCache.clear()
}