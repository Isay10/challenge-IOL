import { useEffect, useState } from "react"
import { getCurrencies } from "./api/currencyApi"
import { formatCurrency, calculateReceived } from "./utils"
import type { CurrencyInfo } from "./types/currencyTypes"
import { useExchangeRates } from "./hooks/useExchangeRates"

function App() {

  const [amount, setAmount] = useState("1")
  const [fromCountryCurrency, setFromCountryCurrency] = useState<string>('USD')
  const [toCountryCurrency, setToCountryCurrency] = useState<string>('EUR')
  const [currencies, setCurrencies] = useState<Record<string, CurrencyInfo>>({})

const {
    rates,
    loading,
    error,
    retry,
  } = useExchangeRates(fromCountryCurrency)

  useEffect(() => {
    getCurrencies()
      .then(data => setCurrencies(data || {}))
  }, [])


  return (
    <>
      <input type="text" name="amount" id="" value={formatCurrency(Number(amount))} onChange={(e) => setAmount(e.target.value)} />
      <select value={fromCountryCurrency} onChange={(e) => setFromCountryCurrency(e.target.value)}>
        {Object.keys(currencies).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <select value={toCountryCurrency} onChange={(e) => setToCountryCurrency(e.target.value)}>
        {Object.keys(currencies).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <div>
        <p>{formatCurrency(Number(amount))} {fromCountryCurrency} ={calculateReceived(amount, rates[toCountryCurrency])}{toCountryCurrency}</p>
      </div>
    </>
  )
}

export default App
