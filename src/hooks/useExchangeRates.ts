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
 * Custom hook for fetching and managing exchange rates.
 *
 * Fetches rates from VATComply API when the base currency changes.
 * Manages loading, error, and retry states.
 *
 * @param baseCurrency - The base currency code (e.g., 'USD')
 * @returns Object with rates, loading, error, and retry function
 */

export function useExchangeRates(baseCurrency: string): UseExchangeRatesReturn {
  const [rates, setRates] = useState<ExchangeRates>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchRates = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await getRates(baseCurrency)

      setRates(response.rates)
    } catch (err) {
      const normalizedError =
        err instanceof Error ? err : new Error(String(err))

      setError(normalizedError)
      setRates({})
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
    void fetchRates()
  }, [fetchRates])

  return {
    rates,
    loading,
    error,
    retry,
  }
}