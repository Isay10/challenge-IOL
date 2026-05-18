import { useEffect, useMemo, useState } from 'react'
import { Alert, Button, Card, Flex, Input, Select, Spin } from 'antd'
import { SwapOutlined } from '@ant-design/icons'
import { sanitizeAmount, calculateReceived, formatCurrency } from '../utils'
import { useExchangeRates } from '../hooks/useExchangeRates'
import { getCurrencies } from '../api/currencyApi'
import type { CurrencyInfo } from '../types/currencyTypes'
import './CurrencyConverter.scss'

const DEFAULT_AMOUNT = '1.00'
const DEFAULT_FROM = 'USD'
const DEFAULT_TO = 'EUR'

export function CurrencyConverter() {
  const [amount, setAmount] = useState(DEFAULT_AMOUNT)
  const [fromCurrency, setFromCurrency] = useState(DEFAULT_FROM)
  const [toCurrency, setToCurrency] = useState(DEFAULT_TO)
  const [currencies, setCurrencies] = useState<Record<string, CurrencyInfo>>({})

  const { rates, loading, error, retry } = useExchangeRates(fromCurrency)

  useEffect(() => {
    getCurrencies()
      .then((data) => setCurrencies(data || {}))
      .catch((err) => console.error('Failed to load currencies:', err))
  }, [])

  const currencyOptions = useMemo(
    () =>
      Object.entries(currencies).map(([code, info]) => ({
        label: `${code} - ${info.name}`,
        value: code,
      })),
    [currencies]
  )

  const sanitizedAmount = sanitizeAmount(amount)
  const selectedRate = rates[toCurrency] || 0

  const receivedAmount = calculateReceived(sanitizedAmount || '0', selectedRate)
  const displayReceived = formatCurrency(receivedAmount)
  const displayRate = formatCurrency(selectedRate)

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value)
  }

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <main className="currency-converter-page">
      <section className="converter-hero">
        <div className="converter-hero__content">
          <p className="converter-hero__eyebrow">Currency exchange calculator</p>
          <h1 className="converter-hero__title">Convert currencies in real time</h1>
          <p className="converter-hero__description">
            Enter an amount, choose your currencies and get an estimated exchange value.
          </p>
        </div>
      </section>

      <section className="converter-content">
        <Card className="converter-card">
          {error && (
            <Alert
              className="converter-alert"
              type="warning"
              variant="outlined"
              title="We couldn't load exchange rates"
              description="Conversion is temporarily unavailable. Please try again in a few seconds."
              action={
                <Button size="small" onClick={retry}>
                  Retry
                </Button>
              }
              showIcon
            />
          )}

          {loading && !error ? (
            <div className="spinner-container">
              <Spin size="large" />
            </div>
          ) : (
            <>
              <Flex gap="middle" className="controls-flex">
                <Flex vertical gap="small" className="control-input">
                  <label className="control-label" htmlFor="amount">
                    Amount
                  </label>
                  <Input
                    id="amount"
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={amount}
                    onChange={handleAmountChange}
                    size="large"
                  />
                </Flex>

                <Flex vertical gap="small" className="control-input">
                  <label className="control-label" htmlFor="from-currency">
                    From
                  </label>
                  <Select
                    id="from-currency"
                    value={fromCurrency}
                    onChange={setFromCurrency}
                    size="large"
                    options={currencyOptions}
                    showSearch
                    optionFilterProp="label"
                  />
                </Flex>

                <Button
                  type="primary"
                  shape="circle"
                  icon={<SwapOutlined />}
                  onClick={handleSwap}
                  size="large"
                  aria-label="Swap currencies"
                  className="swap-button"
                />

                <Flex vertical gap="small" className="control-input">
                  <label className="control-label" htmlFor="to-currency">
                    To
                  </label>
                  <Select
                    id="to-currency"
                    value={toCurrency}
                    onChange={setToCurrency}
                    size="large"
                    options={currencyOptions}
                    showSearch
                    optionFilterProp="label"
                  />
                </Flex>
              </Flex>

              <Flex gap="large" className="result-flex">
                <div className="result-block">
                  <div className="result-label">You receive</div>

                  <div className="result-value">
                    {error ? (
                      <span className="unavailable">—</span>
                    ) : (
                      displayReceived
                    )}
                    <span className="currency-code">{toCurrency}</span>
                  </div>

                  <div className="result-detail">
                    {error ? (
                      <span className="unavailable-text">Rates unavailable</span>
                    ) : (
                      sanitizedAmount &&
                      `1 ${fromCurrency} = ${displayRate} ${toCurrency}`
                    )}
                  </div>
                </div>

                <div className="info-box">
                  <div className="info-title">Information</div>
                  <div className="info-content">
                    Rates are sourced from VATComply. Exchange rates update when
                    you change the source currency. Amounts are calculated locally
                    in real time.
                  </div>
                </div>
              </Flex>
            </>
          )}
        </Card>
      </section>
    </main>
  )
}

export default CurrencyConverter