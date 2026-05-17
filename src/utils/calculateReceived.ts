/**
 * Calculates the received amount from exchange rate conversion.
 * @param amount - The amount to convert (string or number)
 * @param rate - The exchange rate
 * @returns The calculated received amount as a number, or 0 if invalid
 */

export function calculateReceived(
  amount: string | number,
  rate: number | undefined
): number {
  
  if (rate === undefined || rate === null || !isFinite(rate) || rate < 0) {
    return 0
  }

  
  let parsedAmount: number

  if (typeof amount === 'number') {
    parsedAmount = amount
  } else {

    const trimmed = amount.trim()
    if (!trimmed) {
      return 0
    }

    if (!/^\d+(\.\d+)?$/.test(trimmed)) {
      return 0
    }

    parsedAmount = parseFloat(trimmed)
  }

  if (isNaN(parsedAmount) || !isFinite(parsedAmount) || parsedAmount < 0) {
    return 0
  }

  return parsedAmount * rate
}

