/**
 * Calculates the received amount from exchange rate conversion.
 *
 * Pure utility function that multiplies amount by rate.
 * Handles invalid inputs gracefully.
 *
 * Rules:
 * - Parses string amounts
 * - Validates amount format (digits and single decimal point only)
 * - Rejects negative amounts and rates
 * - Rejects invalid or missing rates
 * - Returns 0 for any invalid input
 * - Does not format the result
 *
 * @param amount - The amount to convert (string or number)
 * @param rate - The exchange rate
 * @returns The calculated received amount as a number, or 0 if invalid
 */
export function calculateReceived(
  amount: string | number,
  rate: number | undefined
): number {
  // Validate rate
  if (rate === undefined || rate === null || !isFinite(rate) || rate < 0) {
    return 0
  }

  // Parse amount
  let parsedAmount: number

  if (typeof amount === 'number') {
    parsedAmount = amount
  } else {
    // Trim the string
    const trimmed = amount.trim()
    if (!trimmed) {
      return 0
    }

    // Validate format: only digits and at most one decimal point
    if (!/^\d+(\.\d+)?$/.test(trimmed)) {
      return 0
    }

    parsedAmount = parseFloat(trimmed)
  }

  // Validate parsed amount
  if (isNaN(parsedAmount) || !isFinite(parsedAmount) || parsedAmount < 0) {
    return 0
  }

  // Calculate and return
  return parsedAmount * rate
}

