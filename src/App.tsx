import { useEffect, useState } from "react"
import { getRates, getCurrencies } from "./api/currencyApi"
import { formatCurrency, calculateReceived } from "./utils"

function App() {

  const [rates, setRates] = useState<string>("")
  const [amount, setAmount] = useState("1")
  const [fromCountryCurrency, setFromCountryCurrency] = useState<string>('USD')
  const [toCountryCurrency, setToCountryCurrency] = useState<string>('EUR')
  const [currencies, setCurrencies] = useState<Record<string, string>>({})

  useEffect(() => {
    getCurrencies()
      .then(data => setCurrencies(data || {}))
  }, [])

  useEffect(() => {
    getRates(fromCountryCurrency)
      .then(data => setRates(data?.rates))
  }, [fromCountryCurrency])

  console.log(rates)
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
