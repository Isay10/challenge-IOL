/**
 * Formats a numeric amount as a currency string with 2 decimal places.
 *
 * Pure utility function for display formatting.
 *
 * Rules:
 * - Returns a string formatted with exactly 2 decimal places
 * - Handles NaN and Infinity safely by returning "0.00"
 * - Does not include currency symbols
 * - Uses standard rounding (banker's rounding in JavaScript)
 *
 * @param value - The numeric amount to format
 * @returns Formatted string with 2 decimal places, or "0.00" for invalid input
 */
export function formatCurrency(value: number): string {
  // Handle invalid inputs: NaN, Infinity
  if (!isFinite(value)) {
    return '0.00'
  }

  // Format with 2 decimal places
  return value.toFixed(2)
}
